import React from "react";

export default function Badge({ children, variant = "default" }) {
  const styleMap = {
    default: { backgroundColor: "#e2e8f0", color: "#334155" },
    success: { backgroundColor: "#dcfce7", color: "#166534" },
    danger: { backgroundColor: "#fee2e2", color: "#991b1b" },
  };

  const currentStyle = styleMap[variant] || styleMap.default;

  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "0.75rem",
        fontWeight: "bold",
        display: "inline-block",
        ...currentStyle,
      }}
    >
      {children}
    </span>
  );
}