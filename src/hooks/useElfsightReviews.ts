'use client';

import { useState, useEffect } from 'react';

type ReviewData = {
  rating: string;
  count: string;
} | null;

export function useElfsightReviews(): ReviewData {
  const [data, setData] = useState<ReviewData>(null);

  useEffect(() => {
    const extract = () => {
      const widget = document.querySelector('.elfsight-app-e3661755-7938-45b5-82c9-99c4ab181c53');
      if (!widget) {
        return false;
      }

      const text = widget.textContent || '';
      const ratingMatch = text.match(/(\d\.?\d?)\s*out of 5/i);
      const countMatch = text.match(/(\d+)\s*reviews/i);

      if (ratingMatch && countMatch) {
        setData({ rating: ratingMatch[1], count: countMatch[1] });
        return true;
      }
      return false;
    };

    // Try immediately
    if (extract()) {
      return;
    }

    // Poll briefly for widget load
    let attempts = 0;
    const interval = setInterval(() => {
      if (extract() || ++attempts > 20) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return data;
}
