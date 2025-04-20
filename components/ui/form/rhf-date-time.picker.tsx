import { useFormContext } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { TextInputProps } from "react-native";
import { Input } from "../input";
import GSDateTimePicker, { DateTimePickerProps } from "../date-time-picker";

type RHFInputProps = {
  name: string;
  label?: string;
  required?: boolean;
  inputClassName?: string;
  description?: string;
  className?: string;
} & Omit<DateTimePickerProps, "onChange" | "value">;

export default function RHFDateTimePicker({
  name,
  label,
  required,
  className,
  inputClassName,
  description,
  ...props
}: RHFInputProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {/* {required && <Text className="text-destructive">*</Text>} */}
            </FormLabel>
          )}
          {/* <FormControl> */}
          <GSDateTimePicker
            onChange={field.onChange}
            value={field.value}
            {...props}
          />
          {/* </FormControl> */}
          {description && (
            <FormDescription className="mt-0.5">{description}</FormDescription>
          )}
          <FormMessage className="mt-1" />
        </FormItem>
      )}
    />
  );
}
