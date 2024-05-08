"use client";
import { memo, useEffect, useRef } from "react";

interface VideoProps {
  sourceProps: React.VideoHTMLAttributes<HTMLSourceElement>;
  autoPlay?: boolean;
  delayAutoPlay?: number;
}

const Video = memo<VideoProps>(
  ({ sourceProps, autoPlay = false, delayAutoPlay = 0 }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      const video = videoRef.current;
      if (video && autoPlay) {
        const timeout = setTimeout(() => {
          video.play();
        }, delayAutoPlay);

        return () => clearTimeout(timeout);
      }
    }, [autoPlay, delayAutoPlay]);

    return (
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
      >
        <source {...sourceProps} />
      </video>
    );
  }
);

Video.displayName = "Video";

export default Video;
