import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Send, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";

import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { OutputActions } from "@/components/output-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateEmail } from "@/lib/ai.functions";

type Tone = "Formal" | "Friendly" | "Persuasive";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI Workplace" },
      {
        name: "description",
        content: "Generate professional emails in Formal, Friendly, or Persuasive tones with AI.",
      },
      { property: "og:title", content: "Smart Email Generator" },
      {
        property: "og:description",
        content: "AI-generated professional emails with editable tone.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const call = useServerFn(generateEmail);
  const [recipient, setRecipient] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    if (!context.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await call({ data: { recipient, context, tone } });
      setOutput(res.email);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        icon={<Mail className="h-5 w-5" />}
        title="Smart Email Generator"
        description="Describe the email you need and pick a tone. The AI drafts it — you refine it."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient (optional)</Label>
              <Input
                id="recipient"
                placeholder="e.g. Sarah from Marketing"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="context">What is the email about?</Label>
              <Textarea
                id="context"
                placeholder="Follow up on yesterday's meeting and propose a demo next Tuesday..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Friendly">Friendly</SelectItem>
                  <SelectItem value="Persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={run} disabled={loading || !context.trim()} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Generate Email
                </>
              )}
            </Button>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Generated email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder="Your AI-generated email will appear here. You can edit it freely."
              rows={14}
              className="font-mono text-sm"
            />
            <OutputActions
              text={output}
              regenerating={loading}
              onRegenerate={run}
              onClear={() => setOutput("")}
            />
            <AiDisclaimer />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
