import React, { useState } from "react";
import Calendar from "./components/Calendar/Calendar";
import TaskModal from "./components/TaskModal/TaskModal";
import FiltersPanel from "./components/Filters/FiltersPanel";
import { Task } from "./types/TaskTypes";

export default function App() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [rangeStart, setRangeStart] = useState<Date | null>(null);
    const [rangeEnd, setRangeEnd] = useState<Date | null>(null);

    const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
    const [searchText, setSearchText] = useState<string>("");

    const openModal = (start: Date, end: Date, task?: Task) => {
        setRangeStart(new Date(start));
        setRangeEnd(new Date(end));
        setEditingTask(task || null);
        setModalOpen(true);
    };

    return (
        <div style={{
            maxWidth: 1000,
            margin: "10px auto",
            padding: "10px",
            fontFamily: "'Segoe UI', sans-serif",
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                    <h2 style={{ margin: 0 }}>Month Planner</h2>
                    <div style={{ color: "#6b7280" }}>{currentMonth.toLocaleString(undefined, { month: "long", year: "numeric" })}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}>Prev</button>
                    <button onClick={() => setCurrentMonth(new Date())}>Today</button>
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}>Next</button>
                </div>
            </div>

            <FiltersPanel onFilterChange={setCategoryFilter} onSearch={setSearchText} />

            <Calendar
                year={currentMonth.getFullYear()}
                month={currentMonth.getMonth()}
                openModal={openModal}
                categoryFilter={categoryFilter}
                searchText={searchText}
            />

            <TaskModal
                isOpen={modalOpen}
                defaultStart={rangeStart}
                defaultEnd={rangeEnd}
                editingTask={editingTask}
                onClose={() => {
                    setModalOpen(false);
                    setEditingTask(null);
                    setRangeStart(null);
                    setRangeEnd(null);
                }}
            />
        </div>
    );
}
