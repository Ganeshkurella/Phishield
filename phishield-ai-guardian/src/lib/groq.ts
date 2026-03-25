import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || "fallback_key_to_prevent_crash",
  dangerouslyAllowBrowser: true // We must allow this for frontend-only apps without a proper backend
});

export interface GroqScanResult {
  riskScore: number;
  status: "safe" | "suspicious" | "phishing";
  whyIsRisky: string;
  domainAge: string;
  suspiciousContent: string;
  scamPatterns: string;
}

const SYSTEM_PROMPT = `
You are PHISHIELD, an elite AI cybersecurity analyst specializing in detecting scams, phishing, fake job offers, and financial fraud.
The user will provide you with text (which could be an extracted SMS, a raw URL, an email, or a job offer).

Your job is to analyze this text and return a STRICT JSON object representing your analysis.
Do not include ANY conversational text. Return ONLY the raw JSON object.

The JSON object MUST match this exact structure:
{
  "riskScore": number, // A number from 0 to 100 representing the threat level
  "status": "safe" | "suspicious" | "phishing", // Based on the score (0-14=safe, 15-59=suspicious, 60-100=phishing)
  "whyIsRisky": "string", // 1-2 lines specifically explaining why this content is risky (or safe)
  "domainAge": "string", // 1-2 lines detailing the domain age or sender credibility
  "suspiciousContent": "string", // 1-2 lines detailing any suspicious content like high-pressure tactics
  "scamPatterns": "string" // 1-2 lines detailing known scam patterns matching this content
}
`;

export async function analyzeWithGroq(text: string): Promise<GroqScanResult | null> {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: text },
      ],
      model: "llama-3.3-70b-versatile", // Using Llama 3 for strong reasoning capabilities
      temperature: 0.1, // Low temperature for consistent JSON output
      response_format: { type: "json_object" }, // Force JSON output
    });

    const content = chatCompletion.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error("No response generated from Groq.");
    }

    return JSON.parse(content) as GroqScanResult;
  } catch (error) {
    console.error("Groq Analysis Error:", error);
    return null; // The UI should handle this fallback gracefully
  }
}
