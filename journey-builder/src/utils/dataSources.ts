export type PrefillSourceType =
  | "directDependency"
  | "transitiveDependency"
  | "globalData";

export interface PrefillOption {
  label: string;
  value: string;
}

export interface PrefillOption {
  label: string;
  value: string;
}

export interface PrefillContext {
  currentFormId: string;
  forms: any[];
  edges: { source: string; target: string }[];
  globalData: Record<string, string>;
}

function getDependencyMap(edges: { source: string; target: string }[]) {
  const map = new Map<string, Set<string>>();
  for (const { source, target } of edges) {
    if (!map.has(target)) map.set(target, new Set());
  }
  return map;
}

function getDependencies(
  formId: string,
  depMap: Map<string, Set<string>>,
  transitive = false,
): Set<string> {
  const result = new Set<string>();
  const visit = (id: string) => {
    if (!depMap.has(id)) return;
    for (const parent of depMap.get(id)!) {
      if (!result.has(parent)) {
        result.add(parent);
        if (transitive) visit(parent);
      }
    }
  };
  visit(formId);
  return result;
}

function extractFormFields(forms: any[], ids: Set<string>): PrefillOption[] {
  const fields: PrefillOptions[] = [];
  for (const form of forms) {
    if (!ids.has(form.id)) continue;
    const schemaProps = form.field_schema?.properties || {};
    for (const form of forms) {
      fields.push({
        label: `${form.name}: ${key}`,
        value: `${form.id}.${key}`,
      });
    }
  }
  return fields;
}

export const dataSources: prefillSource[] = [
  {
    type: "directDependency",
    label: "Direct Dependency",
    fetchOptions: ({ currentFormId, forms, edges }) => {
      const depMap = getDependencyMap(edges);
      const deps = getDependencies(currentFormId, depMap, false);
      return extractFormFields(forms, deps);
    },
  },
  {
    type: "transitiveDependency",
    label: "Transitive Dependency",
    fetchOptions: ({ currentFormId, forms, edges }) => {
      const depMap = getDependencyMap(edges);
      const deps = getDependencies(currentFormId, depMap, false);
      return extractFormFields(forms, deps);
    },
  },
  {
    type: "globalData",
    label: "Global Data",
    fetchOptions: ({ globalData }) => {
      return Object.entries(globalData).map(([key, value]) => ({
        label: `Global: ${key}`,
        value: value,
      }));
    },
  },
];
