import React, { useState } from "react";

const EventForm = ({ onSave, onClose, existingEvent }) => {
  const [title, setTitle] = useState(existingEvent?.title || "");
  const [date, setDate] = useState(existingEvent?.date || "");
  const [time, setTime] = useState(existingEvent?.time || "");
  const [duration, setDuration] = useState(existingEvent?.duration || 30);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: existingEvent?.id || Date.now(), title, date, time, duration });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded w-80">
        <h2 className="text-lg font-semibold mb-2">{existingEvent ? "Edit" : "Add"} Event</h2>
        <input className="w-full border p-1 mb-2" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <input className="w-full border p-1 mb-2" type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <input className="w-full border p-1 mb-2" type="time" value={time} onChange={e => setTime(e.target.value)} required />
        <input className="w-full border p-1 mb-2" type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} required placeholder="Duration (minutes)" />
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
          <button type="button" onClick={onClose} className="text-gray-600 px-3 py-1">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
