import * as React from "react";
import { TextInput, View, type TextInputProps } from "react-native";
import { cn } from "@/lib/utils";

/**
 * Cross‑platform Input component with optional start / end adornments rendered *inside* the field border.
 */
// export interface InputProps extends TextInputProps {
//   /** Element shown on the left side (e.g. an icon). */
//   startContent?: React.ReactNode;
//   /** Element shown on the right side (e.g. a clear button). */
//   endContent?: React.ReactNode;
//   /** Extra className for the outer wrapper. */
//   containerClassName?: string;
//   /** Tailwind className for TextInput. */
//   className?: string;
//   /** Tailwind className for placeholder. */
//   placeholderClassName?: string;
// }
export type InputProps = TextInputProps & {
  /** Element shown on the left side (e.g. an icon). */
  startContent?: React.ReactNode;
  /** Element shown on the right side (e.g. a clear button). */
  endContent?: React.ReactNode;
  /** Extra className for the outer wrapper. */
  containerClassName?: string;
  /** Tailwind className for TextInput. */
  className?: string;
  /** Tailwind className for placeholder. */
  placeholderClassName?: string;
};

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  (
    {
      className,
      containerClassName,
      placeholderClassName,
      startContent,
      endContent,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <View
        className={cn(
          // Shared field styles live on the wrapper so the icons sit *inside* the border
          "flex-row items-center h-10 native:h-14 rounded-xl border bg-background px-3 web:w-full lg:text-sm", // spacing/padding
          isFocused ? "border-primary" : "border-input",
          props.editable === false && "opacity-50 web:cursor-not-allowed",
          containerClassName
        )}
      >
        {startContent && <View className="mr-2">{startContent}</View>}

        <TextInput
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onEndEditing={() => setIsFocused(false)}
          className={cn(
            "flex-1 text-base native:text-base native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none",
            className
          )}
          placeholderClassName={cn(
            "text-muted-foreground",
            placeholderClassName
          )}
          {...props}
        />

        {endContent && <View className="ml-2">{endContent}</View>}
      </View>
    );
  }
);

Input.displayName = "Input";

export { Input };
