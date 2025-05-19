import * as React from "react";
import { TextInput, View, type TextInputProps } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "./text";

export interface InputProps extends TextInputProps {
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
  /** Optional inset label text. */
  label?: string;
  /** ID – required for web <label htmlFor>. */
  id?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  (
    {
      className,
      containerClassName,
      placeholderClassName,
      startContent,
      endContent,
      label,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    // ------- Styles ----------
    const baseWrapperClasses =
      "flex-row rounded-xl border bg-background web:w-full transition-[color,box-shadow] outline-none lg:text-sm";

    // Spacing inside input (accounts for inset label)
    const insetPadding = cn("pt-1 pb-1 px-3", label && "pt-4");

    const wrapperClasses = cn(
      baseWrapperClasses,
      isFocused ? "border-primary" : "border-input",
      props.editable === false && "opacity-50 web:cursor-not-allowed",
      insetPadding,
      containerClassName
    );

    const inputClasses = cn(
      "flex-1 text-base native:text-base native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none !h-12 p-0",
      className
    );

    return (
      <View className={wrapperClasses}>
        {/* Web-only inset label */}
        {label && (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <Text className="text-slate-600 absolute left-3 top-2 text-xs font-medium pointer-events-none">
            {label}
          </Text>
        )}

        {startContent && <View className="mr-2 mt-2.5">{startContent}</View>}

        <TextInput
          ref={ref}
          id={id}
          onFocus={() => setIsFocused(true)}
          onEndEditing={() => setIsFocused(false)}
          className={inputClasses}
          value={value && String(value)}
          placeholderClassName={cn(
            "text-muted-foreground",
            placeholderClassName
          )}
          {...props}
        />

        {endContent && (
          <Text className="ml-2 mt-2.5 text-slate-600">{endContent}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

export { Input };
