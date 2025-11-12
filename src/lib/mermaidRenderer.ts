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
    // Generate valid CSS ID (no dots, starts with letter)
    const randomId = Math.random().toString(36).substring(2, 15);
    const id = `mermaid-${Date.now()}-${randomId}`;
    const { svg } = await mermaid.render(id, mermaidCode);
    return svg;
  } catch (error) {
    throw new Error(`Mermaid rendering error: ${error instanceof Error ? error.message : String(error)}`);
  }
}
