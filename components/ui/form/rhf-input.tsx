import { useFormContext } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input, InputProps } from "../input";

type RHFInputProps = {
  name: string;
  label?: string;
  required?: boolean;
  inputClassName?: string;
  description?: string;
} & InputProps;

export default function RHFInput({
  name,
  label,
  required,
  className,
  inputClassName,
  description,
  // variant = "default",
  ...props
}: RHFInputProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {/* <FormControl> */}
          <Input
            {...props}
            {...field}
            label={label}
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
