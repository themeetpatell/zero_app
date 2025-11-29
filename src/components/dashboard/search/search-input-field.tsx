"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import "@/app/dashboard/dashboard.css";

export interface SearchInputFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const SearchInputField = React.forwardRef<
  HTMLTextAreaElement,
  SearchInputFieldProps
>(({ className, value, ...props }, ref) => {
  const internalRef = React.useRef<HTMLTextAreaElement>(null);
  const textareaRef = (ref || internalRef) as React.RefObject<HTMLTextAreaElement>;

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="relative w-full h-full">
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        className={cn(
          "w-full resize-none overflow-auto bg-transparent text-foreground outline-none",
          "font-sans text-lg leading-6",
          "max-h-[45vh] sm:max-h-[25vh] lg:max-h-[40vh]",
          "placeholder:text-transparent",
          "selection:bg-primary/10",
          "scrollbar-subtle",
          className,
        )}
        placeholder=" "
        {...props}
      />
      {(!value || String(value).length === 0) && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none select-none text-[color:var(--color-text-quieter)]",
            "font-sans text-lg leading-6",
          )}
        >
          Ask anything.
        </div>
      )}
    </div>
  );
});

SearchInputField.displayName = "SearchInputField";

export default SearchInputField;