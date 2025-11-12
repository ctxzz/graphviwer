import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Editor } from "@/components/Editor";
import { Preview } from "@/components/Preview";
import { Toolbar } from "@/components/Toolbar";
import { renderGraphviz } from "@/lib/graphvizRenderer";
import { renderMermaid } from "@/lib/mermaidRenderer";

const GRAPHVIZ_SAMPLE = `digraph G {
  rankdir=LR;
  node [shape=box, style=rounded];

  A [label="Start"];
  B [label="Process"];
  C [label="Decision"];
  D [label="End"];

  A -> B;
  B -> C;
  C -> D [label="Yes"];
  C -> B [label="No"];
}`;

const MERMAID_SAMPLE = `graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]`;

function App() {
  const [activeTab, setActiveTab] = useState<"graphviz" | "mermaid">("graphviz");
  const [graphvizCode, setGraphvizCode] = useState(() => {
    return localStorage.getItem("graphviz-code") || GRAPHVIZ_SAMPLE;
  });
  const [mermaidCode, setMermaidCode] = useState(() => {
    return localStorage.getItem("mermaid-code") || MERMAID_SAMPLE;
  });

  useEffect(() => {
    localStorage.setItem("graphviz-code", graphvizCode);
  }, [graphvizCode]);

  useEffect(() => {
    localStorage.setItem("mermaid-code", mermaidCode);
  }, [mermaidCode]);

  const currentCode = activeTab === "graphviz" ? graphvizCode : mermaidCode;
  const setCurrentCode = activeTab === "graphviz" ? setGraphvizCode : setMermaidCode;
  const sampleCode = activeTab === "graphviz" ? GRAPHVIZ_SAMPLE : MERMAID_SAMPLE;

  const handleClear = () => {
    setCurrentCode("");
  };

  const handleSample = () => {
    setCurrentCode(sampleCode);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      alert("Code copied to clipboard!");
    } catch (err) {
      alert("Failed to copy code");
    }
  };

  const handleDownloadSVG = async () => {
    try {
      let svg: string;
      if (activeTab === "graphviz") {
        svg = await renderGraphviz(currentCode);
      } else {
        svg = await renderMermaid(currentCode);
      }

      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${activeTab}-${Date.now()}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert(`Failed to download SVG: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-3xl">Graphviz & Mermaid Viewer</CardTitle>
            <CardDescription>
              A modern web-based viewer for Graphviz and Mermaid diagrams
            </CardDescription>
          </CardHeader>
        </Card>

        <Alert className="mb-4">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Privacy Notice:</strong> This is a publicly accessible tool. All data stays in your browser's localStorage only.
            Do not enter sensitive information (passwords, API keys, personal data).
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "graphviz" | "mermaid")}>
          <TabsList className="mb-4">
            <TabsTrigger value="graphviz">Graphviz</TabsTrigger>
            <TabsTrigger value="mermaid">Mermaid</TabsTrigger>
          </TabsList>

          <TabsContent value="graphviz" className="space-y-4">
            <Toolbar
              onClear={handleClear}
              onSample={handleSample}
              onCopyCode={handleCopyCode}
              onDownloadSVG={handleDownloadSVG}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-250px)]">
              <Editor
                value={graphvizCode}
                onChange={setGraphvizCode}
                language="dot"
              />
              <Preview code={graphvizCode} type="graphviz" />
            </div>
          </TabsContent>

          <TabsContent value="mermaid" className="space-y-4">
            <Toolbar
              onClear={handleClear}
              onSample={handleSample}
              onCopyCode={handleCopyCode}
              onDownloadSVG={handleDownloadSVG}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-250px)]">
              <Editor
                value={mermaidCode}
                onChange={setMermaidCode}
                language="mermaid"
              />
              <Preview code={mermaidCode} type="mermaid" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
