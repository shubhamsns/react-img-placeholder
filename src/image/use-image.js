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
 * @returns status fro image loading process
 */
function useImage({
  src,
  srcSet,
  sizes,
  onLoad,
  onError,
  crossOrigin,
  ignorePlaceholder,
} = {}) {
  const [status, setStatus] = useState('idle');

  const isError = status === 'failed';
  const isLoading = status === 'loading';
  const isIdle = status === 'idle';
  const isLoaded = status === 'loaded';

  useEffect(() => {
    setStatus(src ? 'loading' : 'idle');
  }, [src]);

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

    img.onload = event => {
      flush();
      setStatus('loaded');
      onLoad?.(event);
    };

    img.onerror = error => {
      flush();
      setStatus('failed');
      onError?.(error);
    };

    imageRef.current = img;
  }, [src, crossOrigin, srcSet, sizes, onLoad, onError]);

  // we want this effect to run synchronously before UI gets painted as we are working with dom api
  useLayoutEffect(() => {
    if (ignorePlaceholder) return;

    if (status === 'loading') {
      load();
    }

    return flush;
  }, [status, load, ignorePlaceholder]);

  return {
    status: ignorePlaceholder ? 'loaded' : status,
    isError,
    isIdle,
    isLoading,
    isLoaded,
  };
}

export { useImage };
