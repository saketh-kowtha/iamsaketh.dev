import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useSound } from "../hooks/useSound";

export default function ContextMenu() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { playSound } = useSound();

  const handleContextMenu = useCallback(
    (e) => {
      e.preventDefault();
      playSound("hover", 0.15);

      const x = e.clientX;
      const y = e.clientY;

      // Adjust position if menu would go off screen
      const menuWidth = 200;
      const menuHeight = 240;
      const adjustedX = x + menuWidth > window.innerWidth ? window.innerWidth - menuWidth - 10 : x;
      const adjustedY = y + menuHeight > window.innerHeight ? window.innerHeight - menuHeight - 10 : y;

      setPosition({ x: adjustedX, y: adjustedY });
      setVisible(true);
    },
    [playSound]
  );

  const handleClick = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleClick);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", handleClick);
    };
  }, [handleContextMenu, handleClick]);

  const handleMenuItemClick = (action) => {
    playSound("click", 0.2);
    setVisible(false);

    switch (action) {
      case "back":
        window.history.back();
        break;
      case "forward":
        window.history.forward();
        break;
      case "reload":
        window.location.reload();
        break;
      case "copy":
        const selection = window.getSelection().toString();
        if (selection) {
          navigator.clipboard.writeText(selection);
        }
        break;
      case "selectAll":
        document.execCommand("selectAll");
        break;
      default:
        break;
    }
  };

  if (!visible) return null;

  const menuItems = [
    { label: "Back", action: "back", icon: "←" },
    { label: "Forward", action: "forward", icon: "→" },
    { label: "Reload", action: "reload", icon: "⟳" },
    { type: "separator" },
    { label: "Copy", action: "copy", icon: "⎘" },
    { label: "Select All", action: "selectAll", icon: "☰" },
  ];

  return createPortal(
    <div
      className="fixed z-[9999] bg-surface border border-ornate rounded-lg shadow-2xl py-2 min-w-[200px]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        animation: "fadeIn 0.15s ease-out",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {menuItems.map((item, index) =>
        item.type === "separator" ? (
          <div
            key={index}
            className="my-1 h-px bg-ornate/30"
            style={{ margin: "4px 8px" }}
          />
        ) : (
          <button
            key={index}
            onClick={() => handleMenuItemClick(item.action)}
            className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-card hover:text-accent transition-colors flex items-center gap-3 font-body"
          >
            <span className="text-accent opacity-70 w-4">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        )
      )}
    </div>,
    document.body
  );
}
