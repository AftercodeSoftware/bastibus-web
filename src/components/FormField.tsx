import { cn } from "@/lib/utils";
import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  errorMessage?: string;
  children: React.ReactNode;
  required?: boolean;
  register?: UseFormRegisterReturn;
}

const FormField = ({
  label,
  htmlFor,
  errorMessage,
  children,
  required = false,
  register,
}: FormFieldProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={htmlFor}
        className={cn("block text-sm font-medium text-muted-foreground mb-1")}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {React.cloneElement(
        children as React.ReactElement,
        register ? { ...register } : {}
      )}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export { FormField };
