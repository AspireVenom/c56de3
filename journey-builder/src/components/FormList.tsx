import React, { useEffect, useState } from "react";
import { fetchBlueprintGraph } from "../api/fetchBlueprintGraph";
import { Form } from "../types/graph";

const FormList = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlueprintGraph()
      .then((data) => setForms(data.forms || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Forms</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {forms.map((form) => (
          <li key={form.id}>(form.name)</li>
        ))}
      </ul>
    </div>
  );
};

export default FormList;
