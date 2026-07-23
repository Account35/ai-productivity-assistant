import { createServerFn } from "@tanstack/react-start";
import { generateText, Output, NoObjectGeneratedError } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const MODEL = "google/gemini-3.6-flash";

const EmailInput = z.object({
  recipient: z.string().max(200).optional().default(""),
  context: z.string().min(1).max(4000),
  tone: z.enum(["Formal", "Friendly", "Persuasive"]),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => EmailInput.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const gateway = createLovableAiGatewayProvider(key);

    const system =
      "You write professional workplace emails. Return only the email body (with subject line on the first line prefixed 'Subject:'). No preamble, no commentary.";
    const prompt = `Tone: ${data.tone}
Recipient: ${data.recipient || "(unspecified)"}
Context / purpose:
${data.context}

Write the email now.`;

    const { text } = await generateText({
      model: gateway(MODEL),
      system,
      prompt,
    });
    return { email: text.trim() };
  });

const ResearchInput = z.object({
  topic: z.string().min(1).max(6000),
});

const ResearchSchema = z.object({
  summary: z.string(),
  insights: z.array(z.string()),
  recommendations: z.array(z.string()),
});

export const generateResearch = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ResearchInput.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const gateway = createLovableAiGatewayProvider(key);

    const prompt = `You are a research assistant. Analyze the following topic or text and produce:
- A concise summary (2-4 sentences).
- 3 to 6 key insights (short bullets).
- 3 to 5 actionable recommendations (short bullets).

Topic/text:
${data.topic}`;

    try {
      const { output } = await generateText({
        model: gateway(MODEL),
        output: Output.object({ schema: ResearchSchema }),
        prompt,
      });
      return output;
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        return { summary: error.text ?? "", insights: [], recommendations: [] };
      }
      throw error;
    }
  });
