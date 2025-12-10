import React, { useEffect, useContext, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const processedRef = useRef(false); // prevent double execution

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const token = searchParams.get("token");
    const userStr = searchParams.get("user");
    const error = searchParams.get("error");
    const from = searchParams.get("from") || ""; // page the user came from

    if (error) {
      console.error("Auth error:", error);
      navigate(from || "/signup", {
        replace: true,
        state: { error: decodeURIComponent(error) },
      });
      return;
    }

    if (!token || !userStr) {
      navigate(from || "/signup", {
        replace: true,
        state: { error: "Missing authentication data" },
      });
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(userStr));

      // Login in context
      login(token, user);

      // Owner flows
      if (user.role === "owner") {
        if (from === "/ownersignup" && !user.ownerSetupCompleted) {
          // New owner → setup
          navigate("/ownersetup", {
            replace: true,
            state: { googleData: user },
          });
        } else {
          // Existing owner → dashboard
          navigate("/owner/dashboard", { replace: true });
        }
        return;
      }

      // Renter flows
      if (user.role === "renter") {
        if (from === "/ownersignup") {
          // Renter trying to signup as owner → show error
          navigate("/ownersignup", {
            replace: true,
            state: { error: "This Google account is registered as a renter." },
          });
        } else {
          // Normal renter login → dashboard/homepage
          navigate(from === "/login" ? "/dashboard" : "/", { replace: true });
        }
        return;
      }

      // fallback
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Failed to parse auth data:", err);
      navigate(from || "/signup", {
        replace: true,
        state: { error: "Authentication failed" },
      });
    }
  }, [searchParams, login, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center">
        <div className="mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
        </div>
        <p className="text-lg text-gray-700 font-semibold">
          Completing authentication...
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Please wait while we redirect you
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
