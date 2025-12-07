import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, Bookmark, Eye, Check, ShoppingBag } from "lucide-react";
import SortDropdown from "../../../components/dropdown/SortDropdown";
import FilterSidebar from "../../../components/filters/FilterSidebar";
import Navbar from "../../../components/layouts/MainNav";
import BannerCarousel from "../../../components/carousels/BannerCarousel";
import emptyListingsVector from "../../../assets/empty-listings.png";
import dayjs from "dayjs";
import mockListings from "../../../data/mockData";
import { Base64 } from "js-base64";
import { getFakeUser, generateFakeToken } from "../../../utils/fakeAuth";
import RentalItemCard from "../../../components/cards/RentalItemCard";

const BrowseRentals = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    priceRange: [100, 1000],
    fromDate: null,
    toDate: null,
    rating: null,
  });
  const [sortOption, setSortOption] = useState("Popular");
  const [loading, setLoading] = useState(true);
  const [collectionItems, setcollectionItems] = useState([]);

  useEffect(() => {
    document.title = "Hirent — Browse";

    return () => {
      document.title = "Hirent";
    };
  }, []);

  useEffect(() => {
    let user = getFakeUser();
    if (!user) {
      const token = generateFakeToken();
      localStorage.setItem("fakeToken", token);
      user = getFakeUser();
    }

    // Load user's collection from token
    setcollectionItems(user.collection || []);
  }, []);
  const [wishlist, setWishlist] = useState([]);
  const [justAdded, setJustAdded] = useState([]);

  const handleAddToCollection = (item) => {
    const existingcollection = collectionItems || [];

    if (!existingcollection.find((i) => i.id === item.id)) {
      const newcollectionItem = {
        ...item,
        days: 1,
        userEnteredCoupon: "",
        couponMessage: "",
        adjustedSubtotal: parseFloat(
          item.price.replace("₱", "").replace("/day", "")
        ),
        addedAt: new Date().toISOString(),
      };

      const newcollection = [...existingcollection, newcollectionItem];
      setcollectionItems(newcollection);

      // Update localStorage
      localStorage.setItem("collectionItems", JSON.stringify(newcollection));

      // Update fake user token
      const user = getFakeUser();
      const updatedUser = { ...user, collection: newcollection };
      const base64Payload = Base64.encode(JSON.stringify(updatedUser));
      const newToken = `fakeHeader.${base64Payload}.fakeSignature`;
      localStorage.setItem("fakeToken", newToken);

      // Show temporary "Added" state
      setJustAdded((prev) => [...prev, item.id]);
      setTimeout(() => {
        setJustAdded((prev) => prev.filter((id) => id !== item.id));
      }, 2000); // 2 seconds
    }
  };

  // wishlist
  const toggleWishlist = (id) => {
    let updatedWishlist = [];

    setWishlist((prev) => {
      updatedWishlist = prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];
      return updatedWishlist;
    });

    const user = getFakeUser();
    const updatedUser = { ...user, wishlist: updatedWishlist };
    const base64Payload = Base64.encode(JSON.stringify(updatedUser));
    const newToken = `fakeHeader.${base64Payload}.fakeSignature`;

    localStorage.setItem("fakeToken", newToken);
  };

  // fetch rental listings
  useEffect(() => {
    setLoading(true);
    try {
      setListings(mockListings);
      setFilteredListings(mockListings);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const user = getFakeUser();
    if (user && user.wishlist) {
      setWishlist(user.wishlist);
    }
  }, []);

  // filtering + sorting
  useEffect(() => {
    let filtered = [...listings];

    // category filter
    if (filters.category) {
      filtered = filtered.filter(
        (item) =>
          item.category.toLowerCase().trim() ===
          filters.category.toLowerCase().trim()
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((item) =>
        item.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Price range filter
    if (filters.priceRange && Array.isArray(filters.priceRange)) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter((item) => {
        const numericPrice = parseFloat(
          String(item.price).replace(/[^0-9.]/g, "")
        );
        return numericPrice >= min && numericPrice <= max;
      });
    }

    // rating filter
    if (filters.rating) {
      const min = filters.rating;
      const max = filters.rating + 0.9;

      filtered = filtered.filter((item) => {
        const rating = Number(item.rating);
        return rating >= min && rating <= max;
      });
    }

    // availability dates filter
    if (
      filters.fromDate &&
      filters.toDate &&
      (!dayjs(filters.fromDate).isSame(dayjs(), "day") ||
        !dayjs(filters.toDate).isSame(dayjs(), "day"))
    ) {
      filtered = filtered.filter((item) => {
        const availableFrom = dayjs(item.availableFrom);
        const availableTo = dayjs(item.availableTo);
        const filterStart = dayjs(filters.fromDate).startOf("day");
        const filterEnd = dayjs(filters.toDate).endOf("day");

        const overlaps =
          (availableFrom.isSame(filterStart, "day") &&
            availableTo.isSame(filterEnd, "day")) ||
          (availableFrom.isBefore(filterEnd, "day") &&
            availableTo.isAfter(filterStart, "day")) ||
          (availableFrom.isSame(filterStart, "day") &&
            availableTo.isAfter(filterStart, "day")) ||
          (availableFrom.isBefore(filterEnd, "day") &&
            availableTo.isSame(filterEnd, "day"));

        return overlaps;
      });
    }

    // sorting logic
    if (sortOption === "Lowest Price") {
      filtered.sort(
        (a, b) =>
          parseFloat(a.price.replace(/[^0-9.]/g, "")) -
          parseFloat(b.price.replace(/[^0-9.]/g, ""))
      );
    } else if (sortOption === "Highest Price") {
      filtered.sort(
        (a, b) =>
          parseFloat(b.price.replace(/[^0-9.]/g, "")) -
          parseFloat(a.price.replace(/[^0-9.]/g, ""))
      );
    } else if (sortOption === "Newest") {
      filtered.sort(
        (a, b) => new Date(b.availableFrom) - new Date(a.availableFrom)
      );
    } else if (sortOption === "Popular") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredListings(filtered);
  }, [filters, listings, searchQuery, sortOption]);

  // apply filters
  const handleApplyFilters = (filterData) => {
    setFilters(filterData);
  };

  return (
    <div className="flex flex-col ml-16 min-h-screen bg-white  text-purple-900  ">
      {/* Navbar */}
      <Navbar onSearch={(query) => setSearchQuery(query)} />

      {/* Banner */}
      <BannerCarousel />

      <div className="mt-36"></div>

      {/* Content */}
      <div className=" flex flex-1 overflow-hidden px-4 py-8 gap-4 bg-[#fbfbfb]  ">
        {/* Filter Sidebar */}
        <FilterSidebar onApplyFilters={handleApplyFilters} />

        {/* Listings Section */}
        <main className="flex-1 overflow-y-auto p-2 md:p-5 lg:p-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[20px] font-semibold text-purple-900 flex items-center gap-1">
              <span className="inline-block w-3 h-6 bg-[#7A1CA9] rounded mr-2"></span>
              {filters.category || "All Rentals"}{" "}
              <span className="text-[#9129c5] font-normal ml-1">
                ({filteredListings.length})
              </span>
            </h2>
            <SortDropdown onSortChange={setSortOption} />
          </div>

          {/* Loading or No Results */}
          {loading ? (
            <div className="text-center text-gray-500 py-20">
              Loading listings...
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              {/* Empty image */}
              <img
                src={emptyListingsVector}
                alt="No Listings"
                className="w-72 h-72 mb-4 object-contain"
              />

              {/* Heading */}
              <h2 className="text-[20px] font-bold text-gray-600 mb-2">
                No Rentals Found
              </h2>

              {/* Description */}
              <p className="text-[14px] text-gray-400 mb-6 text-center max-w-sm">
                Sorry! We couldn't find any rentals matching your search or
                filters. Try adjusting your filters or search query.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-4">
              {filteredListings.map((item) => (
                <RentalItemCard
                  key={item.id}
                  item={item}
                  wishlist={wishlist}
                  justAdded={justAdded}
                  toggleWishlist={toggleWishlist}
                  handleAddToCollection={handleAddToCollection}
                  navigate={navigate}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BrowseRentals;
