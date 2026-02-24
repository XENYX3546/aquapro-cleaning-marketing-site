'use client';

import { useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/constants';

type Reference = {
  index: number;
  url: string;
  text: string;
  domain: string;
};

/**
 * Extracts domain from URL for display
 */
function getDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/**
 * Checks if a URL is external (not same domain)
 */
function isExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url, siteConfig.url);
    const siteDomain = new URL(siteConfig.url).hostname;
    return parsed.hostname !== siteDomain && !url.startsWith('/') && !url.startsWith('#');
  } catch {
    return false;
  }
}

/**
 * Processes HTML content to replace external links with citation references
 */
function processContentWithReferences(html: string): { content: string; references: Reference[] } {
  const references: Reference[] = [];
  const seenUrls = new Map<string, number>();

  // Match <a> tags with href
  const linkRegex = /<a\s+([^>]*?)href=["']([^"']+)["']([^>]*?)>([\s\S]*?)<\/a>/gi;

  const processedContent = html.replace(linkRegex, (match, _before, url, _after, linkText) => {
    // Skip internal links, anchor links, and mailto/tel links
    if (!isExternalUrl(url)) {
      return match;
    }

    // Check if we've already seen this URL
    let refIndex: number;
    if (seenUrls.has(url)) {
      refIndex = seenUrls.get(url)!;
    } else {
      refIndex = references.length + 1;
      seenUrls.set(url, refIndex);
      references.push({
        index: refIndex,
        url,
        text: linkText.replace(/<[^>]*>/g, '').trim(), // Strip any nested HTML
        domain: getDomain(url),
      });
    }

    // Return the link text with a superscript reference number
    return `<span class="reference-text">${linkText}</span><sup class="reference-number"><a href="#ref-${refIndex}" class="reference-link">[${refIndex}]</a></sup>`;
  });

  return { content: processedContent, references };
}

type TocHeading = {
  id: string;
  text: string;
  level: number;
};

/**
 * Extracts h2/h3 headings from HTML, injects IDs, and returns TOC data
 */
function extractHeadingsAndInjectIds(html: string): { content: string; headings: TocHeading[] } {
  const headings: TocHeading[] = [];
  const usedIds = new Set<string>();

  const content = html.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_match, tag: string, attrs: string, innerHtml: string) => {
      const text = innerHtml.replace(/<[^>]*>/g, '').trim();
      let baseId = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 60);

      // Deduplicate IDs
      let id = baseId;
      let counter = 1;
      while (usedIds.has(id)) {
        id = `${baseId}-${counter++}`;
      }
      usedIds.add(id);

      const level = tag.toLowerCase() === 'h2' ? 2 : 3;
      headings.push({ id, text, level });

      return `<${tag}${attrs} id="${id}">${innerHtml}</${tag}>`;
    }
  );

  return { content, headings };
}

type BlogPostContentProps = {
  content: string;
  excerpt?: string | null;
  className?: string;
};

/**
 * Renders HTML blog content with proper styling.
 * External links are converted to citation-style references.
 */
