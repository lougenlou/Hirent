// src/pages/owner/AddItem.js
import React from "react";
import { useNavigate } from "react-router-dom";
import OwnerSidebar from "../../components/layout/OwnerSidebar";
import AddNewItemForm from "../../components/forms/AddNewItemForm";

export default function AddItem() {
  const navigate = useNavigate();

  const handleSubmit = async (formData, images) => {
    console.log("Form Data:", formData);
    console.log("Images:", images);

    // TODO: Call your API here to create the item
    // Example:
    // await api.post("/owner/items", formData);

    navigate("/ownerdashboard");
  };

  const handleCancel = () => {
    navigate("/ownerdashboard");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <OwnerSidebar />

      {/* Main Content */}
      <div className="flex-1 p-10 ml-72">
        <AddNewItemForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}
