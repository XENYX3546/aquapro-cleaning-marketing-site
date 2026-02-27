'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const SCRIPT_SRC = 'https://elfsightcdn.com/platform.js';

let scriptInjected = false;

function isScriptPresent() {
  return !!document.querySelector(`script[src="${SCRIPT_SRC}"]`);
}

function injectScript() {
  if (scriptInjected || isScriptPresent()) {
    scriptInjected = true;
    return;
  }
  const script = document.createElement('script');
  script.src = SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
  scriptInjected = true;
}

/**
 * On soft navigation Elfsight has already initialised and won't process
 * new widget divs. Force it to re-scan by removing and re-adding the script.
 */
function reinjectScript() {
  const old = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
  if (old) old.remove();
  scriptInjected = false;
  injectScript();
}

type Strategy = 'interaction' | 'viewport';

/**
 * Lazy-load Elfsight platform script.
 *
 * `loaded` controls skeleton visibility — it flips to true only once the
 * widget has actually rendered content inside its container (detected via
 * MutationObserver), NOT when the script tag is injected.
 */
export function useElfsightLazy(strategy: Strategy = 'viewport') {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const isSoftNav = typeof document !== 'undefined' && (scriptInjected || isScriptPresent());

  // Watch the widget div — once Elfsight injects content, hide the skeleton
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Find the elfsight widget div inside our container
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
      reinjectScript();
    } else {
      injectScript();
    }
  }, [isSoftNav]);

  // Soft navigation: re-inject immediately
  useEffect(() => {
    if (!isSoftNav) return;
    reinjectScript();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fresh load: defer based on strategy
  useEffect(() => {
    if (isSoftNav) return; // handled above
    if (scriptInjected) return; // already triggered

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
