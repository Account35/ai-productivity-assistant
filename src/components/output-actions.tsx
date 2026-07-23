import { Copy, RefreshCw, Trash2, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function OutputActions({
  text,
  onRegenerate,
  onClear,
  regenerating,
}: {
  text: string;
  onRegenerate: () => void;
  onClear: () => void;
  regenerating?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={handleCopy} disabled={!text}>
        {copied ? <Check className="mr-1.5 h-4 w-4" /> : <Copy className="mr-1.5 h-4 w-4" />}
        {copied ? "Copied" : "Copy"}
      </Button>
      <Button variant="outline" size="sm" onClick={onRegenerate} disabled={regenerating}>
        <RefreshCw className={`mr-1.5 h-4 w-4 ${regenerating ? "animate-spin" : ""}`} />
        Regenerate
      </Button>
      <Button variant="ghost" size="sm" onClick={onClear} disabled={!text}>
        <Trash2 className="mr-1.5 h-4 w-4" />
        Clear
      </Button>
    </div>
  );
}
