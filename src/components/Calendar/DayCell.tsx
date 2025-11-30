import React, { useContext } from "react";
import { Task } from "../../types/TaskTypes";
import TaskBar from "./TaskBar";
import { TaskContext } from "../../context/TaskContext";

interface Props {
  date: Date | null;
  tasks: Task[];
  isSelected?: boolean;
  onMouseDown?: () => void;
  onMouseEnter?: () => void;
  onMouseUp?: () => void;
  openModal?: (start: Date, end: Date, task?: Task) => void;
  isToday?: boolean;
}

const DayCell: React.FC<Props> = ({ date, tasks, isSelected, onMouseDown, onMouseEnter, onMouseUp, openModal, isToday }) => {
  const { moveTaskToDate } = useContext(TaskContext);

  const handleDrop = (e?: React.DragEvent) => {
    e?.preventDefault();
    if (!date) return;
    let draggedId: string | null = null;
    try {
      draggedId = e?.dataTransfer?.getData("text/plain") || localStorage.getItem("drag-task-id");
    } catch {
      draggedId = localStorage.getItem("drag-task-id");
    }
    if (!draggedId) return;
    moveTaskToDate(date, draggedId);
  };

  return (
    <div
      className={`day-cell ${isSelected ? "selected-cell" : ""}`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      style={{
        border: "1px solid #e6e9ee",
        minHeight: 60,
        padding: 4,
        background: isSelected ? "rgba(37,99,235,0.06)" : "#fff",
        boxSizing: "border-box",
        overflow: "hidden", 
        display: "flex",
        flexDirection: "column",
        fontSize: 12,

      }}
    >
      {date && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: 22,
              height: 22,
              lineHeight: "20px",
              textAlign: "center",
              borderRadius: "50%",
              background: isToday ? "#1e40af" : "transparent",
              color: isToday ? "#fff" : "#111827",
              fontWeight: 600,
              margin: "0 auto 4px auto",

            }}
          >
            {date.getDate()}
          </div>
        </div>
      )}

      <div style={{ marginTop: 8 }}>
        {tasks.map((t) => (
          <TaskBar key={t.id} task={t} onClick={() => openModal && openModal(t.start, t.end, t)} />
        ))}
      </div>
    </div>
  );
};

export default DayCell;