import {FFmpeg} from '@ffmpeg/ffmpeg';
import {fetchFile} from '@ffmpeg/util';

export const extractVideoMetadata = async (ffmpeg: FFmpeg, file: File): Promise<string> => {
  if (!ffmpeg.loaded) {
    await ffmpeg.load();
  }

  await ffmpeg.writeFile(file.name, await fetchFile(file));

  const metadataFileName = `${file.name}.metadata.txt`;

  await ffmpeg.exec(['-i', file.name, '-f', 'ffmetadata', metadataFileName]);

  const data = await ffmpeg.readFile(metadataFileName, 'utf8');
  return data.toString();
};
