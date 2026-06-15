'use server';
/**
 * @fileOverview An AI agent for clarifying cybersecurity concepts.
 *
 * - clarifyCybersecurityConcept - A function that handles clarifying cybersecurity concepts.
 * - CybersecurityConceptClarifierInput - The input type for the clarifyCybersecurityConcept function.
 * - CybersecurityConceptClarifierOutput - The return type for the clarifyCybersecurityConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CybersecurityConceptClarifierInputSchema = z.object({
  concept: z
    .string()
    .describe('The cybersecurity concept or term to be explained.'),
});
export type CybersecurityConceptClarifierInput = z.infer<
  typeof CybersecurityConceptClarifierInputSchema
>;

const CybersecurityConceptClarifierOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'A concise and clear explanation or summary of the cybersecurity concept.'
    ),
});
export type CybersecurityConceptClarifierOutput = z.infer<
  typeof CybersecurityConceptClarifierOutputSchema
>;

export async function clarifyCybersecurityConcept(
  input: CybersecurityConceptClarifierInput
): Promise<CybersecurityConceptClarifierOutput> {
  return cybersecurityConceptClarifierFlow(input);
}

const cybersecurityConceptClarifierPrompt = ai.definePrompt({
  name: 'cybersecurityConceptClarifierPrompt',
  input: {schema: CybersecurityConceptClarifierInputSchema},
  output: {schema: CybersecurityConceptClarifierOutputSchema},
  prompt: `You are an expert cybersecurity educator. Your task is to provide a concise and easy-to-understand explanation or summary of a given cybersecurity concept.

Explain the following cybersecurity concept for a learner:

Concept: {{{concept}}}

Provide the explanation in a clear, straightforward manner.`,
});

const cybersecurityConceptClarifierFlow = ai.defineFlow(
  {
    name: 'cybersecurityConceptClarifierFlow',
    inputSchema: CybersecurityConceptClarifierInputSchema,
    outputSchema: CybersecurityConceptClarifierOutputSchema,
  },
  async (input) => {
    const {output} = await cybersecurityConceptClarifierPrompt(input);
    return output!;
  }
);
