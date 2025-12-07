import React, { useMemo, useState, useEffect } from "react";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiUsers,
  FiFileText,
  FiSliders,
  FiDownload,
  FiEye,
  FiTrash2,
  FiCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  // --- Seeded demo data (replace with API calls) ---
  const initialStats = {
    totalRentals: 1248,
    activeRentals: 312,
    owners: 482,
    renters: 1668,
    openReports: 6,
    revenueMtd: 21458,
  };

  const sampleOwners = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@owner.com",
      listings: 12,
      verified: true,
      joined: "2024-02-12",
    },
    {
      id: 2,
      name: "Mark Dela Cruz",
      email: "mark@owner.com",
      listings: 3,
      verified: false,
      joined: "2025-01-05",
    },
    {
      id: 3,
      name: "Anna Reyes",
      email: "anna@owner.com",
      listings: 7,
      verified: true,
      joined: "2023-11-20",
    },
  ];

  const sampleRenters = [
    {
      id: 101,
      name: "Juan Luna",
      email: "juan@renter.com",
      activeRents: 1,
      issues: 0,
      joined: "2022-09-01",
    },
    {
      id: 102,
      name: "Maria Lopez",
      email: "maria@renter.com",
      activeRents: 2,
      issues: 1,
      joined: "2024-06-14",
    },
    {
      id: 103,
      name: "Ken Santos",
      email: "ken@renter.com",
      activeRents: 0,
      issues: 0,
      joined: "2023-04-03",
    },
  ];

  const sampleReports = [
    {
      id: "R-001",
      type: "Damage Report",
      subject: "Broken lens on camera #C201",
      from: "Juan Luna",
      date: "2025-11-28",
      status: "open",
      severity: "medium",
    },
    {
      id: "R-002",
      type: "Policy Violation",
      subject: "Late return repeated",
      from: "Maria Lopez",
      date: "2025-11-30",
      status: "open",
      severity: "low",
    },
    {
      id: "R-003",
      type: "Fraud",
      subject: "Suspicious payment reversal",
      from: "Unknown",
      date: "2025-12-01",
      status: "investigating",
      severity: "high",
    },
    {
      id: "R-004",
      type: "Damage Report",
      subject: "Scratched surface (item #B90)",
      from: "Ken Santos",
      date: "2025-12-03",
      status: "resolved",
      severity: "low",
    },
  ];

  const sampleRentals = [
    {
      id: "T-1001",
      item: "Canon EOS R5",
      owner: "Sarah Johnson",
      renter: "Juan Luna",
      due: "2025-12-10",
      status: "ongoing",
      price: 45,
    },
    {
      id: "T-1002",
      item: "MacBook Pro 16",
      owner: "Anna Reyes",
      renter: "Maria Lopez",
      due: "2025-12-02",
      status: "overdue",
      price: 80,
    },
    {
      id: "T-1003",
      item: "Projector X2",
      owner: "Mark Dela Cruz",
      renter: "Ken Santos",
      due: "2025-12-20",
      status: "booked",
      price: 30,
    },
  ];

  // --- State ---
  const [stats, setStats] = useState(initialStats);
  const [owners, setOwners] = useState(sampleOwners);
  const [renters, setRenters] = useState(sampleRenters);
  const [reports, setReports] = useState(sampleReports);
  const [rentals, setRentals] = useState(sampleRentals);

  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview"); // overview, users, rentals, reports
  const [selectedReport, setSelectedReport] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // --- Derived lists ---
  const filteredOwners = useMemo(() => {
    if (!query) return owners;
    return owners.filter(
      (o) =>
        o.name.toLowerCase().includes(query.toLowerCase()) ||
        o.email.toLowerCase().includes(query.toLowerCase())
    );
  }, [owners, query]);

  const filteredRenters = useMemo(() => {
    if (!query) return renters;
    return renters.filter(
      (r) =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.email.toLowerCase().includes(query.toLowerCase())
    );
  }, [renters, query]);

  const filteredReports = useMemo(() => {
    if (!query) return reports;
    return reports.filter(
      (rep) =>
        rep.subject.toLowerCase().includes(query.toLowerCase()) ||
        rep.from.toLowerCase().includes(query.toLowerCase()) ||
        rep.id.toLowerCase().includes(query.toLowerCase())
    );
  }, [reports, query]);

  const filteredRentals = useMemo(() => {
    if (!query) return rentals;
    return rentals.filter(
      (r) =>
        r.item.toLowerCase().includes(query.toLowerCase()) ||
        r.owner.toLowerCase().includes(query.toLowerCase()) ||
        r.renter.toLowerCase().includes(query.toLowerCase())
    );
  }, [rentals, query]);

  // --- Actions ---
  const resolveReport = (id) => {
    setReports((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "resolved" } : p))
    );
  };

  const deleteReport = (id) => {
    setReports((prev) => prev.filter((p) => p.id !== id));
  };

  const viewDetails = (type, item) => {
    setModalContent({ type, item });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  // Export visible table to CSV (simple)
  const exportCsv = (rows, columns, filename = "export.csv") => {
    const header = columns.map((c) => `"${c.label}"`).join(",");
    const body = rows
      .map((row) =>
        columns
          .map((c) => `"${(row[c.key] ?? "").toString().replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");
    const csv = `${header}\n${body}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // --- Columns for export ---
  const ownerColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "listings", label: "Listings" },
    { key: "verified", label: "Verified" },
    { key: "joined", label: "Joined" },
  ];

  const renterColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "activeRents", label: "Active Rents" },
    { key: "issues", label: "Issues" },
    { key: "joined", label: "Joined" },
  ];

  const reportColumns = [
    { key: "id", label: "Report ID" },
    { key: "type", label: "Type" },
    { key: "subject", label: "Subject" },
    { key: "from", label: "From" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  // --- small utility for status pill ---
  const StatusPill = ({ status }) => {
    const map = {
      ongoing: "bg-yellow-600 text-black",
      booked: "bg-blue-600 text-white",
      overdue: "bg-red-600 text-white",
      resolved: "bg-green-600 text-white",
      open: "bg-amber-500 text-black",
      investigating: "bg-orange-600 text-white",
    };
    const cls = map[status] || "bg-gray-500 text-white";
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
        {status}
      </span>
    );
  };

  // Simulate stats update (demo)
  useEffect(() => {
    const id = setInterval(() => {
      setStats((s) => ({
        ...s,
        revenueMtd: s.revenueMtd + Math.floor(Math.random() * 50),
      }));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // --- Render ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07060a] to-[#0f0d12] text-gray-100 p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-sm">
              <FiUsers className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">User Management</h1>
              <p className="text-sm text-gray-400">
                Control panel · Manage rentals, users, reports & payments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search owners, renters, items, reports..."
                className="w-80 px-4 py-2 rounded-lg bg-[#121217] border border-gray-800 placeholder:text-gray-500 text-sm outline-none"
              />
              <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
            </div>

            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="px-3 py-2 rounded-md bg-[#13131a] border border-gray-800 text-sm flex items-center gap-2"
            >
              <FiSliders /> Filters
            </button>

            <button className="p-3 rounded-md bg-[#13131a] border border-gray-800">
              <FiBell />
            </button>

            <div className="flex items-center gap-3 bg-[#0f0f12] px-3 py-2 rounded-lg border border-gray-800">
              <img
                src="https://i.pravatar.cc/40?img=12"
                alt="admin"
                className="w-8 h-8 rounded-full"
              />
              <div className="text-sm">
                <div className="font-medium">Admin</div>
                <div className="text-xs text-gray-400">super@hirent.app</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left column (main content) */}
          <div className="col-span-8">
            {/* Overview cards */}
            <section className="grid grid-cols-4 gap-4 mb-6">
              <div className="col-span-1 bg-[#0f0f13] p-4 rounded-xl border border-gray-800">
                <div className="text-sm text-gray-400">Total Rentals</div>
                <div className="text-2xl font-bold mt-2">
                  {stats.totalRentals}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Active: {stats.activeRentals}
                </div>
              </div>

              <div className="col-span-1 bg-[#0f0f13] p-4 rounded-xl border border-gray-800">
                <div className="text-sm text-gray-400">Owners</div>
                <div className="text-2xl font-bold mt-2">{stats.owners}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Verified: {owners.filter((o) => o.verified).length}
                </div>
              </div>

              <div className="col-span-1 bg-[#0f0f13] p-4 rounded-xl border border-gray-800">
                <div className="text-sm text-gray-400">Renters</div>
                <div className="text-2xl font-bold mt-2">{stats.renters}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Active: {renters.filter((r) => r.activeRents > 0).length}
                </div>
              </div>

              <div className="col-span-1 bg-[#0f0f13] p-4 rounded-xl border border-gray-800">
                <div className="text-sm text-gray-400">Revenue (MTD)</div>
                <div className="text-2xl font-bold mt-2">
                  ₱{stats.revenueMtd.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Open reports:{" "}
                  {reports.filter((r) => r.status !== "resolved").length}
                </div>
              </div>
            </section>

            {/* Rentals table */}
            <section className="bg-[#0f0f13] p-4 rounded-xl border border-gray-800 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Rentals</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      exportCsv(
                        filteredRentals,
                        [
                          { key: "id", label: "ID" },
                          { key: "item", label: "Item" },
                          { key: "owner", label: "Owner" },
                          { key: "renter", label: "Renter" },
                          { key: "due", label: "Due" },
                          { key: "status", label: "Status" },
                          { key: "price", label: "Price" },
                        ],
                        "rentals.csv"
                      )
                    }
                    className="text-sm px-3 py-2 rounded-md bg-[#121217] border border-gray-800 flex items-center gap-2"
                  >
                    <FiDownload /> Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-gray-400 text-xs uppercase">
                    <tr>
                      <th className="pb-2">ID</th>
                      <th className="pb-2">Item</th>
                      <th className="pb-2">Owner</th>
                      <th className="pb-2">Renter</th>
                      <th className="pb-2">Due</th>
                      <th className="pb-2">Price</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="mt-2">
                    {filteredRentals.map((r) => (
                      <tr key={r.id} className="border-t border-gray-800">
                        <td className="py-3">{r.id}</td>
                        <td className="py-3">{r.item}</td>
                        <td className="py-3">{r.owner}</td>
                        <td className="py-3">{r.renter}</td>
                        <td className="py-3">{r.due}</td>
                        <td className="py-3">₱{r.price}</td>
                        <td className="py-3">
                          <StatusPill status={r.status} />
                        </td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => viewDetails("rental", r)}
                              className="px-2 py-1 rounded-md bg-[#121217] border border-gray-800 text-xs flex items-center gap-2"
                            >
                              <FiEye /> View
                            </button>
                            <button
                              onClick={() =>
                                setRentals((prev) =>
                                  prev.filter((x) => x.id !== r.id)
                                )
                              }
                              className="px-2 py-1 rounded-md bg-[#2a1016] border border-red-700 text-xs flex items-center gap-2"
                            >
                              <FiTrash2 /> Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Reports */}
            <section className="bg-[#0f0f13] p-4 rounded-xl border border-gray-800 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Reports</h3>
                <div className="text-sm text-gray-400">
                  {reports.filter((r) => r.status !== "resolved").length} open
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {filteredReports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-3 rounded-lg bg-[#0b0b0d] border border-gray-800 flex items-start justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="text-xs text-gray-400">{rep.id}</div>
                        <div className="font-medium">{rep.type}</div>
                        <div className="text-xs text-gray-400">
                          · {rep.date}
                        </div>
                      </div>
                      <div className="text-sm mt-1">{rep.subject}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        From: {rep.from} · Severity: {rep.severity}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <StatusPill status={rep.status} />
                      <div className="flex gap-2">
                        <button
                          onClick={() => resolveReport(rep.id)}
                          className="px-3 py-1 rounded-md bg-green-600 text-black text-xs flex items-center gap-2"
                        >
                          <FiCheck /> Resolve
                        </button>
                        <button
                          onClick={() => viewDetails("report", rep)}
                          className="px-3 py-1 rounded-md bg-[#121217] border border-gray-800 text-xs flex items-center gap-2"
                        >
                          <FiEye /> View
                        </button>
                        <button
                          onClick={() => deleteReport(rep.id)}
                          className="px-3 py-1 rounded-md bg-[#2a1016] border border-red-700 text-xs flex items-center gap-2"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column (sidebar) */}
          <aside className="col-span-4 space-y-6">
            {/* Quick actions */}
            <div className="bg-[#0f0f13] p-4 rounded-xl border border-gray-800">
              <h4 className="font-semibold mb-3">Quick Actions</h4>
              <div className="flex flex-col gap-2">
                <button className="w-full text-left px-3 py-2 rounded-md bg-[#121217] border border-gray-800 flex items-center gap-3">
                  <FiUser /> Create Owner
                </button>
                <button className="w-full text-left px-3 py-2 rounded-md bg-[#121217] border border-gray-800 flex items-center gap-3">
                  <FiUsers /> Create Renter
                </button>
                <button className="w-full text-left px-3 py-2 rounded-md bg-[#121217] border border-gray-800 flex items-center gap-3">
                  <FiFileText /> Create Report
                </button>
              </div>
            </div>

            {/* Owners list */}
            <div className="bg-[#0f0f13] p-4 rounded-xl border border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Owners</h4>
                <button
                  onClick={() =>
                    exportCsv(filteredOwners, ownerColumns, "owners.csv")
                  }
                  className="text-xs px-2 py-1 rounded bg-[#121217] border border-gray-800 flex items-center gap-2"
                >
                  <FiDownload /> Export
                </button>
              </div>

              <div className="space-y-3">
                {filteredOwners.map((o) => (
                  <div key={o.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://i.pravatar.cc/40?u=${o.email}`}
                        className="w-9 h-9 rounded-full"
                        alt=""
                      />
                      <div>
                        <div className="font-medium">{o.name}</div>
                        <div className="text-xs text-gray-400">
                          {o.listings} listings
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {o.verified ? (
                        <span className="text-xs text-green-400">Verified</span>
                      ) : (
                        <span className="text-xs text-amber-400">
                          Unverified
                        </span>
                      )}
                      <button
                        onClick={() => viewDetails("owner", o)}
                        className="px-2 py-1 rounded bg-[#121217] border border-gray-800 text-xs"
                      >
                        <FiEye />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Renters list */}
            <div className="bg-[#0f0f13] p-4 rounded-xl border border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Renters</h4>
                <button
                  onClick={() =>
                    exportCsv(filteredRenters, renterColumns, "renters.csv")
                  }
                  className="text-xs px-2 py-1 rounded bg-[#121217] border border-gray-800 flex items-center gap-2"
                >
                  <FiDownload /> Export
                </button>
              </div>

              <div className="space-y-3">
                {filteredRenters.map((r) => (
                  <div key={r.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://i.pravatar.cc/40?u=${r.email}`}
                        className="w-9 h-9 rounded-full"
                        alt=""
                      />
                      <div>
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-gray-400">
                          Active: {r.activeRents}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {r.issues > 0 ? (
                        <span className="text-xs text-amber-400">
                          {r.issues} issues
                        </span>
                      ) : (
                        <span className="text-xs text-green-400">Clean</span>
                      )}
                      <button
                        onClick={() => viewDetails("renter", r)}
                        className="px-2 py-1 rounded bg-[#121217] border border-gray-800 text-xs"
                      >
                        <FiEye />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Small site settings */}
            <div className="bg-[#0f0f13] p-4 rounded-xl border border-gray-800">
              <h4 className="font-semibold">Site Settings</h4>
              <div className="mt-3 flex flex-col gap-2 text-sm text-gray-400">
                <div className="flex items-center justify-between">
                  <div>Maintenance mode</div>
                  <div className="text-xs text-gray-300">Off</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Auto-verify owners</div>
                  <div className="text-xs text-gray-300">On</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Default refund window</div>
                  <div className="text-xs text-gray-300">7 days</div>
                </div>
                <Link to="/admin/settings">
                  <button className="mt-3 px-3 py-2 rounded bg-[#121217] border border-gray-800 text-sm">
                    Open Settings
                  </button>
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Modal */}
        {showModal && modalContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#0c0c0f] w-[900px] max-w-full rounded-xl p-6 border border-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {modalContent.type.toUpperCase()} DETAILS
                  </h3>
                  <div className="text-sm text-gray-400">
                    {modalContent.item.id}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={closeModal}
                    className="px-3 py-1 rounded bg-[#121217]"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  {modalContent.type === "rental" && (
                    <>
                      <div>
                        <strong>Item:</strong> {modalContent.item.item}
                      </div>
                      <div>
                        <strong>Owner:</strong> {modalContent.item.owner}
                      </div>
                      <div>
                        <strong>Renter:</strong> {modalContent.item.renter}
                      </div>
                      <div>
                        <strong>Due:</strong> {modalContent.item.due}
                      </div>
                      <div>
                        <strong>Price:</strong> ₱{modalContent.item.price}
                      </div>
                      <div>
                        <strong>Status:</strong>{" "}
                        <StatusPill status={modalContent.item.status} />
                      </div>
                    </>
                  )}

                  {modalContent.type === "report" && (
                    <>
                      <div>
                        <strong>Type:</strong> {modalContent.item.type}
                      </div>
                      <div>
                        <strong>Subject:</strong> {modalContent.item.subject}
                      </div>
                      <div>
                        <strong>From:</strong> {modalContent.item.from}
                      </div>
                      <div>
                        <strong>Date:</strong> {modalContent.item.date}
                      </div>
                      <div>
                        <strong>Status:</strong>{" "}
                        <StatusPill status={modalContent.item.status} />
                      </div>
                      <div className="text-sm text-gray-400">
                        Detailed description and evidence go here. You can
                        attach photos, timeline, and admin notes.
                      </div>
                    </>
                  )}

                  {modalContent.type === "owner" && (
                    <>
                      <div>
                        <strong>Name:</strong> {modalContent.item.name}
                      </div>
                      <div>
                        <strong>Email:</strong> {modalContent.item.email}
                      </div>
                      <div>
                        <strong>Listings:</strong> {modalContent.item.listings}
                      </div>
                      <div>
                        <strong>Verified:</strong>{" "}
                        {modalContent.item.verified ? "Yes" : "No"}
                      </div>
                      <div>
                        <strong>Joined:</strong> {modalContent.item.joined}
                      </div>
                    </>
                  )}

                  {modalContent.type === "renter" && (
                    <>
                      <div>
                        <strong>Name:</strong> {modalContent.item.name}
                      </div>
                      <div>
                        <strong>Email:</strong> {modalContent.item.email}
                      </div>
                      <div>
                        <strong>Active rents:</strong>{" "}
                        {modalContent.item.activeRents}
                      </div>
                      <div>
                        <strong>Issues:</strong> {modalContent.item.issues}
                      </div>
                      <div>
                        <strong>Joined:</strong> {modalContent.item.joined}
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="bg-[#0b0b0d] p-3 rounded border border-gray-800">
                    <div className="text-sm text-gray-400">Admin Notes</div>
                    <textarea
                      placeholder="Write internal notes..."
                      className="w-full mt-2 bg-transparent outline-none text-sm h-28 resize-none border border-gray-800 p-2 rounded"
                    />
                    <div className="flex items-center gap-2 mt-3">
                      <button className="px-3 py-2 rounded bg-green-600 text-black">
                        <FiCheck /> Save
                      </button>
                      <button className="px-3 py-2 rounded bg-[#121217]">
                        Add Evidence
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#0b0b0d] p-3 rounded border border-gray-800">
                    <div className="text-sm text-gray-400">Activity Log</div>
                    <ul className="text-xs mt-2 space-y-2 text-gray-300">
                      <li>2025-12-04: Report created by user</li>
                      <li>2025-12-05: Admin viewed and assigned</li>
                      <li>2025-12-06: Evidence uploaded</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
