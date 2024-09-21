import React from "react";

type ButtonTypes = "button" | "submit" | "reset" | undefined;

export default function Button({
  type,
  children,
  className,
  ...props
}: {
  type?: ButtonTypes;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type={type || "submit"}
      className={`py-2 px-8 text-white font-medium text-center bg-verde-500 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
