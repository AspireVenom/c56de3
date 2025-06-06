import React, { useState } from "react";
import { Form } from "../types/graph";
import { getDependencyForms } from "../utils/graph";
import PrefillModal from "./PrefillModal";
import { PrefillContext } from "../types/prefill";
import {
  buildFormFieldSource,
  buildGlobalSource,
  PrefillSource,
} from "../utils/dataSources";

export interface PrefillMapping {
  [fieldKey: string]: string;
}

interface PrefillEditorProps {
  form: Form;
  mapping: PrefillMapping;
  onUpdate: (newMapping: PrefillMapping) => void;
  context: PrefillContext;
}

const PrefillEditor: React.FC<PrefillEditorProps> = ({
  form,
  mapping,
  onUpdate,
  context,
}) => {
  const [openField, setOpenField] = useState<string | null>(null);

  const fieldKeys = Object.keys(form.field_schema?.properties || {});

  const handleSelectPrefill = (value: string) => {
    if (openField) {
      onUpdate({ ...mapping, [openField]: value });
      setOpenField(null);
    }
  };

  const handleClear = (field: string) => {
    const updated = { ...mapping };
    delete updated[field];
    onUpdate(updated);
  };

  // ✅ Build sources dynamically
  const directDeps = getDependencyForms(
    context.currentFormId,
    context.edges,
    false,
  );
  const transitiveDeps = getDependencyForms(
    context.currentFormId,
    context.edges,
    true,
  ).filter((id) => !directDeps.includes(id));

  const sources: PrefillSource[] = [
    ...directDeps.map((id) =>
      buildFormFieldSource(
        id,
        context.forms.find((f) => f.id === id),
      ),
    ),
    ...transitiveDeps.map((id) =>
      buildFormFieldSource(
        id,
        context.forms.find((f) => f.id === id),
      ),
    ),
    buildGlobalSource(context.globalData),
  ];

  return (
    <div>
      <h2>Prefill</h2>
      <p>Prefill fields for this form</p>
      <ul>
        {fieldKeys.map((field) => (
          <li
            key={field}
            style={{
              border: "1px dashed lightblue",
              padding: 8,
              marginBottom: 4,
            }}
          >
            <strong>{field}</strong>
            <br />
            {mapping[field] ? (
              <>
                <span>
                  {field}: {mapping[field]}
                </span>
                <button onClick={() => handleClear(field)}>❌</button>
              </>
            ) : (
              <button onClick={() => setOpenField(field)}>Set Prefill</button>
            )}
          </li>
        ))}
      </ul>

      <PrefillModal
        isOpen={!!openField}
        onClose={() => setOpenField(null)}
        onSelect={handleSelectPrefill}
        context={context}
        sources={sources}
      />
    </div>
  );
};

export default PrefillEditor;
