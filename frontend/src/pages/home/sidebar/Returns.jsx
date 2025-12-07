// src/pages/RenterReturns.jsx
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import {
  Clock,
  Check,
  CheckCircle,
  CircleCheck,
  AlertTriangle,
  DollarSign,
  Upload,
  X,
  Eye,
  Trash2,
  RefreshCw,
  AlertCircle,
  PackageX,
  Calendar,
  Star,
  Info,
  Edit3,
  Hourglass,
  PackageOpen,
  Search,
  TriangleAlert,
} from "lucide-react";

/* ----------------------------
   Status Map (Renter-focused)
   ---------------------------- */
const statusMap = {
  "pending-return": {
    label: "Pending",
    color: "text-orange-600",
    pill: "bg-orange-100/90",
    icon: Clock,
    bgGradient: "from-orange-50 to-orange-100",
  },
  "proof-submitted": {
    label: "Awaiting",
    color: "text-violet-600",
    pill: "bg-violet-100/90",
    icon: HourglassIconLike,
    bgGradient: "from-violet-50 to-violet-100",
  },
  overdue: {
    label: "Overdue",
    color: "text-red-600",
    pill: "bg-red-100/90",
    icon: AlertTriangle,
    bgGradient: "from-red-50 to-red-100",
  },
  approved: {
    label: "Approved",
    color: "text-emerald-600",
    pill: "bg-emerald-100/90",
    icon: CheckCircle,
    bgGradient: "from-emerald-50 to-emerald-100",
  },
  "deposit-released": {
    label: "Completed",
    color: "text-emerald-700",
    pill: "bg-emerald-100/95",
    icon: Check,
    bgGradient: "from-emerald-50 to-emerald-100",
  },
  "issue-found": {
    label: "Issue Found",
    color: "text-amber-700",
    pill: "bg-amber-100/90",
    icon: AlertCircle,
    bgGradient: "from-amber-50 to-amber-100",
  },
};

/* Since lucide doesn't have an Hourglass icon in the imports above, create a simple alias using Info or Clock */
function HourglassIconLike(props) {
  return <Info {...props} />;
}

/* ----------------------------
   Utility Helpers
   ---------------------------- */
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const daysDiff = (dateString) => {
  if (!dateString) return 0;
  const today = new Date();
  const d = new Date(dateString);
  // difference in days (positive if due date in future)
  const diff = Math.ceil(
    (d.setHours(0, 0, 0) - new Date().setHours(0, 0, 0)) / (1000 * 60 * 60 * 24)
  );
  return diff;
};

/* ----------------------------
   Modal base component
   ---------------------------- */
const Modal = ({ isOpen, onClose, title, size = "md", children }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      const prev = document.activeElement;
      modalRef.current?.focus();
      document.body.style.overflow = "hidden";
      return () => {
        prev?.focus();
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);
  if (!isOpen) return null;
  const sizeClass =
    size === "lg" ? "max-w-4xl" : size === "sm" ? "max-w-sm" : "max-w-2xl";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${sizeClass} bg-white/95 rounded-3xl p-6 shadow-2xl border border-white/20 animate-modalSlideIn`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        >
          <X size={18} />
        </button>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
};

/* ----------------------------
   ImagePreview (for uploaded or URL images)
   ---------------------------- */
const ImagePreview = ({ images = [], onRemove, showRemove = true }) => {
  if (!images || images.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3 mt-3">
      {images.map((img, idx) => {
        const src = typeof img === "string" ? img : URL.createObjectURL(img);
        return (
          <div key={idx} className="relative group">
            <img
              src={src}
              alt={`preview-${idx}`}
              className="w-28 h-20 rounded-xl object-cover border shadow-sm"
            />
            {showRemove && onRemove && (
              <button
                onClick={() => onRemove(idx)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ----------------------------
   FileUpload component: drag-drop + click to upload
   ---------------------------- */
const FileUpload = ({
  files,
  setFiles,
  accept = "image/*",
  multiple = true,
}) => {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDrag(false);
      const dropped = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/")
      );
      setFiles((prev) => [...prev, ...dropped]);
    },
    [setFiles]
  );

  const onChange = (e) => {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selected]);
    e.target.value = "";
  };

  const removeAt = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        onDrop={onDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onClick={() => inputRef.current?.click()}
        className={`p-5 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
          drag
            ? "border-purple-400 bg-purple-50"
            : "border-gray-200 bg-gray-50/60 hover:border-purple-300"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white rounded-full shadow-sm">
            <Upload size={20} />
          </div>
          <div>
            <p className=" text-[13px] font-medium text-gray-700">
              Drop images here or click to upload
            </p>
            <p className="text-xs text-gray-500">PNG, JPG — up to 10MB each</p>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={onChange}
        />
      </div>
      <ImagePreview images={files} onRemove={removeAt} />
    </div>
  );
};

