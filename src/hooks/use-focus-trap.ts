import { useEffect } from "react";

// Simple focus-trap hook: traps Tab/Shift+Tab within the provided element while active
export default function useFocusTrap(
  containerRef: React.RefObject<HTMLElement>,
  active: boolean,
  onEscape?: () => void
) {
  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    const nodes = Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter(Boolean);

    // Save the previously focused element to restore later
    const previousActive = document.activeElement as HTMLElement | null;

    // If nothing focusable, focus the container itself
    if (nodes.length === 0) {
      container.setAttribute('tabindex', '-1');
      container.focus();
    } else {
      // focus the first interactive element
      nodes[0].focus();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onEscape && onEscape();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter(Boolean);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (container.getAttribute('tabindex') === '-1') container.removeAttribute('tabindex');
      // restore previous focus if possible
      try {
        if (previousActive && typeof previousActive.focus === 'function') previousActive.focus();
      } catch (err) {
        // ignore
      }
    };
  }, [containerRef, active, onEscape]);
}


