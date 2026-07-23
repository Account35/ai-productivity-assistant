## AI Workplace Productivity Assistant

A lightweight SaaS-style app with a sidebar dashboard and four AI-powered pages. No auth, no database — all state lives in-memory for the session only.

### Pages & Routes
- `/` — Dashboard (overview cards linking to each tool, quick stats/tips)
- `/email` — Smart Email Generator
- `/research` — AI Research Assistant
- `/chat` — AI Chat Assistant
- `/help` — Help & About (usage guide + AI disclaimer)

### Layout
- Root layout in `__root.tsx` with shadcn `Sidebar` (collapsible), header with `SidebarTrigger`, `<Outlet />` for pages.
- Sidebar links: Dashboard, Email, Research, Chat, Help (with lucide icons).
- Card-based content areas, responsive (mobile drawer sidebar).

### Feature specs

**Smart Email Generator (`/email`)**
- Inputs: Recipient (optional), Subject/context (textarea), Tone selector (Formal/Friendly/Persuasive).
- Generate button → calls `generateEmail` server function.
- Editable output textarea; Copy, Regenerate, Clear buttons.
- AI disclaimer banner below output.

**AI Research Assistant (`/research`)**
- Input: Topic/text (large textarea).
- Generate → returns structured summary: Summary, Key Insights (bullets), Actionable Recommendations (bullets).
- Editable output area; Copy, Regenerate, Clear.
- AI disclaimer.

**AI Chat Assistant (`/chat`)**
- Message list + input box + Send button.
- Uses AI SDK `useChat` with `DefaultChatTransport` pointing to `/api/chat` server route (streaming).
- Renders `message.parts` with markdown (react-markdown).
- Clear conversation button; session-only (component state, not persisted).
- AI disclaimer under composer.

**Help & About (`/help`)**
- How to use each tool, tips to save tokens, full AI disclaimer, privacy note (nothing is stored).

### Technical implementation

- **AI Gateway**: Ensure `LOVABLE_API_KEY` exists. Create `src/lib/ai-gateway.server.ts` provider helper (openai-compatible → `https://ai.gateway.lovable.dev/v1`, `Lovable-API-Key` header).
- **Model**: `google/gemini-3.6-flash` for all calls (fast/cheap default).
- **Server functions** (`src/lib/ai.functions.ts`):
  - `generateEmail({ recipient, context, tone })` → returns `{ email: string }` via `generateText`.
  - `generateResearch({ topic })` → returns `{ summary, insights[], recommendations[] }` via `generateText` + `Output.object` (small schema, no bounds).
- **Chat route** (`src/routes/api/chat.ts`): `streamText` + `toUIMessageStreamResponse`, system prompt = workplace productivity assistant.
- **Client**: install `react-markdown` for chat rendering.
- **No persistence**: no localStorage, no DB. State only via `useState`.
- **Token discipline**: AI calls only on explicit button clicks; no auto-regeneration; short system prompts.

### Design
- Clean SaaS aesthetic: neutral background, single accent (indigo/blue), generous whitespace, rounded cards, subtle borders, Inter font.
- Update `src/styles.css` tokens for a modern light theme (keep dark tokens intact).
- Load Inter via `<link>` in `__root.tsx` head.
- Each route sets its own `head()` with unique title/description/og tags.
- Reusable components: `PageHeader`, `AiDisclaimer`, `ToolCard`, `OutputActions` (Copy/Regenerate/Clear).

### Files to create/modify
- Modify: `src/routes/__root.tsx` (sidebar layout, Inter font, meta), `src/routes/index.tsx` (Dashboard), `src/styles.css` (palette tweak).
- New routes: `src/routes/email.tsx`, `src/routes/research.tsx`, `src/routes/chat.tsx`, `src/routes/help.tsx`, `src/routes/api/chat.ts`.
- New lib: `src/lib/ai-gateway.server.ts`, `src/lib/ai.functions.ts`.
- New components: `src/components/app-sidebar.tsx`, `src/components/ai-disclaimer.tsx`, `src/components/page-header.tsx`, `src/components/output-actions.tsx`.
- Install: `react-markdown`, `@ai-sdk/react`, `ai`, `@ai-sdk/openai-compatible`, `zod` (if missing).

### Out of scope
- No login, no database, no email sending, no history/persistence.
