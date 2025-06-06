// /src/types/prefill.ts
import { Form } from "./graph";

export interface PrefillContext {
  currentFormId: string;
  forms: Form[];
  edges: { source: string; target: string }[];
  globalData: Record<string, string>;
}
