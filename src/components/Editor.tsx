import { Editor as MonacoEditor } from "@monaco-editor/react";
import { Card, CardContent } from "@/components/ui/card";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: "dot" | "mermaid";
}

export function Editor({ value, onChange, language }: EditorProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-0 h-full">
        <MonacoEditor
          height="100%"
          language={language === "dot" ? "plaintext" : "markdown"}
          value={value}
          onChange={(value) => onChange(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
          }}
        />
      </CardContent>
    </Card>
  );
}
