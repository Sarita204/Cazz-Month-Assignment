import React, { useState } from "react";

const categories = ["To Do", "In Progress", "Review", "Completed"];

interface Props {
  onFilterChange: (cats: string[]) => void;
  onSearch: (q: string) => void;
}

const FiltersPanel: React.FC<Props> = ({ onFilterChange, onSearch }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [q, setQ] = useState("");

  const toggle = (c: string) => {
    const next = selected.includes(c) ? selected.filter(s => s !== c) : [...selected, c];
    setSelected(next);
    onFilterChange(next);
  };

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
      <div>
        {categories.map(c => (
          <label key={c} style={{ marginRight: 8 }}>
            <input type="checkbox" checked={selected.includes(c)} onChange={() => toggle(c)} /> {c}
          </label>
        ))}
      </div>

      <div style={{ marginLeft: "auto" }}>
        <input value={q} onChange={(e) => { setQ(e.target.value); onSearch(e.target.value); }} placeholder="Search tasks..." style={{ padding: 6 }} />
      </div>
    </div>
  );
};

export default FiltersPanel;
