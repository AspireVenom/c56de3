export interface Form {
  id: string;
  name: string;
  field_schema?: {
    properties: Record<string, any>;
  };
}

export interface GraphResponse {
  forms: {
    id: string;
    name: string;
    field_schema?: {
      properties: Record<string, unknown>;
    };
  }[];
}
export {};
