import React from "react";

const Event = ({ event, onDelete, onEdit }) => (
  <div className="bg-blue-200 p-2 mt-1 rounded text-sm relative">
    <div>{event.time} - {event.title}</div>
    <div className="flex gap-1 mt-1">
      <button onClick={() => onEdit(event)} className="text-xs text-green-700 underline">Edit</button>
      <button onClick={() => onDelete(event)} className="text-xs text-red-700 underline">Delete</button>
    </div>
  </div>
);

export default Event;