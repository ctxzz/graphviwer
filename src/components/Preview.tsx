import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { renderGraphviz } from "@/lib/graphvizRenderer";
import { renderMermaid } from "@/lib/mermaidRenderer";

interface PreviewProps {
  code: string;
  type: "graphviz" | "mermaid";
}

export function Preview({ code, type }: PreviewProps) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const render = async () => {
      if (!code.trim()) {
        setSvg("");
        setError("");
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        let renderedSvg: string;
        if (type === "graphviz") {
          renderedSvg = await renderGraphviz(code);
        } else {
          renderedSvg = await renderMermaid(code);
        }
        setSvg(renderedSvg);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        setSvg("");
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(render, 500);
    return () => clearTimeout(debounceTimer);
  }, [code, type]);

  return (
    <Card className="h-full">
      <CardContent className="p-6 h-full overflow-auto">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Rendering...</p>
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {!isLoading && !error && svg && (
          <div
            className="flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
        {!isLoading && !error && !svg && (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              Enter code to see preview
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
