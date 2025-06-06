import React, { useEffect, useState } from "react";
import { fetchBlueprintGraph } from "../api/fetchBlueprintGraph";
import { Form } from "../types/graph";
import PrefillEditor, { PrefillMapping } from "./PrefillEditor";

const FormList = () => {
  const [edges, setEdges] = useState<{ source: string; target: string }[]>([]);
  const [forms, setForms] = useState<Form[]>([]);
  const [error, setError] = useState("");
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [prefillMap, setPrefillMap] = useState<PrefillMapping>({});

  useEffect(() => {
    fetchBlueprintGraph(
      "1",
      "bp_01jk766tckfwx84xjcxazggzyc",
      "bp_01jk766tckfwx84xjcxazggzyc",
    )
      .then((data) => {
        setForms(data.forms || []);
        setEdges(data.edges || []);
      })
      .catch((err) => setError(err.message));
  }, []);
  return (
    <div className="form-list">
      {forms.map((form) => (
        <div
          key={form.id}
          className="form-card"
          onClick={() => setSelectedForm(form)}
        >
          <h3>{form.name}</h3>
          <p>{form.description}</p>
          <small>ID: {form.id}</small>
        </div>
      ))}

      {selectedForm && (
        <PrefillEditor
          form={selectedForm}
          mapping={prefillMap}
          onUpdate={setPrefillMap}
          context={{
            currentFormId: selectedForm.id,
            forms,
            edges,
            globalData: {
              today: "2025-06-05",
              userEmail: "test@example.com",
            },
          }}
        />
      )}
    </div>
  );
};

export default FormList;
