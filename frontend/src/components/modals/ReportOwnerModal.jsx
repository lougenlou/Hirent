import React, { useState } from "react";

const ReportModal = ({
  chatId,
  onClose,
  onSubmit,
  submittedReport,
  setSubmittedReport,
}) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const reasons = [
    "Spam",
    "Inappropriate behavior",
    "Scam / Fraud",
    "Illegal activity",
    "Harassment",
    "Hate speech",
    "Violence",
    "Something else",
  ];

  const handleSubmit = () => {
    const reasonToSubmit =
      selectedReason === "Something else" ? customReason : selectedReason;
    if (!reasonToSubmit) return;

    onSubmit(chatId, reasonToSubmit);
    setSelectedReason("");
    setCustomReason("");

    setSubmittedReport(true); // <- add this
  };

  return (
    <>
      {/* Modal */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 pt-12">
        <div className="bg-white rounded-xl w-full max-w-md p-8 shadow-lg relative">
          <h2 className="text-xl font-bold mb-3">Report Owner</h2>
          <p className="text-sm text-gray-900 mb-4 leading-relaxed">
            Why are you reporting this owner?
            <br />
            <span className="block mt-3 mb-6 text-[13px] text-gray-500 leading-relaxed">
              Your report is anonymous unless it's for an intellectual property
              issue. If the owner is placing someone in immediate danger, please
              contact your local emergency services.
            </span>
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {reasons.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedReason(item)}
                className={`px-3 py-2 rounded-full text-[13px] transition
                  ${
                    selectedReason === item
                      ? item === "Something else"
                        ? "bg-red-100 text-red-600"
                        : "bg-purple-100 text-purple-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Custom Reason Textarea */}
          <div className="mb-2">
            <h3 className="text-sm font-medium mb-1">Reason</h3>
            <textarea
              placeholder="Help us understand the issue with this owner."
              className="w-full p-3 border rounded-lg text-[13px] focus:ring-2 focus:ring-purple-300 outline-none"
              rows={3}
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              disabled={selectedReason !== "Something else"}
            />
          </div>

          {/* Submit & Cancel */}
          <button
            className="w-full py-2.5 text-sm rounded-lg bg-[#7A1CA9] border hover:bg-purple-700 text-white font-medium mt-2"
            onClick={handleSubmit}
          >
            Submit report
          </button>

          <button
            className="w-full py-2 text-gray-600 border rounded-lg hover:text-gray-800 text-sm mt-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportModal;
