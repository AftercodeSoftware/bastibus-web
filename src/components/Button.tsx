import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  secondary,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`py-2 px-8 font-medium text-center rounded-lg ${
        secondary
          ? "text-verde-800 bg-white border border-verde-600"
          : "text-white bg-verde-500"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
