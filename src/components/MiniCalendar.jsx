import React from "react";
import dayjs from "dayjs";

const MiniCalendar = ({ currentDate, onDateClick, onPrevMonth, onNextMonth }) => {
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const today = dayjs();

  const days = [];
  let day = startDate;
  while (day.isBefore(endDate)) {
    days.push(day);
    day = day.add(1, "day");
  }

  const isSameMonth = (date) => date.month() === currentDate.month();

  return (
    <div className="p-4 text-center">
      

      <div className="flex justify-between items-center my-2">
        <button onClick={onPrevMonth}>&lt;</button>
        <div className="font-semibold">{currentDate.format("MMMM YYYY")}</div>
        <button onClick={onNextMonth}>&gt;</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm">
        {["S", "M", "T", "W", "T", "F", "S"].map(d => <div key={d} className="font-bold">{d}</div>)}
        {days.map(d => (
          <div
            key={d.toString()}
            onClick={() => onDateClick(d)}
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
              ${!isSameMonth(d) ? "text-gray-400" : ""}
              ${d.isSame(today, "day") ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
          >
            {d.date()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;