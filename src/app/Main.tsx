'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VideoAnalysis from "@/components/VideoAnalysis";
import useFFmpeg from "@/hooks/useFFmpeg";
import { useMutation } from "@tanstack/react-query";
import { useLayoutEffect, useRef, useState } from "react";

const Main = () => {
  const ffmpegLogsPreRef = useRef<HTMLPreElement>(null);

  const [src, setSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [transcodedSrc, setTranscodedSrc] = useState<string | null>(null);
  const [transcodedFile, setTranscodedFile] = useState<File | null>(null);
  const [ffmpegLogs, setFFmpegLogs] = useState<string[]>([]);

  const reset = () => {
    setSrc(null);
    setFile(null);
    setTranscodedSrc(null);
    setTranscodedFile(null);
    setFFmpegLogs([]);
  }

  const videoTransformationMutation = useMutation({
    mutationFn: async () => {
      const outputFileName = 'output.mp4';
      await ffmpeg.exec([
        '-i', file!.name,
        '-c:v', 'libx264',
        '-crf', '40',
        '-preset', 'ultrafast',
        '-c:a', 'aac',
        '-b:a', '64k',
        outputFileName,
      ]);
      console.log('Transcoding done');
      const output = await ffmpeg.readFile(outputFileName);
      console.log('Output file read');
      setTranscodedSrc(URL.createObjectURL(new Blob([output], { type: 'video/mp4' })));
      setTranscodedFile(new File([output], outputFileName));
      console.log('Transcoded video ready');
    }
  });

  const audioTranscodingMutation = useMutation({
    mutationFn: async () => {
      const outputFileName = 'output.mp3';
      await ffmpeg.exec([
        '-i', file!.name,
        '-vn',
        '-preset', 'ultrafast',
        '-c:a', 'mp3',
        '-b:a', '48k',
        outputFileName,
      ]);
      console.log('Transcoding done');
      const output = await ffmpeg.readFile(outputFileName);
      console.log('Output file read');
      setTranscodedSrc(URL.createObjectURL(new Blob([output], { type: 'audio/mp3' })));
      setTranscodedFile(new File([output], outputFileName));
      console.log('Transcoded audio ready');
    }
  });

  const ffmpeg = useFFmpeg({
    onLog: (message, type) => {
      setFFmpegLogs((logs) => [...logs, `${type}: ${message}`]);
    }
  });

  useLayoutEffect(() => {
    ffmpegLogsPreRef.current?.scrollTo(0, ffmpegLogsPreRef.current?.scrollHeight);
  }, [ffmpegLogs]);

  const hasVideo = Boolean(src);
  const hasTranscodedVideo = Boolean(transcodedSrc);

  return (
    <main className="relative min-h-screen flex flex-col">
      <header className="sticky top-0 flex flex-col md:flex-row md:justify-between gap-x-8 gap-y-4 p-4 mb-12 border-b bg-white bg-opacity-80 backdrop-blur z-10">
        <Input
          type="file"
          accept="video/*"
          className="max-w-[400px]"
          onChange={
            (event) => {
              const file = event.target.files?.[0];
              if (file) {
                reset();
                const url = URL.createObjectURL(file);
                console.log(url);
                setSrc(url);
                setFile(file);
              }
            }
          }
        />
        <section className="flex gap-x-2 self-end">
          <Button
            disabled={!hasVideo}
            loading={videoTransformationMutation.isPending}
            onClick={() => videoTransformationMutation.mutate()}
          >
            Transcode video
          </Button>
          <Button
            disabled={!hasVideo}
            loading={audioTranscodingMutation.isPending}
            onClick={() => audioTranscodingMutation.mutate()}
          >
            Extract audio
          </Button>
        </section>
      </header>
      <section
        className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1232px] mx-auto px-4 lg:px-24"
      >
        {hasVideo && (
          <VideoAnalysis title="Original video" src={src!} file={file!} ffmpeg={ffmpeg} className="h-fit" />
        )}
        {hasTranscodedVideo && (
          <VideoAnalysis title="Transcoded video" src={transcodedSrc!} file={transcodedFile!} ffmpeg={ffmpeg} className="h-fit" />
        )}
      </section>
      <footer className="mt-12 sticky bottom-0 flex flex-col justify-center w-full h-[300px] max-h-[30%] overflow-hidden p-4 border-t bg-white bg-opacity-80 backdrop-blur z-10">
        <h3 className="text-lg font-bold mb-2">FFmpeg Logs</h3>
        <pre className="bg-gray-950 p-4 text-gray-50 text-xs text-pretty break-all flex-1 overflow-y-auto w-max-[1232px]" ref={ffmpegLogsPreRef}>
          {ffmpegLogs.join('\n')}
        </pre>
      </footer>
    </main>
  );
}

export default Main;
