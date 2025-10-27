import React, { useState, useRef, useEffect } from "react";
import "../../assets/Onboarding.css";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
    const navigate = useNavigate();
    const timerRef = useRef(null);

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [industry, setIndustry] = useState("Clothing");

    const options = [
        "Social Media",
        "Friends or Family",
        "Colleagues",
        "Exploring",
        "While browsing",
        "Online Ads",
    ];

    const handleSelect = (option) => {
        setSelectedOptions((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    const handleNext = () => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          navigate("/onboarding4");
        }, 300);
      };
    
      useEffect(() => {
        return () => clearTimeout(timerRef.current);
      }, []);

    return (
        <div className="flex flex-col relative onboarding-content-wrapper">
            <div className="onboarding-inner flex flex-col items-center justify-center px-6 relative z-10">
        <div className="onboarding-content">

                    <h2 className="text-[28px] font-bold text-gray-900 mt-4 mb-2 text-center whitespace-nowrap max-w-none">
                        Where did you hear about Hirent?
                    </h2>
                    <p className="text-[15px] text-gray-600 mb-8 text-center whitespace-nowrap max-w-none">
                        Your answer helps us reach more people who’d love renting as much as
                        you do.
                    </p>

                    {/* Multi-select options with radio indicators */}
                    <div className="w-full max-w-[500px] mb-8 grid grid-cols-2 gap-3">
                        {options.map((option) => {
                            const selected = selectedOptions.includes(option);
                            return (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                    className={`flex items-center justify-start gap-4 px-3 py-3 rounded-full border text-[15px] transition-all 
          ${selected
                                            ? "border-[#7A1CA9] text-[#7A1CA9]"
                                            : "border-gray-300 text-gray-700 hover:border-[#7A1CA9]"
                                        }`}
                                >
                                    {/* Outer radio circle */}
                                    <span
                                        className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all
            ${selected ? "border-[#7A1CA9]" : "border-gray-400"
                                            }`}
                                    >
                                        {/* Inner filled circle (only visible if selected) */}
                                        {selected && (
                                            <span className="w-[8px] h-[8px] rounded-full bg-[#7A1CA9]"></span>
                                        )}
                                    </span>
                                    {option}
                                </button>
                            );
                        })}
                    </div>


                    {/* Next Button */}
                    <button
                        type="button"
                        onClick={handleNext}
                        className="relative w-[90%] mx-auto bg-[#7A1CA9] text-white py-3.5 text-[15px] font-medium rounded-md overflow-hidden group transition-all duration-300 mt-2"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-pink-700 to-purple-600 opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700 ease-in-out"></span>
                        <span className="absolute inset-0 bg-white opacity-20 rotate-45 translate-x-[-150%] group-hover:translate-x-[150%] blur-sm transition-transform duration-700 ease-in-out"></span>
                        <span className="relative z-10">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
