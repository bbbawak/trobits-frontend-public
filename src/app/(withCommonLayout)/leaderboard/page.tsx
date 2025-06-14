"use client";
import React, { useEffect } from "react";

const LeaderBoard = () => {
  useEffect(() => {
    // Disable scrolling on the body
    document.body.style.overflow = "hidden";
    
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: "100%",
      defaultColumn: "overview",
      screener_type: "crypto_mkt",
      displayCurrency: "USD",
      colorTheme: "dark",
      locale: "en",
      largeChartUrl: "https://trobits.com/leaderboard",
      isTransparent: true,
    });
    
    const widgetContainer = document?.querySelector(
      ".tradingview-widget-container__widget"
    );
    if (widgetContainer) {
      widgetContainer?.appendChild(script);
    }
    // Cleanup function to restore the original overflow style
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0000004d] p-4">
      <div className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};

export default LeaderBoard;


