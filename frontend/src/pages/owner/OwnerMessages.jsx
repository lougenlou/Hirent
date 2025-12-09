import React, { useEffect, useState, useRef } from "react";
import { makeAPICall, ENDPOINTS } from "../../config/api";
import Sidebar from "../../components/layouts/OwnerSidebar";
import {
  Plus,
  Send,
  Search,
  Ban,
  Flag,
  ShieldCheck,
} from "lucide-react";
import ReportModal from "../../components/modals/ReportRenterModal";

const OwnerMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showLeftScrollbar, setShowLeftScrollbar] = useState(false);
  const [showRightScrollbar, setShowRightScrollbar] = useState(false);

  // Fetch owner messages from backend
  const [inboxList, setInboxList] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const fileInputRef = useRef(null);

  const [showBlockedUsers, setShowBlockedUsers] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  // Fetch owner messages from backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await makeAPICall(ENDPOINTS.MESSAGES?.GET_ALL || "/messages");
        if (Array.isArray(data)) {
          setAllMessages(data);
          const uniqueChats = [...new Map(data.map(msg => [msg.chatId, msg])).values()];
          setInboxList(uniqueChats);
          if (uniqueChats.length > 0) {
            setActiveChatId(uniqueChats[0].chatId);
            setMessagesData(data.filter(msg => msg.chatId === uniqueChats[0].chatId));
          }
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, []);

  const handleBlockRenter = async (chatId) => {
    if (!chatId) return;
    try {
      await makeAPICall(ENDPOINTS.MESSAGES?.BLOCK || `/messages/${chatId}/block`, {
        method: "POST",
      });
      setInboxList((prev) =>
        prev.map((chat) =>
          chat.chatId === chatId ? { ...chat, blocked: true } : chat
        )
      );
    } catch (err) {
      console.error("Error blocking renter:", err);
    }
  };

  const handleReportRenter = async (chatId, reason) => {
    setReportModalOpen(false);
    try {
      await makeAPICall(ENDPOINTS.MESSAGES?.REPORT || `/messages/${chatId}/report`, {
        method: "POST",
        body: JSON.stringify({ reason }),
      });
      setSubmittedReport(true);
      setTimeout(() => setSubmittedReport(false), 5000);
    } catch (err) {
      console.error("Error reporting renter:", err);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !activeChat) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("chatId", activeChat.chatId);

      const response = await makeAPICall(ENDPOINTS.MESSAGES?.SEND_FILE || "/messages/send-file", {
        method: "POST",
        body: formData,
      });

      if (response) {
        setAllMessages((prev) => [...prev, response]);
        setMessagesData((prev) => [...prev, response]);
      }
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeChat) return;

    try {
      const response = await makeAPICall(ENDPOINTS.MESSAGES?.SEND || "/messages/send", {
        method: "POST",
        body: JSON.stringify({
          chatId: activeChat.chatId,
          text: newMessage,
        }),
      });

      if (response) {
        setAllMessages((prev) => [...prev, response]);
        setMessagesData((prev) => [...prev, response]);
        setNewMessage("");
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setMessagesData(allMessages.filter((msg) => msg.chatId === chatId));
    setInboxList((prev) =>
      prev.map((chat) =>
        chat.chatId === chatId ? { ...chat, unreadCount: 0 } : chat
      )
    );
  };

  const activeChat = inboxList.find((chat) => chat.chatId === activeChatId);

  useEffect(() => {
    if (rightRef.current) {
      rightRef.current.scrollTop = rightRef.current.scrollHeight;
    }
  }, [messagesData]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  useEffect(() => {
    document.title = "Hirent — Messages";
    return () => (document.title = "Hirent");
  }, []);

  const handleScrollLeft = () => {
    setShowLeftScrollbar(true);
    clearTimeout(leftRef.current?.timeoutId);
    leftRef.current.timeoutId = setTimeout(
      () => setShowLeftScrollbar(false),
      3000
    );
  };

  const handleScrollRight = () => {
    setShowRightScrollbar(true);
    clearTimeout(rightRef.current?.timeoutId);
    rightRef.current.timeoutId = setTimeout(
      () => setShowRightScrollbar(false),
      3000
    );
  };

  return (
    <div className="flex min-h-screen px-4 ml-48 overflow-hidden">
      <Sidebar />
      {/* LEFT COLUMN */}
      <div
        ref={leftRef}
        onScroll={handleScrollLeft}
        className={`w-[560px] pl-16 flex-shrink-0 h-screen bg-white border-r border-gray-200 overflow-y-auto ${
          showLeftScrollbar ? "show-scrollbar" : "hide-scrollbar"
        }`}
      >
        {/* TITLE */}
        <div className="flex items-start justify-between gap-4 mt-8 mb-5">
          <div className="flex items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-0.5">
                Messages
              </h1>
              <p className="text-gray-500 mr-4">Chat with renters here</p>
            </div>
          </div>

          {/* View Blocked Users Button */}
          <button
            className="px-3 py-1.5 mr-5 mt-4 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 shadow-sm text-[13px] rounded-lg font-medium"
            onClick={() => setShowBlockedUsers((prev) => !prev)}
          >
            {showBlockedUsers ? "View All" : "View Blocked Users"}
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-4 mr-5 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
          <input
            type="text"
            placeholder="Search renters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 text-[14px] focus:ring-2 focus:ring-purple-300 focus:border-purple-400 outline-none"
          />
        </div>

        {/* INBOX LIST */}
        <div className="bg-white space-y-2 mr-5 mb-20">
          <div className="space-y-1">
            {inboxList
              .filter((item) => {
                if (showBlockedUsers) return item.blocked;
                return (
                  !item.blocked &&
                  item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
              })
              .map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 cursor-pointer p-4 rounded-lg hover:bg-purple-100/20 ${
                    item.id === activeChatId ? "bg-purple-200/30" : ""
                  }`}
                  onClick={() => handleSelectChat(item.id)}
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p
                      className={`text-[14px] font-medium ${
                        item.unreadCount ? "font-semibold" : ""
                      }`}
                    >
                      {item.name}
                    </p>
                    <p
                      className={`text-[13px] truncate ${
                        item.unreadCount
                          ? "font-semibold text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {item.lastMessage}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[12px] text-gray-500">
                      {item.lastMessageTime}
                    </span>
                    {item.unreadCount > 0 && (
                      <span className="bg-purple-600 text-white text-[11px] px-2 py-0.5 rounded-full mt-1">
                        {item.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div
        ref={rightRef}
        className={`flex-1 relative h-screen ${
          showRightScrollbar ? "show-scrollbar" : "hide-scrollbar"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-center gap-3 mt-4">
            <img
              src={activeChat?.avatar || ""}
              alt={activeChat?.name || ""}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-[15px] font-semibold">
                {activeChat?.blocked
                  ? "Renter Blocked"
                  : activeChat?.name || "Select a chat"}
              </p>
              {activeChat && (
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activeChat.activeStatus === "Online"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></span>
                  {activeChat.activeStatus}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button
              className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-full text-[13px] font-medium flex items-center gap-1.5"
              onClick={() => handleBlockRenter(activeChat?.id)}
            >
              <Ban className="w-4 h-4" />
              Block Renter
            </button>

            <button
              className="px-2 py-1 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border border-yellow-200 rounded-full text-[13px] font-medium flex items-center gap-1.5"
              onClick={() => setReportModalOpen(true)}
            >
              <Flag className="w-4 h-4" />
              Report Renter
            </button>
          </div>

          {reportModalOpen && (
            <ReportModal
              chatId={activeChat?.id}
              onClose={() => setReportModalOpen(false)}
              onSubmit={handleReportRenter}
              submittedReport={submittedReport}
              setSubmittedReport={setSubmittedReport}
            />
          )}

          {submittedReport && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-[420px] p-8 text-center shadow-lg">
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Thank you for submitting a report!
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  We take reports seriously and after a thorough review, our
                  support team will get back to you.
                </p>
                <div className="mt-4 flex justify-center">
                  <button
                    className="px-3 py-1.5 text-[13px] bg-[#8D00D4] hover:bg-purple-700 text-white rounded-lg"
                    onClick={() => setSubmittedReport(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MESSAGES OR BLOCK NOTICE */}
        {activeChat?.blocked ? (
          <div className="flex-1 flex items-center justify-center px-6 py-52 text-center">
            <div>
              <p className="text-lg font-semibold text-gray-700">
                You have blocked this renter
              </p>
              <p className="text-sm text-gray-500 mt-1">
                You cannot see messages or send messages to this renter anymore.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* MESSAGES AREA */}
            <div
              ref={rightRef}
              onScroll={handleScrollRight}
              className={`flex-1 overflow-y-auto px-10 pt-5 space-y-2 ${
                showRightScrollbar ? "show-scrollbar" : "hide-scrollbar"
              }`}
              style={{
                maxHeight: "calc(100vh - 160px)",
                paddingBottom: "80px",
              }}
            >
              {messagesData.map((msg) => (
                <div
                  key={msg.id}
                  className={msg.sender === "renter" ? "" : "text-right"}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg text-sm ${
                      msg.sender === "renter"
                        ? "bg-gray-100 text-gray-900"
                        : msg.file
                        ? "bg-gray-50 text-gray-900"
                        : "bg-[#8D00D4] text-white text-left"
                    }`}
                  >
                    {msg.file ? (
                      msg.file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(msg.file)}
                          alt={msg.file.name}
                          className="max-w-xs rounded-lg"
                        />
                      ) : (
                        <a
                          href={URL.createObjectURL(msg.file)}
                          download={msg.file.name}
                          className="underline"
                        >
                          {msg.file.name}
                        </a>
                      )
                    ) : (
                      msg.text
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
                </div>
              ))}
            </div>

            {/* MESSAGE INPUT */}
            <div className="absolute bottom-2 pb-6 left-0 w-full px-6 py-3 border-t flex items-center gap-4 bg-white">
              <button
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={handleFileButtonClick}
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />

              <input
                type="text"
                placeholder="Type Something..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 px-4 py-2 bg-gray-50 border rounded-full text-sm outline-none"
              />
              <button
                className="p-3 bg-[#8D00D4] hover:bg-purple-700 text-white rounded-full"
                onClick={handleSendMessage}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OwnerMessages;
