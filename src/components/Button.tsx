import React from "react";

type ButtonTypes = "button" | "submit" | "reset" | undefined;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`py-2 px-8 text-white font-medium text-center bg-verde-500 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
