import React from "react";

export default function LoginCard({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div
      className={`relative bg-white rounded-lg p-8 sm:p-10 shadow-sm w-full md:w-1/3`}
      {...props}
    >
      {children}
    </div>
  );
}
