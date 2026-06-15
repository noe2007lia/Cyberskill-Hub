'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating dynamic, AI-powered questions or tasks
 * based on a given cybersecurity learning module's content.
 *
 * - generateModuleQuestion - A function that handles the generation of a question or task.
 * - GenerateModuleQuestionInput - The input type for the generateModuleQuestion function.
 * - GenerateModuleQuestionOutput - The return type for the generateModuleQuestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateModuleQuestionInputSchema = z.object({
  moduleTitle: z.string().describe('The title of the cybersecurity learning module.'),
  moduleContent: z
    .string()
    .describe('The detailed content of the cybersecurity learning module.'),
});
export type GenerateModuleQuestionInput = z.infer<
  typeof GenerateModuleQuestionInputSchema
>;

const GenerateModuleQuestionOutputSchema = z.object({
  question: z
    .string()
    .describe('A unique, AI-generated question or a small task related to the module.'),
  suggestedAnswer: z
    .string()
    .describe('A concise, suggested answer to the generated question or task.'),
});
export type GenerateModuleQuestionOutput = z.infer<
  typeof GenerateModuleQuestionOutputSchema
>;

export async function generateModuleQuestion(
  input: GenerateModuleQuestionInput
): Promise<GenerateModuleQuestionOutput> {
  return generateModuleQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateModuleQuestionPrompt',
  input: { schema: GenerateModuleQuestionInputSchema },
  output: { schema: GenerateModuleQuestionOutputSchema },
  prompt: `You are a helpful cybersecurity training assistant. Your task is to create a unique, dynamic question or a small task based on the provided module content. The question/task should help a learner test their understanding and reinforce their learning.

Also, provide a concise, suggested answer to the question or task.

Module Title: {{{moduleTitle}}}
Module Content: {{{moduleContent}}}

Please ensure the generated question/task and suggested answer are directly relevant to the provided content and are in the specified JSON format.`,
});

const generateModuleQuestionFlow = ai.defineFlow(
  {
    name: 'generateModuleQuestionFlow',
    inputSchema: GenerateModuleQuestionInputSchema,
    outputSchema: GenerateModuleQuestionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
