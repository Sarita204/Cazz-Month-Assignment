import React, { useContext, useState } from "react";
import { getMonthMatrix, isSameDay } from "../../utils/dateUtils";
import DayCell from "./DayCell";
import { TaskContext } from "../../context/TaskContext";
import "../../components/Calendar/Calendar.css"; 
import { Task } from "../../types/TaskTypes";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Props {
  year: number;
  month: number; 
  openModal: (start: Date, end: Date, task?: Task) => void;
  categoryFilter?: string[];
  searchText?: string;
}

const Calendar: React.FC<Props> = ({ year, month, openModal, categoryFilter = [], searchText = "" }) => {
  const days = getMonthMatrix(year, month);
  const { tasks } = useContext(TaskContext);

  // selection drag
  const [isSelecting, setIsSelecting] = useState(false);
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleMouseDown = (i: number) => {
    if (!days[i]) return;
    setIsSelecting(true);
    setStartIndex(i);
    setHoverIndex(i);
  };

  const handleMouseEnter = (i: number) => {
    if (!isSelecting) return;
    if (!days[i]) return;
    setHoverIndex(i);
  };

  const handleMouseUp = () => {
    if (!isSelecting || startIndex === null || hoverIndex === null) {
      setIsSelecting(false);
      setStartIndex(null);
      setHoverIndex(null);
      return;
    }
    const s = Math.min(startIndex, hoverIndex);
    const e = Math.max(startIndex, hoverIndex);
    const startDate = days[s]!;
    const endDate = days[e]!;
    openModal(startDate, endDate);
    setIsSelecting(false);
    setStartIndex(null);
    setHoverIndex(null);
  };

  const isSelected = (i: number) => {
    if (!isSelecting || startIndex === null || hoverIndex === null) return false;
    const min = Math.min(startIndex, hoverIndex);
    const max = Math.max(startIndex, hoverIndex);
    return i >= min && i <= max;
  };

  const today = new Date();

  return (
    <div onMouseUp={handleMouseUp}>
      <div className="week-row">
        {weekDays.map((d) => (
          <div key={d} className="week-cell">
            {d}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)", // 7 days in a row
          gap: "2px",
        }}>
        {days.map((date, i) => {
          const dayTasks = date
            ? tasks.filter((t) => {
              const passesCategory = categoryFilter.length === 0 || (t.category && categoryFilter.includes(t.category));
              const passesSearch = !searchText || t.title.toLowerCase().includes(searchText.toLowerCase());
              const onThisDay = t.start <= date && t.end >= date;
              return passesCategory && passesSearch && onThisDay;
            })
            : [];
          const todayCheck = date ? isSameDay(date, today) : false;
          return (
            <DayCell
              key={i}
              date={date}
              tasks={dayTasks}
              isSelected={isSelected(i)}
              onMouseDown={() => handleMouseDown(i)}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseUp={handleMouseUp}
              openModal={openModal}
              isToday={todayCheck}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;