export type PrefillOption = {
  label: string;
  value: string;
};

export interface PrefillContext {
  currentFormId: string;
  forms: {
    id: string;
    name: string;
    field_schema?: {
      properties?: Record<string, unknown>;
    };
  }[];
  edges: { source: string; target: string }[];
  globalData: Record<string, string>;
}

export interface PrefillSource {
  label: string;
  fetchOptions: (context: PrefillContext) => PrefillOption[];
}

function getDependencyMap(edges: { source: string; target: string }[]) {
  const map = new Map<string, Set<string>>();
  for (const { source, target } of edges) {
    if (!map.has(target)) map.set(target, new Set());
    map.get(target)!.add(source);
  }
  return map;
}

export function getDependencyForms(
  formId: string,
  edges: { source: string; target: string }[],
  transitive: boolean,
): string[] {
  const depMap = getDependencyMap(edges);
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
  return [...result];
}

function extractFormFields(
  form: PrefillContext["forms"][number],
): PrefillOption[] {
  const properties = form.field_schema?.properties || {};
  return Object.keys(properties).map((key) => ({
    label: `${form.name}: ${key}`,
    value: `${form.id}.${key}`,
  }));
}
export function buildFormFieldSource(
  formId: string,
  form: PrefillContext["forms"][number] | undefined,
): PrefillSource {
  return {
    label: `Form ${form?.name || formId}`,
    fetchOptions: () => (form ? extractFormFields(form) : []),
  };
}

export function buildGlobalSource(
  globalData: Record<string, string>,
): PrefillSource {
  return {
    label: "Global Data",
    fetchOptions: () =>
      Object.entries(globalData).map(([key, value]) => ({
        label: `Global: ${key}`,
        value,
      })),
  };
}
