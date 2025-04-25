import { useFormContext } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { TextInputProps, View } from "react-native";
import { Input, InputProps } from "../input";
import NativeSelect, { NativeSelectProps } from "../native-select";

type RHFInputProps = {
  name: string;
  label?: string;
  required?: boolean;
  inputClassName?: string;
  description?: string;
  className?: string;
} & Omit<NativeSelectProps, "onValueChange" | "selectedValue">;

export default function RHFNativeSelect({
  name,
  label,
  required,
  className,
  inputClassName,
  description,
  options,
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
          <NativeSelect
            options={options}
            onValueChange={field.onChange}
            selectedValue={field.value}
          >
            <View pointerEvents="none">
              <Input
                {...props}
                {...field}
                className={inputClassName}
                value={
                  options?.find((option) => option.value === field.value)?.label
                }
              />
            </View>
          </NativeSelect>
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
