# Video Transtool

Video Transtool is a utility app to transcode and transcribe video files using FFmpeg and OpenAI's API.

Live demo: [Video Transtool](https://video-transtool.vercel.app/)

**DISCLAIMER:** Due to Vercel Functions limit, in the live version only videos smaller than 5MB can be processed.

In case you are interested to use this utility to process larger files, you can run it locally or deploy it to your own server. You must use your own OpenAI API key in this case.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm run dev
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
OPENAI_API_KEY=your_openai_api_key
```

## Purpose

This app has been developed as a workaround for some issues found with the transcription with Whisper of some recordings. After some research, it was found that some browsers, devices or configurations produced videos with codecs that were not supported by Whisper, leading to errors or suboptimal transcriptions.

With FFmpeg, we can transcode the video to a format that is supported by Whisper, which can then be transcribed with better results. In addition, we can end up with a file with a smaller size, which can be useful for storage or sharing purposes. After all, audio transcription doesn't need great video qualities.

## Technical overview

FFmpeg is integrated to this app thanks to the `@ffmpeg/ffmpeg` package, which implements FFmpeg's functionality in a WebAssembly module.

The transcription is handled by OpenAI's API, which is used through the `@ai-sdk/openai` package with the Whisper model.

For now, presets for the transcoding are hardcoded. Adding UI elements to customize these parameters would be a good next step.

## Usage

Upload a video file and wait for the transcription to complete.

## License

MIT

## Resources

- [FFmpeg](https://ffmpeg.org/)
- [FFmpeg WebAssembly](https://github.com/ffmpegwasm/ffmpeg.wasm)
- [OpenAI API](https://platform.openai.com/docs/api-reference)
- [AI SDK](https://github.com/vercel/ai)
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Lucide](https://lucide.dev/)
