// src/components/Calendar.jsx
import React, { useState } from "react";
import dayjs from "dayjs";
import Header from "./Header";
import Event from "./Event";
import EventForm from "./EventForm";
import MiniCalendar from "./MiniCalendar";

const Calendar = () => {
  const [date, setDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const startOfMonth = date.startOf("month");
  const endOfMonth = date.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");
  const today = dayjs();

  const calendarDays = [];
  let currentDay = startDate;
  while (currentDay.isBefore(endDate)) {
    calendarDays.push(currentDay);
    currentDay = currentDay.add(1, "day");
  }

  const handlePrevMonth = () => setDate(date.subtract(1, "month"));
  const handleNextMonth = () => setDate(date.add(1, "month"));

  const handleAddEvent = (dateStr) => {
    setSelectedDate(dateStr);
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDeleteEvent = (event) => {
    setEvents(events.filter((e) => e.id !== event.id));
  };

  const handleSaveEvent = (newEvent) => {
    setEvents((prev) => {
      const exists = prev.find((e) => e.id === newEvent.id);
      return exists
        ? prev.map((e) => (e.id === newEvent.id ? newEvent : e))
        : [...prev, newEvent];
    });
  };

  return (
    <div className="grid grid-cols-[300px_1fr] h-screen">
      <div className="border-r overflow-y-auto p-4">
        <button
          onClick={() => handleAddEvent(today.format("YYYY-MM-DD"))}
          className="flex items-center justify-center gap-2 bg-white border px-4 py-2 rounded-full shadow w-full mb-4"
        >
          <span className="text-xl text-blue-500">
            <img
              src="https://google-calendar-clone.netlify.app/static/media/plus.8f3ab9f72337618f2823670542a3a8e4.svg"
              alt=""
            />
          </span>
          <span className="text-base font-medium text-blue-600">Create</span>
        </button>
        <MiniCalendar
          currentDate={date}
          onPrevMonth={() => setDate(date.subtract(1, "month"))}
          onNextMonth={() => setDate(date.add(1, "month"))}
          onDateClick={(selected) => {
            setDate(selected);
            handleAddEvent(selected.format("YYYY-MM-DD"));
          }}
        />
      </div>
      <div className="flex flex-col overflow-y-auto">
        <Header
          month={date.format("MMMM")}
          year={date.format("YYYY")}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />
        <div className="grid grid-cols-7 gap-1 text-center p-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-bold text-gray-700">
              {day}
            </div>
          ))}
          {calendarDays.map((day) => {
            const formatted = day.format("YYYY-MM-DD");
            const dayEvents = events.filter((e) => e.date === formatted);
            const isToday = day.isSame(today, "day");
            const isCurrentMonth = day.month() === date.month();

            return (
              <div
                key={formatted}
                className={`p-2 border min-h-[100px] rounded text-left cursor-pointer hover:bg-gray-50
                  ${!isCurrentMonth ? "text-gray-400" : ""}
                  ${isToday ? "bg-blue-100" : "bg-white"}`}
                onDoubleClick={() => handleAddEvent(formatted)}
              >
                <div className="text-xs font-bold text-right">{day.date()}</div>
                {dayEvents.map((event, idx) => (
                  <Event
                    key={idx}
                    event={event}
                    onDelete={handleDeleteEvent}
                    onEdit={handleEditEvent}
                  />
                ))}
              </div>
            );
          })}
        </div>
        {showForm && (
          <EventForm
            existingEvent={editingEvent || { date: selectedDate }}
            onSave={handleSaveEvent}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
