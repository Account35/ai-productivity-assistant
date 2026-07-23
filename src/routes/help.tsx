import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle, Shield, Zap, Mail, Search, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & About — AI Workplace" },
      {
        name: "description",
        content: "How to use the AI Workplace Productivity Assistant and responsible AI guidelines.",
      },
      { property: "og:title", content: "Help & About" },
      { property: "og:description", content: "Usage guide and responsible AI disclaimer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HelpPage,
});

function HelpPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        icon={<HelpCircle className="h-5 w-5" />}
        title="Help & About"
        description="A quick guide to the tools and how we handle your data."
      />

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Mail className="h-4 w-4" /> Smart Email Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Describe what the email is about, pick a tone (Formal, Friendly, or Persuasive), and
            click Generate. Edit freely, copy to your clipboard, or regenerate for a new draft.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Search className="h-4 w-4" /> AI Research Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Paste any topic, article, or notes. The assistant returns a concise summary, key
            insights, and actionable recommendations you can refine.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4" /> AI Chat Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            An interactive assistant for productivity, planning, and communication. The conversation
            only exists in your current browser session — clearing it starts fresh.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4" /> Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            No account required. No database, no history, no tracking of prompts or outputs.
            Everything you type or generate lives only in the current browser tab and is discarded
            when you close it.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="h-4 w-4" /> Responsible AI
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            AI-generated content is intended to assist users and should always be reviewed for
            accuracy, professionalism, and suitability before use. AI can produce mistakes,
            outdated facts, or biased phrasing — always apply your own judgment.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
