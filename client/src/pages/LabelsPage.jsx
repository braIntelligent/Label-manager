import { useEffect, useState } from "react";
import { getAllLabels } from "../api/task.api";
import { LabelsCard } from "../components/LabelsCard";

export function LabelsPage() {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    async function loadLabels() {
      const res = await getAllLabels();
      setLabels(res.data);
    }
    loadLabels();
  }, []);

  return (
    <div className=" border-1 border-red-600 flex flex-col justify-center items-center">
      <h1 className="font-bold text-xl">
        etiquetas
      </h1>
      {labels.map((label) => (
        <LabelsCard key={label.id} label={label} />
      ))}
    </div>
  );
}
