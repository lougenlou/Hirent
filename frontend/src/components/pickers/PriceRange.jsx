import React, { useState } from "react";
import Slider from "@mui/material/Slider";

const PriceRangeSlider = ({ onPriceChange }) => {
  const [value, setValue] = useState([100, 5000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onPriceChange) onPriceChange(newValue);
  };

  return (
    <div className="flex flex-col gap-0">
      <Slider
        value={value}
        onChange={handleChange}
        min={10}
        max={5000}
        step={10}
        valueLabelDisplay="auto"
        sx={{
          color: "#7A1CA9",
          "& .MuiSlider-thumb": {
            backgroundColor: "#fff",
            border: "2px solid #7A1CA9",
          },
          "& .MuiSlider-track": {
            backgroundColor: "#7A1CA9",
          },
          "& .MuiSlider-rail": {
            opacity: 0.3,
          },
        }}
      />
      <div className="flex justify-between text-[13px] text-gray-600">
        <span>₱{value[0]}</span>
        <span>₱{value[1]}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
