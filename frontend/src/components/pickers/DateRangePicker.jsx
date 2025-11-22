import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function BasicDateRangePicker({
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    disabled = false,
    resetTrigger,
}) {
    const [fromPicked, setFromPicked] = React.useState(false);
    const [toPicked, setToPicked] = React.useState(false);

    // When resetTrigger changes, reset pick flags
    React.useEffect(() => {
        setFromPicked(false);
        setToPicked(false);
    }, [resetTrigger]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex items-center space-x-2">
                <DatePicker
                    label="From"
                    disabled={disabled}
                    value={fromDate}
                    onChange={(newValue) => {
                        setFromDate(newValue);
                        setFromPicked(true);
                    }}
                    slotProps={{
                        textField: {
                            size: "small",
                            sx: {
                                borderRadius: "8px",
                                width: "100%",
                                "& .MuiInputBase-input": {
                                    color: fromPicked
                                        ? "rgba(0, 0, 0, 1)"
                                        : "rgba(0, 0, 0, 0.4)",
                                    fontSize: "12px",
                                    fontFamily: "Inter, sans-serif",
                                },
                                "& .MuiInputLabel-root": {
                                    color: disabled
                                        ? "rgba(0, 0, 0, 0.3)"
                                        : "rgba(0, 0, 0, 0.7)",
                                    fontWeight: 400,
                                    fontSize: "16px",
                                },
                                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                                    borderColor: "#7A1CA9",
                                },
                                "& .MuiOutlinedInput-root:hover fieldset": {
                                    borderColor: "#7A1CA9",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#7A1CA9",
                                    backgroundColor: "rgba(122, 28, 169, 0.1)",
                                    borderRadius: "8px",
                                    padding: "3px",
                                    fontSize: "25px",
                                },
                            },
                        },
                    }}
                />
                <DatePicker
                    label="To"
                    disabled={disabled}
                    value={toDate}
                    onChange={(newValue) => {
                        setToDate(newValue);
                        setToPicked(true);
                    }}
                    slotProps={{
                        textField: {
                            size: "small",
                            sx: {
                                borderRadius: "8px",
                                width: "100%",
                                "& .MuiInputBase-input": {
                                    color: toPicked
                                        ? "rgba(0, 0, 0, 1)"
                                        : "rgba(0, 0, 0, 0.4)",
                                    fontSize: "12px",
                                    fontFamily: "Inter, sans-serif",
                                },
                                "& .MuiInputLabel-root": {
                                    color: disabled
                                        ? "rgba(0, 0, 0, 0.3)"
                                        : "rgba(0, 0, 0, 0.7)",
                                    fontWeight: 400,
                                    fontSize: "16px",
                                },
                                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                                    borderColor: "#7A1CA9",
                                },
                                "& .MuiOutlinedInput-root:hover fieldset": {
                                    borderColor: "#7A1CA9",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#7A1CA9",
                                    backgroundColor: "rgba(122, 28, 169, 0.1)",
                                    borderRadius: "8px",
                                    padding: "3px",
                                    fontSize: "25px",
                                },
                            },
                        },
                    }}
                />
            </div>
        </LocalizationProvider>
    );
}
