"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const contextClass = {
    success: "bg-green-400",
    error: "bg-red-400",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 text-gray-300",
  };

  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        toastClassName={(context) =>
          `${contextClass[context?.type || "default"]} relative flex p-1 min-h-[40px] rounded-md justify-between overflow-hidden cursor-pointer`
        }
        className="text-sm font-medium text-white"
      />
    </>
  );
}
