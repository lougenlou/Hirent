import React, { useState, useRef, useEffect } from "react";

const SortDropdown = ({ onSortChange }) => {
  const [selected, setSelected] = useState("Popular");
  const textRef = useRef(null);
  const selectRef = useRef(null);

  // Adjust width dynamically based on text
  useEffect(() => {
    if (textRef.current && selectRef.current) {
      selectRef.current.style.width = `${textRef.current.offsetWidth + 4}px`;
    }
  }, [selected]);

  // Handle change & Enter key
  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    if (onSortChange) onSortChange(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSortChange) {
      onSortChange(selected);
    }
  };

  return (
    <div className="flex items-center border border-gray-400 rounded-lg px-2 py-1.5 text-sm text-gray-400 w-fit">
      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4 text-gray-600 mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M6.75 12h10.5m-7.5 5.25h4.5"
        />
      </svg>

      {/* Label */}
      <span className="text-gray-400 mr-1">Sort by:</span>

      {/* Select dropdown */}
      <select
        ref={selectRef}
        value={selected}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="bg-transparent focus:outline-none text-[#7A1CA9] font-light cursor-pointer appearance-none border-none p-0 m-0 leading-tight"
      >
        <option value="Popular">Popular</option>
        <option value="Newest">Newest</option>
        <option value="Lowest Price">Lowest Price</option>
        <option value="Highest Price">Highest Price</option>
      </select>

      {/* Hidden span for dynamic width */}
      <span
        ref={textRef}
        className="absolute invisible whitespace-pre font-light text-sm"
      >
        {selected}
      </span>
    </div>
  );
};

export default SortDropdown;
