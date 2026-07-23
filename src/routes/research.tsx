import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import ReactMarkdown from "react-markdown";

import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { OutputActions } from "@/components/output-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { generateResearch } from "@/lib/ai.functions";

type Result = { summary: string; insights: string[]; recommendations: string[] };

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — AI Workplace" },
      {
        name: "description",
        content: "Summarize topics and get key insights and actionable recommendations with AI.",
      },
      { property: "og:title", content: "AI Research Assistant" },
      {
        property: "og:description",
        content: "AI summaries, insights, and actionable recommendations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchPage,
});

function toText(r: Result) {
  return `Summary:\n${r.summary}\n\nKey Insights:\n${r.insights
    .map((i) => `- ${i}`)
    .join("\n")}\n\nRecommendations:\n${r.recommendations.map((i) => `- ${i}`).join("\n")}`;
}

function ResearchPage() {
  const call = useServerFn(generateResearch);
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    if (!topic.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await call({ data: { topic } });
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        icon={<Search className="h-5 w-5" />}
        title="AI Research Assistant"
        description="Paste a topic, article, or notes. Get a summary, insights, and recommendations."
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Topic or text</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic" className="sr-only">
              Topic
            </Label>
            <Textarea
              id="topic"
              placeholder="Paste an article, meeting notes, or describe a topic you want analyzed..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={8}
            />
          </div>
          <Button onClick={run} disabled={loading || !topic.trim()}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Generate Insights
              </>
            )}
          </Button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Summary</Label>
              <div className="prose prose-sm dark:prose-invert max-w-none rounded-md border bg-muted/30 p-4">
                <ReactMarkdown>{result.summary}</ReactMarkdown>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Key Insights</Label>
              <ul className="prose prose-sm dark:prose-invert max-w-none list-disc space-y-1 rounded-md border bg-muted/30 p-4 pl-8">
                {result.insights.map((it, i) => (
                  <li key={i}>
                    <ReactMarkdown components={{ p: ({ children }) => <>{children}</> }}>
                      {it}
                    </ReactMarkdown>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <Label>Actionable Recommendations</Label>
              <ul className="prose prose-sm dark:prose-invert max-w-none list-disc space-y-1 rounded-md border bg-muted/30 p-4 pl-8">
                {result.recommendations.map((it, i) => (
                  <li key={i}>
                    <ReactMarkdown components={{ p: ({ children }) => <>{children}</> }}>
                      {it}
                    </ReactMarkdown>
                  </li>
                ))}
              </ul>
            </div>


            <OutputActions
              text={toText(result)}
              regenerating={loading}
              onRegenerate={run}
              onClear={() => setResult(null)}
            />
            <AiDisclaimer />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
