import { Graphviz } from "@hpcc-js/wasm";

let graphvizInstance: any = null;

export async function initGraphviz(): Promise<any> {
  if (!graphvizInstance) {
    graphvizInstance = await Graphviz.load();
  }
  return graphvizInstance;
}

export async function renderGraphviz(dotString: string): Promise<string> {
  try {
    const graphviz = await initGraphviz();
    const svg = graphviz.dot(dotString);
    return svg;
  } catch (error) {
    throw new Error(`Graphviz rendering error: ${error instanceof Error ? error.message : String(error)}`);
  }
}
