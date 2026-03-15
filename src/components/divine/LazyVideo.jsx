import { useRef, useEffect, useState } from 'react';

/**
 * LazyVideo — loads video src only when in viewport (IntersectionObserver).
 * On mobile (≤768px) shows a static poster image instead of video.
 * Always accepts a poster image as fallback for broken/loading states.
 */
const LazyVideo = ({ src, poster, style, ...props }) => {
  const videoRef  = useRef(null);
  const isMobile  = typeof window !== 'undefined' && window.innerWidth <= 768;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  // Mobile — static poster
  if (isMobile) {
    return (
      <div
        style={{
          ...style,
          backgroundImage: `url(${poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={loaded ? src : undefined}
      poster={poster}
      preload="none"
      autoPlay={loaded}
      muted
      loop
      playsInline
      style={style}
      {...props}
    />
  );
};

export default LazyVideo;
