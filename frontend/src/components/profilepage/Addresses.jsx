import { MapPin, Pencil, Trash2, Phone, Home, Building2, Plus, X } from "lucide-react";
import React, { useState } from "react";

export function AddressesComponent({ addresses, setAddresses }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [form, setForm] = useState({ label: "", phone: "", details: "" });

  function openModal(addr = null) {
    if (addr) {
        const lines = addr.details.split("\n"); // Split multiline details
        setEditingAddress(addr);
        setForm({
            label: addr.label || "",
            specify: addr.specify || "",
            phone: addr.phone || "",
            street: lines[0] || "",
            unit: lines[1] || "",
            barangay: lines[2]?.split(",")[0] || "",
            city: lines[2]?.split(",")[1]?.trim() || "",
            province: lines[3] || "",
            region: "", // optional
            postalCode: lines[3]?.split(",")[1]?.trim() || "",
            country: "Philippines",
        });
    } else {
        setEditingAddress(null);
        setForm({
            label: "",
            specify: "",
            phone: "",
            street: "",
            unit: "",
            barangay: "",
            city: "",
            province: "",
            region: "",
            postalCode: "",
            country: "Philippines",
        });
    }
    setIsModalOpen(true);
}


    function closeModal() {
        setIsModalOpen(false);
    }

    function saveAddress(e) {
        e.preventDefault();
        if (editingAddress) {
            setAddresses((prev) =>
                prev.map((a) =>
                    a.id === editingAddress.id ? { ...a, ...form } : a
                )
            );
        } else {
            setAddresses((prev) => [
                ...prev,
                { ...form, id: Date.now(), isDefault: false },
            ]);
        }
        closeModal();
    }

    function setDefault(id) {
        setAddresses((prev) =>
            prev.map((a) => ({ ...a, isDefault: a.id === id }))
        );
    }

    function remove(id) {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
    }

    return (
        <div className="relative flex justify-center">
            {/* Adjust spacing: smaller gap on left, extra on right */}
            <div
                className={`${isModalOpen ? "filter blur-sm pointer-events-none" : ""} w-full max-w-7xl ml-[-40px] mr-12 collection-scale`}
            >
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
                            <MapPin className="w-10 h-10 text-[#7A1CA9]" />
                        </div>
                        <div>
                            <h1 className="text-[26px] font-bold mt-1">Addresses</h1>
                            <p className="text-[16px] text-gray-500">
                                Manage your saved delivery or rental locations.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {addresses.map((addr) => {
                            const Icon = addr.label.toLowerCase() === "home" ? Home : Building2;

                            return (
                                <div
                                    key={addr.id}
                                    className={`relative border rounded-xl p-6 flex flex-col gap-3 ${addr.isDefault ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white"}`}
                                >
                                    {/* Top-right badge / set default */}
                                    <div className="absolute top-3 right-3 flex flex-col items-end gap-2 z-20">
                                        {addr.isDefault ? (
                                            <div className="bg-purple-600 text-white text-xs font-semibold rounded-full px-3 py-1">
                                                Default Address
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setDefault(addr.id)}
                                                className="px-3 py-1 border bg-purple-50 border-purple-300 rounded-lg shadow-sm text-sm text-purple-600 hover:bg-purple-50"
                                            >
                                                Set as Default
                                            </button>
                                        )}
                                    </div>

                                    {/* Buttons (Edit, Delete) */}
                                    <div className="absolute bottom-3 right-3 flex gap-2 z-20">
                                        <button
                                            onClick={() => openModal(addr)}
                                            className="px-3 py-1 border rounded-lg shadow-sm text-sm flex items-center gap-1"
                                            title="Edit"
                                        >
                                            <Pencil size={16} /> Edit
                                        </button>
                                        <button
                                            onClick={() => remove(addr.id)}
                                            className="px-3 py-1 border rounded-lg shadow-sm border-red-500 text-red-600 text-sm flex items-center gap-1"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>

                                    {/* Label with dynamic icon */}
                                    <div className="flex items-center gap-2 font-semibold text-lg">
                                        <Icon size={20} />
                                        <span>{addr.label}</span>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Phone size={18} />
                                        <span>{addr.phone || "+63 917 123 4567"}</span>
                                    </div>

                                    {/* Full address multiline with icon on first line */}
                                    <div className="flex items-start gap-2 text-gray-700 leading-relaxed">
                                        <MapPin size={18} className="mt-1" />
                                        <div className="whitespace-pre-line">{addr.details}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => openModal()}
                        className="mt-6 flex items-center gap-2 px-4 py-2 border rounded-lg text-sm"
                    >
                        <Plus size={18} /> Add Address
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
                        <h2 className="text-xl font-bold mb-6">{editingAddress ? "Edit Address" : "Add Address"}</h2>
                        <form onSubmit={saveAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Type / Label */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Type</label>
                                <select
                                    value={form.label}
                                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                                    className="border px-3 py-2 rounded w-full"
                                    required
                                >
                                    <option value="">Select type</option>
                                    <option value="Home">Home</option>
                                    <option value="Work">Work</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Specify Type if Other */}
                            {form.label === "Other" && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">Specify</label>
                                    <input
                                        type="text"
                                        placeholder="Specify type"
                                        value={form.specify || ""}
                                        onChange={(e) => setForm({ ...form, specify: e.target.value })}
                                        className="border px-3 py-2 rounded w-full"
                                        required
                                    />
                                </div>
                            )}

                            {/* Phone */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <div className="flex">
                                    {/* Flag + prefix */}
                                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-gray-100 gap-1">
                                        <img
                                            src="https://flagcdn.com/w20/ph.png"
                                            alt="PH"
                                            className="w-5 h-3 object-cover"
                                        />
                                        <span className="text-gray-700">+63</span>
                                    </div>

                                    {/* Input field */}
                                    <input
                                        type="tel"
                                        placeholder="9123456789"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="border border-l-0 rounded-r-md px-3 py-2 w-full"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Street / Unit / Block */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Street / Unit / Block</label>
                                <input
                                    type="text"
                                    value={form.street}
                                    onChange={(e) => setForm({ ...form, street: e.target.value })}
                                    className="border px-3 py-2 rounded w-full"
                                    required
                                />
                            </div>

                            {/* Barangay */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Barangay</label>
                                <input
                                    type="text"
                                    value={form.barangay}
                                    onChange={(e) => setForm({ ...form, barangay: e.target.value })}
                                    className="border px-3 py-2 rounded w-full"
                                    required
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-sm font-medium mb-1">City / Municipality</label>
                                <input
                                    type="text"
                                    value={form.city}
                                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                                    className="border px-3 py-2 rounded w-full"
                                    required
                                />
                            </div>

                            {/* Province */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Province</label>
                                <input
                                    type="text"
                                    value={form.province}
                                    onChange={(e) => setForm({ ...form, province: e.target.value })}
                                    className="border px-3 py-2 rounded w-full"
                                    required
                                />
                            </div>

                            {/* Region */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Region</label>
                                <input
                                    type="text"
                                    value={form.region}
                                    onChange={(e) => setForm({ ...form, region: e.target.value })}
                                    className="border px-3 py-2 rounded w-full"
                                />
                            </div>

                            {/* Country */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Country</label>
                                <input
                                    type="text"
                                    value={form.country || "Philippines"}
                                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                                    className="border px-3 py-2 rounded w-full"
                                    required
                                />
                            </div>

                            {/* Save button */}
                            <div className="md:col-span-2 text-right mt-2">
                                <button
                                    type="submit"
                                    className="px-6 py-2 border bg-purple-50 border-purple-300 rounded-lg shadow-sm text-[15px] text-purple-600 hover:bg-purple-50"
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
