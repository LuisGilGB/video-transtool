'use client';

import {retrieveTranscription} from "@/app/actions";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import VideoPlayer, {VideoMetadata} from "@/components/VideoPlayer";
import {cn} from "@/lib/utils";
import {extractVideoMetadata} from "@/lib/video";
import {FFmpeg} from "@ffmpeg/ffmpeg";
import {FC, useState} from "react";

interface VideoAnalysisProps {
  title: string;
  src: string;
  file: File;
  className?: string;
  ffmpeg: FFmpeg;
}

const VideoAnalysis: FC<VideoAnalysisProps> = ({
  title,
  src,
  file,
  className,
  ffmpeg,
}) => {
  const {toast} = useToast();

  const [videoMetadata, setVideoMetadata] = useState<VideoMetadata | null>(null);
  const [ffmpegMetadata, setFFmpegMetadata] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [sendingTranscription, setSendingTranscription] = useState<boolean>(false);

  const emitErrorToast = (message: string) => {
    console.log('toast', message);
    toast({
      title: 'Error',
      description: message,
    });
  }

  const getTranscription = async () => {
    try {
      console.log('Retrieving transcription...');
      const formData = new FormData();
      formData.append('file', (file as File));
      setSendingTranscription(true);
      const transcript = await retrieveTranscription(formData);
      console.log('Got transcription: ', transcript);
      setTranscript(transcript);
    } catch (error) {
      console.error(error);
      emitErrorToast('Failed to retrieve transcription');
    } finally {
      setSendingTranscription(false);
    }
  }

  return (
    <section className={cn("flex flex-col gap-4 p-4 bg-primary/10 rounded-lg", className)}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="w-full aspect-video bg-primary/25 rounded-lg overflow-hidden">
        {src && (
          <VideoPlayer
            src={src}
            onMetadataLoaded={async (metadata) => {
              try {
                setVideoMetadata(metadata);
                const ffmpegMetadata = await extractVideoMetadata(ffmpeg, file!);
                setFFmpegMetadata(ffmpegMetadata);
              } catch (error) {
                console.error(error);
                emitErrorToast('Failed to retrieve video metadata');
              }
            }}
          />
        )}
      </div>
      <section>
        <p>URL: {src}</p>
        <p>File: {file?.name}</p>
        <p>Size: {file?.size!.toLocaleString(
          navigator.language,
          {
            style: 'unit',
            unit: 'byte',
            unitDisplay: 'long',
          }
        )}</p>
        <p>Type: {file?.type}</p>
        <p>Last modified: {!isNaN(file?.lastModified!) && new Date(file?.lastModified!).toString()}</p>
      </section>
      {videoMetadata && (
        <section>
          <h3 className="text-lg font-bold mb-2">Metadata</h3>
          <div className="flex flex-col">
            {Object.entries(videoMetadata).map(([key, value]) => (
              <p key={key}>{key}: {value}</p>
            ))}
          </div>
        </section>
      )}
      {ffmpegMetadata && (
        <section>
          <h3 className="text-lg font-bold mb-2">FFmpeg Metadata</h3>
          <pre className="bg-gray-950 p-4 text-gray-50 text-xs text-pretty break-all">
            {ffmpegMetadata}
          </pre>
        </section>
      )}
      <Button
        loading={sendingTranscription}
        onClick={getTranscription}
      >
        Get transcription
      </Button>
      {transcript && (
        <section>
          <h3 className="text-lg font-bold mb-4">Transcript</h3>
          <p>{transcript}</p>
        </section>
      )}
    </section>
  );
};

export default VideoAnalysis;
