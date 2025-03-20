'use client';

import {cn} from "@/lib/utils";
import {useEffect, useRef} from "react";

export interface VideoMetadata {
  width: number;
  height: number;
  duration: number;
}

interface VideoPlayerProps {
  src: string;
  className?: string;
  onMetadataLoaded?: (metadata: VideoMetadata) => void;
}

const VideoPlayer = ({src, className, onMetadataLoaded}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const listener = async () => {
      if (videoElement) {
        const metadata: VideoMetadata = {
          width: videoElement.videoWidth,
          height: videoElement.videoHeight,
          duration: videoElement.duration,
        };
        onMetadataLoaded?.(metadata);
      }
    }

    videoElement?.addEventListener("loadedmetadata", listener);
    return () => {
      videoElement?.removeEventListener("loadedmetadata", listener);
    }
  }, [onMetadataLoaded]);

  return (
    <video
      ref={videoRef}
      src={src}
      controls
      muted={false}
      className={cn("w-full h-full object-cover", className)}
    />
  );
}

export default VideoPlayer;
