import React, { useRef, useState } from "react";
import { Task } from "../../types/TaskTypes";

interface TaskResizeHandlesProps {
  task: Task;
  onResize: (newStart: Date, newEnd: Date) => void;
}

const TaskResizeHandles: React.FC<TaskResizeHandlesProps> = ({ task, onResize }) => {
  const handleRef = useRef<HTMLDivElement | null>(null);
  const [resizing, setResizing] = useState<"left" | "right" | null>(null);
  const [startX, setStartX] = useState<number>(0);

  const dayWidth = 100;

  const handleMouseDown = (e: React.MouseEvent, edge: "left" | "right") => {
    e.stopPropagation();
    setResizing(edge);
    setStartX(e.clientX);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!resizing) return;
    const dx = e.clientX - startX;
    const dayOffset = Math.round(dx / dayWidth);
    if (dayOffset === 0) return;

    let newStart = new Date(task.start);
    let newEnd = new Date(task.end);

    if (resizing === "left") {
      newStart.setDate(newStart.getDate() + dayOffset);
      if (newStart > newEnd) newStart = new Date(newEnd);
    } else if (resizing === "right") {
      newEnd.setDate(newEnd.getDate() + dayOffset);
      if (newEnd < newStart) newEnd = new Date(newStart);
    }

    onResize(newStart, newEnd);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setResizing(null);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <div
        onMouseDown={(e) => handleMouseDown(e, "left")}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 6,
          cursor: "ew-resize",
          background: "transparent",
        }}
      />
      <div
        onMouseDown={(e) => handleMouseDown(e, "right")}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 6,
          cursor: "ew-resize",
          background: "transparent",
        }}
      />
    </>
  );
};

export default TaskResizeHandles;
