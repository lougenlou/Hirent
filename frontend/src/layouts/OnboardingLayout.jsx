import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import Footer from "../components/Footer";
import hirentLogoPurple from "../assets/hirent-logo-purple.png"; // ✅ make sure path is correct

const OnboardingLayout = () => {
  const location = useLocation();
  const [step, setStep] = useState(1);

  // Detect which onboarding step based on current route
  useEffect(() => {
    if (location.pathname.includes("onboarding1")) setStep(1);
    else if (location.pathname.includes("onboarding2")) setStep(2);
    else if (location.pathname.includes("onboarding3")) setStep(3);
    else if (location.pathname.includes("onboarding4")) setStep(4);
  }, [location]);

  return (
    <div className="onboarding-screen flex flex-col w-full">
      {/* Onboarding section fills full viewport height */}
      <div className="flex flex-col items-center justify-start w-full min-h-screen pt-16 pb-32">
        {/* Logo above progress bar */}
        <div className="mb-10 flex justify-center">
          <img
            src={hirentLogoPurple}
            alt="Hirent Logo"
            className="w-26 md:w-32"
          />
        </div>

        {/* Progress bar */}
        <div className="pt-2 w-full">
          <ProgressBar step={step} />
        </div>

        {/* Onboarding content */}
        <div className="flex flex-col items-center justify-center relative z-10 onboarding-content-wrapper w-full">
          <Outlet />
        </div>
      </div>

      {/* Footer appears below onboarding content */}
      <Footer />
    </div>
  );
};

export default OnboardingLayout;
