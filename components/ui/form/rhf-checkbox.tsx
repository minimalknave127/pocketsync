import { useFormContext } from "react-hook-form";
import { FormField } from "../form";
import BouncyCheckbox, {
  BouncyCheckboxProps,
} from "react-native-bouncy-checkbox";

type RHFCheckboxProps = {
  name: string;
} & Omit<BouncyCheckboxProps, "onChange" | "isChecked">;

export default function RHFCheckbox({ name, ...rest }: RHFCheckboxProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <BouncyCheckbox
          isChecked={field.value}
          onPress={() => field.onChange(!field.value)}
          useBuiltInState={false}
          {...rest}
        />
      )}
    />
  );
}
