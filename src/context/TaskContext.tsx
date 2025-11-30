import React, { createContext, useState, useEffect } from "react";
import { Task } from "../types/TaskTypes";

export interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  moveTaskToDate: (newDate: Date, taskId: string) => void;
}

export const TaskContext = createContext<TaskContextProps>({} as TaskContextProps);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("planner-tasks");
    if (saved) {
      try {
        const parsed = JSON.parse(saved).map((t: any) => ({
          ...t,
          start: new Date(t.start),
          end: new Date(t.end),
        }));
        setTasks(parsed);
      } catch (err) {
        console.error("LocalStorage parse error:", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("planner-tasks", JSON.stringify(tasks));
  }, [tasks]);


  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };


  const updateTask = (task: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  };

  const moveTaskToDate = (newDate: Date, taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, start: newDate, end: newDate }
          : t
      )
    );

    localStorage.removeItem("drag-task-id");
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, moveTaskToDate }}>
      {children}
    </TaskContext.Provider>
  );
};

