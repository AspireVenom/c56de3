// src/utils/graph.ts
export function getDependencyForms(
  currentFormId: string,
  edges: { source: string; target: string }[],
  transitive: boolean,
): string[] {
  const result = new Set<string>();
  const depMap = new Map<string, string[]>();

  for (const edge of edges) {
    if (!depMap.has(edge.target)) depMap.set(edge.target, []);
    depMap.get(edge.target)!.push(edge.source);
  }

  const visit = (id: string) => {
    for (const parent of depMap.get(id) || []) {
      if (!result.has(parent)) {
        result.add(parent);
        if (transitive) visit(parent);
      }
    }
  };

  visit(currentFormId);
  return Array.from(result);
}
