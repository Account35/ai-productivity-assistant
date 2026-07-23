import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Search, MessageSquare, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AiDisclaimer } from "@/components/ai-disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Automate emails, research, and everyday workplace tasks with an AI-powered productivity assistant.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Generate emails, summarize research, and chat with an AI workplace assistant.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    title: "Smart Email Generator",
    description: "Craft professional emails in seconds — Formal, Friendly, or Persuasive.",
    to: "/email" as const,
    icon: Mail,
  },
  {
    title: "AI Research Assistant",
    description: "Summarize topics, surface key insights, and get actionable recommendations.",
    to: "/research" as const,
    icon: Search,
  },
  {
    title: "AI Chat Assistant",
    description: "Ask anything about productivity, planning, or workplace communication.",
    to: "/chat" as const,
    icon: MessageSquare,
  },
  {
    title: "Help & About",
    description: "Learn how to use the tools and read our responsible AI guidelines.",
    to: "/help" as const,
    icon: HelpCircle,
  },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        icon={<Sparkles className="h-5 w-5" />}
        title="Welcome to your AI workplace"
        description="Pick a tool to get started. Nothing is saved — your session stays private."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <Link key={t.to} to={t.to} className="group">
            <Card className="h-full transition-all hover:border-primary/50 hover:shadow-sm">
              <CardHeader>
                <div className="mb-2 grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <t.icon className="h-5 w-5" />
                </div>
                <CardTitle className="flex items-center justify-between text-base">
                  {t.title}
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </CardTitle>
                <CardDescription>{t.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-semibold">100%</p>
            <p className="mt-1 text-sm text-muted-foreground">Session-only. No data stored.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-semibold">3 tones</p>
            <p className="mt-1 text-sm text-muted-foreground">Formal, Friendly, Persuasive.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-semibold">On-demand</p>
            <p className="mt-1 text-sm text-muted-foreground">
              AI runs only when you click Generate.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <AiDisclaimer />
      </div>
    </div>
  );
}