/* ----------------------------
   Notification component
   ---------------------------- */
const Notification = ({ note, onClose }) => {
  if (!note) return null;
  const bg =
    note.type === "success"
      ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
      : note.type === "error"
      ? "bg-red-50 text-red-700 border border-red-300"
      : "bg-amber-50 text-amber-700 border border-amber-300";
  return (
    <div
      className={`fixed top-24 right-10 z-50 px-5 py-3 rounded-xl  text-[13px] shadow-2xl ${bg} animate-slideIn`}
    >
      <div className="flex items-center gap-3">
        {note.type === "success" && <CheckCircle size={18} />}
        {note.type === "error" && <AlertCircle size={18} />}
        {note.type === "warning" && <AlertTriangle size={18} />}
        <div className="font-medium">{note.message}</div>
        <button onClick={onClose} className="ml-2 opacity-80 hover:opacity-100">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

/* ----------------------------
   StatsCards component
   ---------------------------- */
const StatsCards = ({ items }) => {
  const stats = [
    {
      label: "Items to Return",
      value: items.filter((i) => i.status === "pending-return").length,
      icon: Clock,
      bg: "from-orange-400 to-orange-500",
    },
    {
      label: "Awaiting Review",
      value: items.filter((i) => i.status === "proof-submitted").length,
      icon: Hourglass,
      bg: "from-violet-400 to-violet-500",
    },
    {
      label: "Overdue Items",
      value: items.filter((i) => i.status === "overdue").length,
      icon: AlertTriangle,
      bg: "from-red-400 to-red-500",
    },
    {
      label: "Completed Returns",
      value: items.filter((i) => i.status === "deposit-released").length,
      icon: CheckCircle,
      bg: "from-emerald-500 to-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="p-5 rounded-2xl bg-white/90 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className=" text-[13px] text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
          </div>
          <div
            className={`p-3 rounded-xl text-white bg-gradient-to-tr ${s.bg}`}
          >
            <div className="p-2 bg-white/10 rounded-xl flex items-center justify-center">
              <s.icon size={22} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
/* ----------------------------
   Filters component
   ---------------------------- */
const FiltersBar = ({ filters, setFilters, counts, search, setSearch }) => {
  const categories = [
    { label: "All", key: "All", count: counts.all },
    { label: "Pending Return", key: "pending-return", count: counts.pending },
    {
      label: "Proof Submitted",
      key: "proof-submitted",
      count: counts.submitted,
    },
    { label: "Overdue", key: "overdue", count: counts.overdue },
    { label: "Approved", key: "approved", count: counts.approved },
    {
      label: "Completed",
      key: "deposit-released",
      count: counts.released,
    },
    { label: "Issues", key: "issue-found", count: counts.issue },
  ];
  return (
    <div className="mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilters(c.key)}
              className={`px-2.5 py-1.5 rounded-xl text-[14px] font-medium ${
                filters === c.key
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                  : "bg-white/70 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {c.label}
              <span
                className={`ml-2 inline-flex items-center justify-center px-2 py-1 text-xs rounded-full ${
                  filters === c.key
                    ? "bg-white/20"
                    : c.key === "issue-found"
                    ? "bg-yellow-100 text-yellow-800"
                    : c.key === "deposit-released"
                    ? "bg-emerald-100 text-emerald-700"
                    : c.key === "approved"
                    ? "bg-purple-100 text-purple-700"
                    : c.key === "overdue"
                    ? "bg-red-100 text-red-700"
                    : c.key === "proof-submitted"
                    ? "bg-blue-100 text-blue-700"
                    : c.key === "pending-return"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {c.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center bg-white/80 border border-gray-200 rounded-lg px-3 py-2 w-full max-w-md">
          <span className="text-gray-600 mr-2">
            <Search size={20} />
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items or owners..."
            className="w-full bg-transparent outline-none text-[14px] text-gray-700"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="p-1 ml-2 text-gray-400 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* Minimal SearchIcon substitute */
function SearchIcon(props) {
  return <Clock {...props} />;
}

/* ----------------------------
   ItemCard component (renter view)
   ---------------------------- */
const ItemCard = ({ item, onAction }) => {
  const status = statusMap[item.status] || statusMap["pending-return"];
  const StatusIcon = status.icon;

  const daysLeft = daysDiff(item.dueDate);
  const overdueDays = item.status === "overdue" ? Math.abs(daysLeft) : 0;

  return (
    <div
      className={`rounded-2xl p-6 shadow-sm bg-white/80  ${
        item.status === "overdue"
          ? "border border-red-300"
          : item.status === "issue-found"
          ? "border border-yellow-300"
          : "border-gray-200"
      }`}
    >
      {/* Image on top */}
      <div className="w-full h-48 rounded-xl bg-gray-100 overflow-hidden mb-4 flex items-center justify-center">
        <img
          src={item.img}
          alt={item.name}
          className="object-cover w-full h-full"
          onError={(e) => {
            e.target.src = "/assets/placeholder.png";
          }}
        />
      </div>

      {/* Details below */}
      <div className="flex flex-col">
        {/* Name and Status */}
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-bold text-gray-900 truncate">{item.name}</h4>
          <div
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.pill} ${status.color}`}
          >
            <StatusIcon size={12} />
            <span>{status.label}</span>
          </div>
        </div>

        {/* Info */}
        <div className=" text-[13px] text-gray-600 space-y-2">
          {/* Info */}
          <div className="text-[13px] text-gray-600 space-y-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="truncate">Owner: {item.owner}</span>
            </div>

            {/* Due date row */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-gray-500" />
                <span>Due</span>
              </div>
              <div className="text-right">
                <span
                  className={`${
                    item.status === "overdue"
                      ? "text-red-600 font-medium"
                      : item.status === "pending-return"
                      ? "text-amber-600 font-medium"
                      : ""
                  }`}
                >
                  {formatDate(item.dueDate)}
                </span>
                {item.status === "overdue" && (
                  <span className="text-red-600 font-medium ml-1">
                    ({overdueDays} days overdue)
                  </span>
                )}
                {item.status === "pending-return" && daysLeft >= 0 && (
                  <span className="text-amber-600 ml-1 font-medium">
                    ({daysLeft} days left)
                  </span>
                )}
              </div>
            </div>

            {/* Deposit row */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5">
                <DollarSign size={14} className="text-gray-500" />
                <span>Deposit</span>
              </div>
              <div className="text-right text-gray-600 font-bold">
                ₱{item.deposit.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Issue */}
          {item.status === "issue-found" && item.issue && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[13px]">
              <div className="font-medium text-amber-700">
                Owner reported issue
              </div>
              <div className="text-amber-600 mt-1 text-[13px]">
                {item.issue.note}
              </div>
              {item.issue.deduction && (
                <div className="mt-1 text-[13px] text-red-700 font-medium">
                  Deduction: ₱{item.issue.deduction}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-3 ">
          {item.status === "pending-return" && (
            <>
              {/* Top buttons row */}
              <div className="flex gap-2 w-full">
                {/* Submit Return Proof - grows to fill remaining space */}
                <button
                  onClick={() => onAction(item, "open-return")}
                  className="flex-1 px-4 py-2 font-medium rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white text-[13px] shadow-sm"
                >
                  Submit Return Proof
                </button>

                {/* Report Icon - fixed size */}
                <button
                  onClick={() => onAction(item, "report")}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M12 2c-.55 0-1.07.27-1.39.72L2.16 19.28c-.5.76.12 1.72.97 1.72h18.74c.85 0 1.47-.96.97-1.72L13.39 2.72A1.5 1.5 0 0012 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z" />
                  </svg>
                </button>
              </div>

              {/* Full width return details below */}
              <div className="px-4 py-5 rounded-xl bg-purple-50 text-purple-700 text-[13px] w-full flex items-center gap-2">
                <Info size={18} className="text-purple-700" />
                <span>To be returned to owner</span>
              </div>
            </>
          )}

          {item.status === "proof-submitted" && (
            <>
              {/* Waiting for owner approval info box */}
              <div className="p-4 rounded-xl bg-blue-50 text-blue-700 text-[13px] w-full flex items-center gap-2">
                <Info size={18} className="text-blue-700" />
                <span>Waiting for owner approval</span>
              </div>

              <div className="flex gap-2 w-full">
                {/* View Submitted Proof button */}
                <button
                  onClick={() => onAction(item, "view-proof")}
                  className="flex-1 px-3 py-2 rounded-xl bg-gray-100 text-[13px] flex items-center justify-center gap-2"
                >
                  <Eye size={14} /> View Submitted Proof
                </button>

                {/* Edit Proof icon button */}
                <button
                  onClick={() => onAction(item, "edit-proof")}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-purple-100 text-purple-700"
                >
                  <Edit3 size={16} />
                </button>
              </div>
            </>
          )}

          {item.status === "overdue" && (
            <>
              <div className="p-4 rounded-xl bg-red-50 text-red-700 text-[13px] w-full flex items-center gap-2">
                <TriangleAlert size={18} className="text-red-700" />
                <span>Return immediately to avoid fees</span>
              </div>
              <button
                onClick={() => onAction(item, "open-return")}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white text-[13px] shadow-sm"
              >
                Submit Return Proof Now
              </button>
            </>
          )}

          {item.status === "approved" && (
            <>
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-700 text-[13px] w-full flex items-center gap-2">
                <CircleCheck size={18} className="text-emerald-700" />
                <span>Return approved — awaiting deposit release</span>
              </div>
              <button
                onClick={() => onAction(item, "view-proof")}
                className="flex-1 px-3 py-2.5 rounded-xl bg-gray-100 text-[13px] flex items-center justify-center gap-2"
              >
                <Eye size={14} /> View Submitted Proof
              </button>
            </>
          )}

          {item.status === "deposit-released" && (
            <>
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-700 text-[13px] w-full flex items-center gap-2">
                <CircleCheck size={18} className="text-emerald-700" />
                <span>Deposit successfully released</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 text-[13px]">
                Released on {formatDate(item.releasedAt)}
              </div>
            </>
          )}

          {item.status === "issue-found" && (
            <div className="flex gap-3 w-full">
              <button
                onClick={() => onAction(item, "dispute")}
                className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-[13px]"
              >
                Dispute
              </button>
              <button
                onClick={() => onAction(item, "acknowledge")}
                className="flex-1 px-4 py-2 rounded-xl bg-white border border-gray-200 text-[13px]"
              >
                Acknowledge
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------
   Main Page Component
   ---------------------------- */
export default function RenterReturns() {
  /* Seeded sample data - adjust image paths to your app structure */
  const initialItems = [
    {
      id: 1,
      name: "Canon EOS R5 Camera",
      img: "/assets/items/camera.png",
      owner: "Sarah Johnson",
      dueDate: "2025-12-10",
      status: "pending-return",
      deposit: 500,
      proof: [],
    },
    {
      id: 2,
      name: "Studio Lighting Kit",
      img: "/assets/items/studio_lighting.png",
      owner: "Mike Chen",
      dueDate: "2025-12-05",
      status: "proof-submitted",
      deposit: 300,
      proof: ["/assets/items/sample1.png", "/assets/items/sample2.png"],
      submittedAt: "2025-11-30",
    },
    {
      id: 3,
      name: "Mountain Bike Pro",
      img: "/assets/items/mountain_bike.png",
      owner: "Alex Rivera",
      dueDate: "2025-12-02",
      status: "overdue",
      deposit: 200,
      proof: [],
    },
    {
      id: 4,
      name: "DJI Mavic Air Drone",
      img: "/assets/items/drone.png",
      owner: "Lisa Park",
      dueDate: "2025-11-28",
      status: "issue-found",
      deposit: 800,
      proof: [],
      issue: {
        note: "Scratched propeller guard - ₱150 repair cost",
        deduction: 150,
      },
    },
    {
      id: 5,
      name: "Audio Recording Kit",
      img: "/assets/items/audio_kit.png",
      owner: "David Kim",
      dueDate: "2025-11-25",
      status: "deposit-released",
      deposit: 400,
      proof: ["/assets/returnitems/audio1.png"],
      releasedAt: "2025-12-01",
    },
    {
      id: 6,
      name: "Gaming Console Bundle",
      img: "/assets/items/console.png",
      owner: "Emma Wilson",
      dueDate: "2025-12-15",
      status: "pending-return",
      deposit: 350,
      proof: [],
    },
  ];

  const [items, setItems] = useState(initialItems);
  const [filters, setFilters] = useState("All");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);

  const [selected, setSelected] = useState(null);
  const [modalType, setModalType] = useState(null); // "return", "preview", "report"

  const [uploadFiles, setUploadFiles] = useState([]);
  const [damageNote, setDamageNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const counts = useMemo(() => {
    return {
      all: items.length,
      pending: items.filter((i) => i.status === "pending-return").length,
      submitted: items.filter((i) => i.status === "proof-submitted").length,
      overdue: items.filter((i) => i.status === "overdue").length,
      approved: items.filter((i) => i.status === "approved").length,
      released: items.filter((i) => i.status === "deposit-released").length,
      issue: items.filter((i) => i.status === "issue-found").length,
    };
  }, [items]);

  useEffect(() => {
    document.title = "Hirent — Returns";

    return () => {
      document.title = "Hirent";
    };
  }, []);

  useEffect(() => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.status === "pending-return" && daysDiff(it.dueDate) < 0) {
          return { ...it, status: "overdue" };
        }
        return it;
      })
    );
  }, []);

  const filtered = useMemo(() => {
    return items.filter((it) => {
      const matchesSearch =
        it.name.toLowerCase().includes(search.toLowerCase()) ||
        it.owner.toLowerCase().includes(search.toLowerCase());
      if (!matchesSearch) return false;
      if (filters === "All") return true;
      return it.status === filters;
    });
  }, [items, search, filters]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const openModalFor = (item, type) => {
    setSelected(item);
    setModalType(type);
    if (type === "return") {
      setUploadFiles(item.proof ? [...item.proof] : []);
      setRating(item.rating || 0);
      setReview(item.review || "");
    }
  };

  const closeModal = () => {
    setSelected(null);
    setModalType(null);
    setUploadFiles([]);
    setDamageNote("");
    setIsLoading(false);
    setRating(0);
    setReview("");
  };

  // ---------------- Submit Return Modal ----------------
  const SubmitReturnModal = () => {
    const [hoverRating, setHoverRating] = useState(0);
    const [localRating, setLocalRating] = useState(rating);
    const [localReview, setLocalReview] = useState(review);

    const submitReturnProof = async () => {
      if (!uploadFiles || uploadFiles.length === 0) {
        showNotification(
          "Please upload at least 1 photo of the returned item.",
          "error"
        );
        return;
      }
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 900));
      const proofUrls = uploadFiles.map((f) =>
        typeof f === "string" ? f : URL.createObjectURL(f)
      );

      setItems((prev) =>
        prev.map((it) =>
          it.id === selected.id
            ? {
                ...it,
                status: "proof-submitted",
                proof: proofUrls,
                submittedAt: new Date().toISOString(),
                rating: localRating,
                review: localReview,
              }
            : it
        )
      );

      showNotification("Return proof submitted. Waiting for owner review.");
      closeModal();
    };

    return (
      <Modal
        isOpen={modalType === "return" && !!selected}
        onClose={closeModal}
        title={`Submit Return Proof — ${selected?.name}`}
        size="lg"
      >
        <p className="text-[13px] text-gray-600 mb-4">
          Upload clear photos showing: full item, close-up of any identifiers
          (serial number), and packaging/hand-over photo.
        </p>

        <FileUpload files={uploadFiles} setFiles={setUploadFiles} />

        <div className="mt-6 space-y-3">
          <h5 className="text-sm font-medium text-gray-800">
            Rate & Review this item
          </h5>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setLocalRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-colors"
                >
                  <Star
                    size={24}
                    className={`${
                      (hoverRating || localRating) >= star
                        ? "text-yellow-400"
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {localRating > 0 ? `${localRating} / 5` : "No rating"}
            </span>
          </div>

          <textarea
            value={localReview}
            onChange={(e) => setLocalReview(e.target.value)}
            placeholder="Write your review here..."
            className="w-full p-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none h-24"
          />
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-sm rounded-xl bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={submitReturnProof}
            className={`px-5 text-sm py-2 rounded-xl text-white ${
              isLoading
                ? "bg-purple-300"
                : "bg-gradient-to-r from-purple-600 to-purple-700"
            }`}
          >
            {isLoading && <RefreshCw className="animate-spin inline mr-2" />}
            Submit Proof
          </button>
        </div>
      </Modal>
    );
  };

  // ---------------- Preview Modal ----------------
  const PreviewModal = () => (
    <Modal
      isOpen={modalType === "preview" && !!selected}
      onClose={closeModal}
      title={`Return Proof — ${selected?.name}`}
      size="lg"
    >
      <p className=" text-[13px] text-gray-600 mb-4">
        Photos you've submitted for this return:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {selected?.proof?.map((p, i) => (
          <img
            key={i}
            src={p}
            alt={`proof-${i}`}
            className="w-full h-48 object-cover rounded-xl shadow-md"
          />
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Your Feedback
        </h4>
        {selected?.rating ? (
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={20}
                className={`${
                  s <= selected.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-gray-600">
              {selected.rating} / 5
            </span>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No rating submitted.</p>
        )}

        {selected?.review ? (
          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-xl border mt-2">
            {selected.review}
          </p>
        ) : (
          <p className="text-gray-500 text-sm">No written review provided.</p>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => openModalFor(selected, "return")}
          className="px-4 py-2 text-sm rounded-xl text-white shadow-sm bg-gradient-to-r from-purple-600 to-purple-700 border"
        >
          Edit / Re-upload
        </button>
        <button
          onClick={closeModal}
          className="px-4 py-2 text-sm rounded-xl bg-gray-200"
        >
          Close
        </button>
      </div>
    </Modal>
  );

  // ---------------- Report Modal ----------------
  const ReportModal = () => (
    <Modal
      isOpen={modalType === "report" && !!selected}
      onClose={closeModal}
      title={`Report Problem — ${selected?.name}`}
    >
      <p className=" text-[13px] text-gray-600 mb-3">
        Describe the problem in detail. Optionally attach photos.
      </p>
      <textarea
        value={damageNote}
        onChange={(e) => setDamageNote(e.target.value)}
        placeholder="What happened?"
        className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 h-28 resize-none"
      />
      <div className="mt-4">
        <FileUpload files={uploadFiles} setFiles={setUploadFiles} />
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={closeModal}
          className="px-4 py-2 rounded-xl bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            if (!damageNote.trim()) {
              showNotification(
                "Please describe the damage before submitting.",
                "error"
              );
              return;
            }
            setIsLoading(true);
            await new Promise((r) => setTimeout(r, 900));
            setItems((prev) =>
              prev.map((it) =>
                it.id === selected.id
                  ? {
                      ...it,
                      status: "issue-found",
                      issue: { note: damageNote },
                    }
                  : it
              )
            );
            showNotification("Damage report submitted. Owner will review.");
            closeModal();
          }}
          className={`px-4 py-2 rounded-xl text-white ${
            isLoading
              ? "bg-amber-300"
              : "bg-gradient-to-r from-amber-500 to-amber-600"
          }`}
        >
          Submit Report
        </button>
      </div>
    </Modal>
  );

  const disputeIssue = (item) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === item.id ? { ...it, status: "pending-dispute" } : it
      )
    );
    showNotification("Dispute created. Owner will be notified.", "success");
  };

  const acknowledgeIssue = (item) => {
    setItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, status: "approved" } : it))
    );
    showNotification(
      "Issue acknowledged. Owner will process deposit claim.",
      "warning"
    );
  };

  return (
    <div className="min-h-screen pl-24 pr-8 bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <Notification note={notification} onClose={() => setNotification(null)} />

      <div className="flex items-start gap-5 mb-4 mt-2">
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
          <PackageOpen className="w-10 h-10 text-[#a12fda]" />
        </div>
        <div className="flex items-start gap-4">
          <div>
            <h1 className="text-2xl mt-0.5 font-bold text-purple-900">
              My Returns
            </h1>
            <p className="text-gray-600 text-[15px] mt-1">
              Submit return proof, manage your rental items, and track deposit
              release status.
            </p>
          </div>
        </div>
      </div>

      <main>
        <StatsCards items={items} />
        <FiltersBar
          filters={filters}
          setFilters={setFilters}
          counts={counts}
          search={search}
          setSearch={setSearch}
        />

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto inline-flex items-center text-purple-700 justify-center w-20 h-20 bg-purple-100 rounded-full mb-4">
              <PackageX size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">
              No items found
            </h3>
            <p className="text-gray-500 mt-1">
              {search
                ? "Try different search terms."
                : "No items for the selected filter."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {filtered.map((it) => (
              <ItemCard
                key={it.id}
                item={it}
                onAction={(item, action) => {
                  if (action === "open-return") openModalFor(item, "return");
                  if (action === "report") openModalFor(item, "report");
                  if (action === "view-proof") openModalFor(item, "preview");
                  if (action === "edit-proof") openModalFor(item, "return");
                  if (action === "dispute") disputeIssue(item);
                  if (action === "acknowledge") acknowledgeIssue(item);
                  if (action === "message")
                    showNotification(
                      "Messaging owner (UI placeholder).",
                      "success"
                    );
                  if (action === "instructions")
                    showNotification(
                      "Return instructions (UI placeholder).",
                      "success"
                    );
                }}
              />
            ))}
          </div>
        )}
      </main>

      {modalType === "return" && <SubmitReturnModal />}
      {modalType === "preview" && <PreviewModal />}
      {modalType === "report" && <ReportModal />}
    </div>
  );
}
