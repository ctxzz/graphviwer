import mermaid from "mermaid";

let isInitialized = false;

export function initMermaid() {
  if (!isInitialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
      fontFamily: "monospace",
    });
    isInitialized = true;
  }
}

export async function renderMermaid(mermaidCode: string): Promise<string> {
  try {
    initMermaid();
    const id = `mermaid-${Date.now()}-${Math.random()}`;
    const { svg } = await mermaid.render(id, mermaidCode);
    return svg;
  } catch (error) {
    throw new Error(`Mermaid rendering error: ${error instanceof Error ? error.message : String(error)}`);
  }
}
