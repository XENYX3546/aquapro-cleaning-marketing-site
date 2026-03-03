'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const SCRIPT_SRC = 'https://elfsightcdn.com/platform.js';
const RETRY_TIMEOUT_MS = 10_000;

let scriptInjected = false;
let scriptLoaded = false;

function isScriptPresent() {
  return !!document.querySelector(`script[src="${SCRIPT_SRC}"]`);
}

function injectScript(): Promise<void> {
  if (scriptLoaded) return Promise.resolve();
  if (scriptInjected || isScriptPresent()) {
    scriptInjected = true;
    // Script tag exists but may not have loaded yet — wait for it
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`) as HTMLScriptElement | null;
    if (existing && !scriptLoaded) {
      return new Promise((resolve) => {
        existing.addEventListener('load', () => { scriptLoaded = true; resolve(); }, { once: true });
        existing.addEventListener('error', () => { /* script error */ resolve(); }, { once: true });
        // If script already loaded (no event will fire), resolve after a tick
        setTimeout(resolve, 100);
      });
    }
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => { scriptLoaded = true; resolve(); };
    script.onerror = () => { /* script error */ resolve(); };
    document.body.appendChild(script);
    scriptInjected = true;
  });
}

/**
 * On soft navigation Elfsight has already initialised and won't process
 * new widget divs. Force it to re-scan by removing and re-adding the script.
 */
function reinjectScript(): Promise<void> {
  const old = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
  if (old) old.remove();
  scriptInjected = false;
  scriptLoaded = false;
  return injectScript();
}

type Strategy = 'interaction' | 'viewport';

/**
 * Lazy-load Elfsight platform script.
 *
 * `loaded` controls skeleton visibility — it flips to true only once the
 * widget has actually rendered content inside its container (detected via
 * MutationObserver), NOT when the script tag is injected.
 *
 * Includes a retry mechanism: if the widget hasn't rendered within
 * RETRY_TIMEOUT_MS after script injection, the script is re-injected.
 */
export function useElfsightLazy(strategy: Strategy = 'viewport') {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const retryCountRef = useRef(0);
  const isSoftNav = typeof document !== 'undefined' && (scriptInjected || isScriptPresent());

  // Watch the widget div — once Elfsight injects content, hide the skeleton
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const widget = container.querySelector('[class^="elfsight-app-"]');
    if (!widget) return;

    // If already has content (e.g. cached), mark loaded immediately
    if (widget.children.length > 0) {
      setLoaded(true);
      return;
    }

    const observer = new MutationObserver(() => {
      if (widget.children.length > 0) {
        setLoaded(true);
        observer.disconnect();
      }
    });

    observer.observe(widget, { childList: true });
    return () => observer.disconnect();
  });

  const triggerLoad = useCallback(() => {
    if (isSoftNav) {
      return reinjectScript();
    }
    return injectScript();
  }, [isSoftNav]);

  // Retry mechanism — if widget hasn't loaded after timeout, force re-inject
  useEffect(() => {
    if (loaded) return;

    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const widget = container.querySelector('[class^="elfsight-app-"]');
      if (widget && widget.children.length === 0 && retryCountRef.current < 3) {
        retryCountRef.current += 1;
        reinjectScript();
      }
    }, RETRY_TIMEOUT_MS);

    return () => clearTimeout(timer);
  }, [loaded]);

  // Soft navigation: re-inject immediately
  useEffect(() => {
    if (!isSoftNav) return;
    reinjectScript();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fresh load: defer based on strategy
  useEffect(() => {
    if (isSoftNav) return; // handled above
    if (scriptLoaded) return; // already loaded successfully

    if (strategy === 'viewport') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            triggerLoad();
            observer.disconnect();
          }
        },
        { rootMargin: '200px' }
      );
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }

    // "interaction" strategy: idle callback + user interaction race
    const el = containerRef.current;
    let cleaned = false;

    const events = ['click', 'focusin', 'touchstart', 'mouseover'] as const;
    const handler = () => {
      if (cleaned) return;
      triggerLoad();
      cleanup();
    };

    events.forEach((e) => el?.addEventListener(e, handler, { once: true, passive: true }));

    const idleId =
      typeof requestIdleCallback !== 'undefined'
        ? requestIdleCallback(handler, { timeout: 1000 })
        : undefined;
    const timerId = idleId === undefined ? setTimeout(handler, 1000) : undefined;

    function cleanup() {
      cleaned = true;
      events.forEach((e) => el?.removeEventListener(e, handler));
      if (idleId !== undefined) cancelIdleCallback(idleId);
      if (timerId !== undefined) clearTimeout(timerId);
    }

    return cleanup;
  }, [strategy, triggerLoad, isSoftNav]);

  return { containerRef, loaded };
}
