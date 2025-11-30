import React from "react";
import { Task } from "../../types/TaskTypes";

interface Props {
    task: Task;
    onClick?: () => void;
}

const TaskBar: React.FC<Props> = ({ task, onClick }) => {
    const handleDragStart = (e: React.DragEvent) => {
        localStorage.setItem("drag-task-id", task.id);
        try {
            e.dataTransfer.setData("text/plain", task.id);
        } catch {
        }
    };

    return (
        <div
            className="task-bar"
            draggable
            onDragStart={handleDragStart}
            onClick={onClick}
            style={{
                background: task.color || (task.category === "Completed" ? "#16a34a" : "#2563eb"),
                padding: "2px 4px",
                borderRadius: 4,
                fontSize: 10,
                marginBottom: 2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                cursor: "grab",
                color: "white"
            }}
            title={`${task.title} • ${task.category}`}
        >
            {task.title}
        </div>
    );
};

export default TaskBar;