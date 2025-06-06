// src/types/graph.ts
export interface Form {
  id: string;
  name: string;
  description: string;
  is_reusable?: boolean;
  field_schema?: {
    properties: Record<string, any>;
  };
}

export interface GraphResponse {
  forms: Form[];
}
