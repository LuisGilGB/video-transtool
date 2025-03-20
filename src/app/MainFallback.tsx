'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MainFallback = () => {
  return (
    <main className="relative min-h-screen flex flex-col">
      <header className="sticky top-0 flex flex-col md:flex-row md:justify-between gap-x-8 gap-y-4 p-4 mb-12 border-b bg-white bg-opacity-80 backdrop-blur z-10">
        <Input
          type="file"
          accept="video/*"
          className="max-w-[400px]"
          disabled
        />
        <section className="flex gap-x-2 self-end">
          <Button disabled>Transcode video</Button>
          <Button disabled>Extract audio</Button>
        </section>
      </header>
      <section
        className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1232px] mx-auto px-4 lg:px-24"
      >
        {/*<VideoAnalysisFallback title="Original video" src="" className="h-fit" />*/}
      </section>
      <footer className="mt-12 sticky bottom-0 flex flex-col justify-center w-full h-[300px] max-h-[30%] overflow-hidden p-4 border-t bg-white bg-opacity-80 backdrop-blur z-10">
        <h3 className="text-lg font-bold mb-2">FFmpeg Logs</h3>
        <pre className="bg-gray-950 p-4 text-gray-50 text-xs text-pretty break-all flex-1 overflow-y-auto w-max-[1232px]">
        </pre>
      </footer>
    </main>
  );
}

export default MainFallback;
