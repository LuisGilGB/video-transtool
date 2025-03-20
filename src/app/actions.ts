'use server';

import OpenAI from "openai";

const openai = new OpenAI();

export const retrieveTranscription = async (formData: FormData): Promise<string> => {
  const file = formData.get('file') as File;

  const transcriptionResponse = await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file,
  });

  return transcriptionResponse.text;
};