export function BlogPostContent({ content, excerpt, className }: BlogPostContentProps) {
  const { content: processedContent, references, headings, keyTakeaway } = useMemo(
    () => {
      const refResult = processContentWithReferences(content);
      const headingResult = extractHeadingsAndInjectIds(refResult.content);
      let finalContent = headingResult.content;
      let takeaway: string | null = null;

      // Extract the full first paragraph as key takeaway, then strip it from content
      if (excerpt) {
        const firstPMatch = finalContent.match(/^\s*<p[\s>]([\s\S]*?)<\/p>/);
        if (firstPMatch) {
          // Strip HTML tags to get plain text
          takeaway = firstPMatch[1].replace(/<[^>]*>/g, '').trim();
          finalContent = finalContent.replace(/^(\s*<p[\s>][\s\S]*?<\/p>)/, '');
        }
      }

      return {
        content: finalContent,
        references: refResult.references,
        headings: headingResult.headings,
        keyTakeaway: takeaway,
      };
    },
    [content, excerpt]
  );

  const showToc = headings.length >= 3;

  // Auto-expand references when clicking a reference link
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.reference-link')) {
        const details = document.querySelector('aside details') as HTMLDetailsElement;
        if (details) {
          details.open = true;
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className={className}>
      {/* Key Takeaways — hidden on mobile to save above-the-fold space */}
      {keyTakeaway && (
        <div className="mb-8 p-6 bg-primary-50 rounded-xl border border-primary-100">
          <p className="text-xs font-semibold text-primary-700 uppercase tracking-wide mb-2">
            Key takeaway
          </p>
          <p className="text-xl leading-relaxed font-medium text-neutral-900">
            {keyTakeaway}
          </p>
        </div>
      )}

      {/* Table of Contents — mobile/tablet only; collapsed by default to save space */}
      {showToc && (
        <details className="mb-8 bg-neutral-50 rounded-xl border border-neutral-200 lg:hidden group">
          <summary className="flex items-center justify-between cursor-pointer list-none select-none p-4">
            <span className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">
              In this article
            </span>
            <svg
              className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <nav aria-label="Table of contents" className="px-4 pb-4">
            <ol className="space-y-1.5 text-sm">
              {headings.filter((h) => h.level === 2).map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className="text-neutral-600 hover:text-primary-600 transition-colors leading-snug block"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </details>
      )}

      {/* Article Content */}
      <div
        className={cn(
          // Base typography - prose-lg for 18px base, better for long-form reading
          'prose prose-lg prose-neutral max-w-none',
          // Headings - tighter rhythm for better flow
          'prose-headings:font-semibold prose-headings:text-neutral-900',
          'prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4',
          'prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3 prose-h2:scroll-mt-24',
          'prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-2 prose-h3:scroll-mt-24',
          'prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2',
          // Paragraphs - neutral-800 for better contrast (WCAG AAA)
          'prose-p:text-neutral-800 prose-p:leading-relaxed',
          // First paragraph lead styling
          '[&>p:first-child]:text-xl [&>p:first-child]:text-neutral-700 [&>p:first-child]:leading-relaxed',
          // Links - now muted since external links become references
          'prose-a:text-neutral-900 prose-a:no-underline prose-a:font-medium',
          // Lists - match paragraph contrast
          'prose-ul:list-disc prose-ol:list-decimal',
          'prose-li:text-neutral-800 prose-li:marker:text-neutral-400',
          // Blockquotes
          'prose-blockquote:border-l-4 prose-blockquote:border-primary-500',
          'prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-neutral-600',
          // Code
          'prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded',
          'prose-code:text-sm prose-code:font-mono prose-code:text-neutral-800',
          'prose-code:before:content-none prose-code:after:content-none',
          // Pre (code blocks)
          'prose-pre:bg-neutral-900 prose-pre:text-neutral-100',
          'prose-pre:rounded-xl prose-pre:overflow-x-auto',
          // Images
          'prose-img:rounded-xl prose-img:shadow-md',
          // Tables
          'prose-table:w-full prose-table:border-collapse',
          'prose-th:bg-neutral-100 prose-th:p-3 prose-th:text-left prose-th:font-semibold',
          'prose-td:p-3 prose-td:border-t prose-td:border-neutral-200',
          // Horizontal rules
          'prose-hr:border-neutral-200 prose-hr:my-8',
          // Strong/Bold
          'prose-strong:text-neutral-900 prose-strong:font-semibold',
          // Definition lists — structured key-value for tidbit extraction
          '[&_dl]:my-6 [&_dl]:space-y-4',
          '[&_dt]:font-semibold [&_dt]:text-neutral-900',
          '[&_dd]:text-neutral-700 [&_dd]:ml-4 [&_dd]:mb-4',
          // Reference styling
          '[&_.reference-number]:text-xs [&_.reference-number]:ml-0.5 [&_.reference-number]:relative [&_.reference-number]:-top-1',
          '[&_.reference-link]:text-neutral-500 [&_.reference-link]:no-underline [&_.reference-link]:hover:text-neutral-700'
        )}
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />

      {/* References Section - Collapsed by default */}
      {references.length > 0 && (
        <aside className="mt-12 pt-8 border-t border-neutral-200">
          <details className="group">
            <summary className="flex items-center gap-2 cursor-pointer list-none select-none">
              <span className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">
                References
              </span>
              <span className="text-xs text-neutral-500">
                ({references.length})
              </span>
              <svg
                className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <ol className="mt-4 space-y-2 text-sm">
              {references.map((ref) => (
                <li
                  key={ref.index}
                  id={`ref-${ref.index}`}
                  className="flex items-start gap-3 text-neutral-600 scroll-mt-24"
                >
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-neutral-100 rounded text-xs font-medium text-neutral-700">
                    {ref.index}
                  </span>
                  <div className="flex-1 min-w-0">
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline break-all"
                    >
                      {ref.domain}
                    </a>
                    {ref.text && ref.text !== ref.domain && (
                      <span className="text-neutral-500 ml-2">· {ref.text}</span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-neutral-400">
              External links open in a new tab.
            </p>
          </details>
        </aside>
      )}
    </div>
  );
}
