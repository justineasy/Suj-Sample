import { useState, useEffect } from "react";

const Loader = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 800);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "#080604",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      opacity: fadeOut ? 0 : 1,
      transition: "opacity 0.8s ease",
    }}>
      <img
        src="/suj-logo.png"
        alt="Suj Logo"
        style={{
          width: "120px",
          animation: "loaderFadeIn 1.2s ease forwards",
        }}
      />
      <p style={{
        color: "#ff6a00",
        marginTop: "24px",
        fontSize: "11px",
        letterSpacing: "6px",
        animation: "loaderFadeIn 1.8s ease forwards",
        textTransform: "uppercase",
        fontFamily: "'DM Mono', monospace",
      }}>
        Loading...
      </p>
      <style>{`
        @keyframes loaderFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
