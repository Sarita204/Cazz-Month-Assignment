import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import { Task, Category } from "../../types/TaskTypes";

interface Props {
  isOpen: boolean;
  defaultStart: Date | null;
  defaultEnd: Date | null;
  editingTask?: Task | null;
  onClose: () => void;
}

const categories: Category[] = ["To Do", "In Progress", "Review", "Completed"];

const TaskModal: React.FC<Props> = ({ isOpen, defaultStart, defaultEnd, editingTask, onClose }) => {
  const { addTask, updateTask } = useContext(TaskContext);

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<Category>("To Do");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setCategory(editingTask.category || "To Do");
    } else {
      setTitle("");
      setCategory("To Do");
    }
  }, [editingTask, isOpen]);

  const handleSave = () => {
    if (!title || !defaultStart || !defaultEnd) return;

    const payload: Task = {
      id: editingTask?.id || Date.now().toString(),
      title,
      category,
      start: new Date(defaultStart),
      end: new Date(defaultEnd),
    };

    if (editingTask) updateTask(payload);
    else addTask(payload);

    setTitle("");
    setCategory("To Do");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(2,6,23,0.45)", zIndex: 1200 }}>
      <div style={{ width: 420, background: "#fff", padding: 16, borderRadius: 8 }}>
        <h3 style={{ marginTop: 0 }}>{editingTask ? "Edit Task" : "Create Task"}</h3>

        <div style={{ display: "grid", gap: 8 }}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" style={{ padding: 8 }} />

          <div style={{ display: "flex", gap: 8 }}>
            <input type="date" value={defaultStart ? defaultStart.toISOString().slice(0, 10) : ""} readOnly style={{ padding: 8, flex: 1 }} />
            <input type="date" value={defaultEnd ? defaultEnd.toISOString().slice(0, 10) : ""} readOnly style={{ padding: 8, flex: 1 }} />
          </div>

          <select value={category} onChange={(e) => setCategory(e.target.value as Category)} style={{ padding: 8 }}>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button onClick={() => { setTitle(""); setCategory("To Do"); onClose(); }} style={{ padding: "8px 12px" }}>Cancel</button>
            <button onClick={handleSave} style={{ padding: "8px 12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 6 }}>{editingTask ? "Save" : "Create"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
