'use client';

import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface VideoAnalysisFallbackProps {
  title: string;
  src: string;
  className?: string;
}

const VideoAnalysisFallback: FC<VideoAnalysisFallbackProps> = ({
  title,
  src,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <h2 className="text-xl font-bold">{title}</h2>
      <VideoPlayer src={src} />
      <Button disabled>Analyze video</Button>
    </div>
  );
};

export default VideoAnalysisFallback;
