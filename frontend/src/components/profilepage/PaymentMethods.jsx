import { CreditCard, Wallet, Plus, Pencil, Trash2, X } from "lucide-react";
import React, { useState } from "react";

// Importing logos for GCash, Maya, PayPal (assuming these images exist in your assets)
import gcashLogo from "../../assets/payment/gcash-logo.png"; // Example path
import mayaLogo from "../../assets/payment/maya-logo.png";   // Example path
import paypalLogo from "../../assets/payment/paypal-logo.png"; // Example path

export function PaymentMethodsComponent({ paymentMethods, setPaymentMethods }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMethod, setEditingMethod] = useState(null);
    const [form, setForm] = useState({
        type: "",
        cardNumber: "",
        cardName: "",
        bankName: "",
        accountNumber: "",
        provider: "",
    });

    function openModal(method = null) {
        if (method) {
            setEditingMethod(method);
            setForm({ ...method });
        } else {
            setEditingMethod(null);
            setForm({
                type: "",
                cardNumber: "",
                cardName: "",
                bankName: "",
                accountNumber: "",
                provider: "",
            });
        }
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function savePaymentMethod(e) {
        e.preventDefault();
        if (editingMethod) {
            setPaymentMethods((prev) =>
                prev.map((m) => (m.id === editingMethod.id ? { ...m, ...form } : m))
            );
        } else {
            setPaymentMethods((prev) => [...prev, { ...form, id: Date.now() }]);
        }
        closeModal();
    }

    function remove(id) {
        setPaymentMethods((prev) => prev.filter((m) => m.id !== id));
    }

    function getLogo(provider) {
        switch (provider) {
            case "GCash":
                return gcashLogo; // Replace with actual path to GCash logo
            case "Maya":
                return mayaLogo;  // Replace with actual path to Maya logo
            case "PayPal":
                return paypalLogo; // Replace with actual path to PayPal logo
            default:
                return null;
        }
    }

    function getIcon(type) {
        switch (type) {
            case "Card":
                return <CreditCard size={20} />;
            case "Bank":
                return <Wallet size={20} />;
            case "Online":
                return <Wallet size={20} />;
            default:
                return <CreditCard size={20} />;
        }
    }

    return (
        <div className="relative flex justify-center">
            <div className={`${isModalOpen ? "filter blur-sm pointer-events-none" : ""} w-full max-w-7xl ml-[-40px] mr-12 collection-scale`}>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
                            <Wallet className="w-10 h-10 text-[#7A1CA9]" />
                        </div>
                        <div>
                            <h1 className="text-[26px] font-bold mt-1">Payment Methods</h1>
                            <p className="text-[16px] text-gray-500">
                                Manage your saved payment methods.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paymentMethods.map((method) => (
                            <div key={method.id} className="relative border rounded-xl p-6 flex flex-col gap-3">
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <button
                                        onClick={() => openModal(method)}
                                        className="px-3 py-1 border rounded-lg shadow-sm text-sm flex items-center gap-1"
                                        title="Edit"
                                    >
                                        <Pencil size={16} /> Edit
                                    </button>
                                    <button
                                        onClick={() => remove(method.id)}
                                        className="px-3 py-1 border rounded-lg shadow-sm border-red-500 text-red-600 text-sm flex items-center gap-1"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 font-semibold text-lg">
                                    {getIcon(method.type)}
                                    <span>{method.type}</span>
                                    {method.type === "Card" && (
                                        <div className="flex items-center gap-2">
                                            <span>• </span>
                                            <span className="bg-purple-50 rounded-lg py-0.5 px-2 font-mono text-gray-700 text-lg">
                                                {method.cardNumber?.replace(/\d{4}(?=\d)/g, '$& ')} {/* Adds space every 4 digits */}
                                            </span>
                                        </div>
                                    )}

                                    {method.type === "Bank" && <span>• {method.bankName}</span>}
                                    {method.type === "Online" && (
                                        <div className="flex items-center gap-2"> {/* items-start aligns items to the top */}
                                            <span>• </span>
                                            <img
                                                src={getLogo(method.provider)}
                                                alt={method.provider}
                                                className="w-20 h-20 object-contain " // Ensuring the logo is 20px and has a little margin-top for proper positioning
                                            />
                                        </div>
                                    )}


                                </div>

                                {method.type === "Card" && (
                                    <div className="text-gray-700 text-sm">
                                        Card Name: {method.cardName}
                                    </div>
                                )}
                                {method.type === "Bank" && (
                                    <div className="text-gray-700 text-sm">
                                        Account Number: {method.accountNumber}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => openModal()}
                        className="mt-6 flex items-center gap-2 px-4 py-2 border rounded-lg text-sm"
                    >
                        <Plus size={18} /> Add Payment Method
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white collection-scale mt-20 rounded-2xl p-6 w-full max-w-4xl relative shadow-lg">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-xl font-bold mb-6">{editingMethod ? "Edit Payment Method" : "Add Payment Method"}</h2>
                        <form onSubmit={savePaymentMethod} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Type */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Type</label>
                                <select
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    className="border px-3 py-2 rounded w-full"
                                    required
                                >
                                    <option value="">Select type</option>
                                    <option value="Card">Card</option>
                                    <option value="Bank">Bank Transfer</option>
                                    <option value="Online">Online Payment</option>
                                </select>
                            </div>

                            {/* Card Fields */}
                            {form.type === "Card" && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Card Number</label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            value={form.cardNumber}
                                            onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                                            className="border px-3 py-2 rounded w-full"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Card Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={form.cardName}
                                            onChange={(e) => setForm({ ...form, cardName: e.target.value })}
                                            className="border px-3 py-2 rounded w-full"
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            {/* Bank Fields */}
                            {form.type === "Bank" && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Bank Name</label>
                                        <input
                                            type="text"
                                            placeholder="BPI"
                                            value={form.bankName}
                                            onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                                            className="border px-3 py-2 rounded w-full"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Account Number</label>
                                        <input
                                            type="text"
                                            placeholder="1234567890"
                                            value={form.accountNumber}
                                            onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                                            className="border px-3 py-2 rounded w-full"
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            {/* Online Payment Fields */}
                            {form.type === "Online" && (
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Provider</label>
                                    <input
                                        type="text"
                                        placeholder="GCash / Maya / PayPal"
                                        value={form.provider}
                                        onChange={(e) => setForm({ ...form, provider: e.target.value })}
                                        className="border px-3 py-2 rounded w-full"
                                        required
                                    />
                                </div>
                            )}

                            {/* Save button */}
                            <div className="md:col-span-2 text-right mt-2">
                                <button
                                    type="submit"
                                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
