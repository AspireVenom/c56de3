// src/components/PrefillModal.tsx
import React from "react";
import { PrefillOption, PrefillSource } from "../utils/dataSources";
import { PrefillContext } from "../types/prefill";

interface PrefillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
  context: PrefillContext;
  sources: PrefillSource[];
}

const PrefillModal: React.FC<PrefillModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  context,
  sources,
}) => {
  if (!isOpen) return null;

  const options = sources.flatMap((source) => {
    const items = source.fetchOptions(context);
    return items.map((opt) => ({ ...opt, group: source.label }));
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-md mx-auto mt-40">
        <h3 className="text-lg font-semibold mb-4">
          Select a field to prefill with
        </h3>
        <ul className="max-h-60 overflow-auto">
          {options.map((opt) => (
            <li
              key={opt.value}
              className="cursor-pointer hover:bg-gray-200 p-2 border-b"
              onClick={() => {
                onSelect(opt.value);
                onClose();
              }}
            >
              <span className="font-bold">{opt.group}:</span> {opt.label}
            </li>
          ))}
        </ul>
        <button className="mt-4 px-3 py-1 bg-gray-300" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PrefillModal;
