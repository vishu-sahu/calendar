import React from "react";

const Header = ({ month, year, onPrev, onNext }) => (
  <div className="flex justify-between items-center p-4 border-b">
    <h1 className="text-xl font-bold">Calendar</h1>
    <div className="flex items-center gap-2">
      <button onClick={onPrev} className="px-4 py-2 bg-gray-200 rounded">&#8592;</button>
      <span className="text-lg font-semibold">{month} {year}</span>
      <button onClick={onNext} className="px-4 py-2 bg-gray-200 rounded">&#8594;</button>
    </div>
  </div>
);

export default Header;