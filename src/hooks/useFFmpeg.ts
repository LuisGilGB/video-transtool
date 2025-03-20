import {FFmpeg} from "@ffmpeg/ffmpeg";
import {useEffect, useRef} from "react";

const useFFmpeg = ({
  onLog,
}: {
  onLog?: (message: string, type: string) => void;
} = {}) => {
  const ffmpeg = useRef(new FFmpeg()).current;

  useEffect(() => {
    const logListener = ({message, type}: { message: string, type: string }) => {
      onLog?.(message, type);
    }
    ffmpeg.on('log', logListener);
    return () => {
      ffmpeg.off('log', logListener);
    }
  }, [ffmpeg, onLog]);

  return ffmpeg;
}

export default useFFmpeg;
