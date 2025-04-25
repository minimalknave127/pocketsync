import { useFormContext } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { TextInput, TextInputProps } from "react-native";
import { Input, InputProps } from "../input";

type RHFInputProps = {
  name: string;
  label?: string;
  required?: boolean;
  inputClassName?: string;
  description?: string;
} & InputProps;

export default function RHFBigInput({
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
          <TextInput
            {...props}
            {...field}
            className={inputClassName}
            onChangeText={field.onChange}
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
