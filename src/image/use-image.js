import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';

/**
 * Hook which loads image and let us know the status
 * so we can show placeholder/fallback
 *
 * @returns status for image loading process
 */
function useImage({ src, srcSet, sizes, crossOrigin, ignorePlaceholder } = {}) {
  const [status, setStatus] = useState('idle');

  const isError = status === 'failed';
  const isLoading = status === 'loading';
  const isIdle = status === 'idle';
  const isLoaded = status === 'loaded';

  useEffect(() => {
    if (ignorePlaceholder) {
      return setStatus('loaded');
    }

    setStatus(src ? 'loading' : 'idle');
  }, [ignorePlaceholder, src]);

  const imageRef = useRef();

  const flush = () => {
    if (imageRef.current) {
      imageRef.current = null;
    }
  };

  const load = useCallback(() => {
    if (!src) return;

    flush();

    const img = new window.Image();

    img.src = src;

    if (crossOrigin) {
      img.crossOrigin = crossOrigin;
    }

    if (srcSet) {
      img.srcset = srcSet;
    }

    if (sizes) {
      img.sizes = sizes;
    }

    img.onload = () => {
      flush();
      setStatus('loaded');
    };

    img.onerror = () => {
      flush();
      setStatus('failed');
    };

    imageRef.current = img;
  }, [src, crossOrigin, srcSet, sizes]);

  // we want this effect to run synchronously before UI gets painted as we are working with dom api
  useLayoutEffect(() => {
    if (ignorePlaceholder) return;

    if (status === 'loading') {
      load();
    }

    return flush;
  }, [status, load, ignorePlaceholder]);

  return {
    status,
    isError,
    isIdle,
    isLoading,
    isLoaded,
  };
}

export { useImage };
