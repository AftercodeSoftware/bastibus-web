import React from "react";

export default function PageContainer({
  wrapper: Wrapper = "div",
  className,
  children,
}: {
  wrapper?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Wrapper
      className={`max-w-[85%] md:max-w-[50%] relative m-auto ${
        className || ""
      }`}
    >
      {children}
    </Wrapper>
  );
}
