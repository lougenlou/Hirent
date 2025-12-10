import React, { useContext, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    try {
      const token = searchParams.get("token");
      const userParam = searchParams.get("user");
      const errorParam = searchParams.get("error");
      const from = searchParams.get("from"); // "/ownersignup", "/ownerlogin", or "/"

      if (errorParam) throw new Error(decodeURIComponent(errorParam));
      if (!token || !userParam) throw new Error("Missing token or user data");

      const user = JSON.parse(decodeURIComponent(userParam));

      // ---------- OWNER SIGNUP ----------
      if (from === "/ownersignup") {
        if (user.role !== "owner") {
          // Rule 1: existing renter → block
          navigate("/ownersignup", {
            replace: true,
            state: { error: "This Google account is already registered as a renter. Please use another account." },
          });
          return;
        }

        login(token, user);
        if (!user.ownerSetupCompleted) {
          // Rule 3: new owner → setup
          navigate("/ownersetup", { replace: true, state: { googleData: user } });
        } else {
          // Rule 2: existing owner → dashboard
          navigate("/owner/dashboard", { replace: true });
        }
        return;
      }

      // ---------- OWNER LOGIN ----------
      if (from === "/ownerlogin") {
        if (user.role !== "owner") {
          navigate("/ownerlogin", {
            replace: true,
            state: { error: "This Google account is registered as a renter. Please use another account." },
          });
          return;
        }

        login(token, user);
        navigate("/owner/dashboard", { replace: true });
        return;
      }

      // ---------- RENTER LOGIN / SIGNUP ----------
      if (user.role === "renter") {
        login(token, user);
        navigate("/", { replace: true });
        return;
      }

      // ---------- FALLBACK ----------
      login(token, user);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Google callback error:", err);
      navigate("/ownersignup", {
        replace: true,
        state: { error: err.message },
      });
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center">
        <div className="mb-6">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-16 h-16 mx-auto animate-pulse"
          />
        </div>
        <p className="text-lg font-semibold text-gray-700 mb-4">
          Signing you in with Google...
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Please wait while we complete your authentication
        </p>
      </div>
    </div>
  );
};

export default GoogleCallback;
