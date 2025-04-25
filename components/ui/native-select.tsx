import * as DropdownMenu from "zeego/dropdown-menu";
import { Input } from "./input";
import {
  DoropdownMenuCheckboxItem,
  DoropdownMenuItemIndicator,
  DoropdownMenuItemTitle,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { View } from "react-native";

export type NativeSelectProps = {
  options: {
    label: string;
    value: string;
  }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  children?: React.ReactNode;
};

export default function NativeSelect({
  options,
  selectedValue,
  onValueChange,
  children,
}: NativeSelectProps) {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {options?.map((option) => (
          <DoropdownMenuCheckboxItem
            onValueChange={() => onValueChange(option.value)}
            key={option.value}
            value={selectedValue === option.value}
          >
            <DoropdownMenuItemTitle>{option.label}</DoropdownMenuItemTitle>
            <DoropdownMenuItemIndicator />
          </DoropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
