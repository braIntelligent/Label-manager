import { useEffect, useState } from "react";
import { getAllLabels } from "../api/task.api";
import { LabelsCard } from "./LabelsCard";

export function LabelList() {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    async function loadLabels() {
      const res = await getAllLabels();
      setLabels(res.data);
    }
    loadLabels();
  }, []);

  return (
    <div>
      {labels.map((label) => (
        <LabelsCard key={label.id} label={label} />
      ))}
    </div>
  );
}
