import {
  DoropdownMenuItemTitle,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Option = {
  text: string;
  value: string;
  destructive?: boolean;
  icon?: {
    ios: {
      name: string;
      pointSize: number;
    };
    androidIconName: string;
  };
};

interface DropdownSelectorProps {
  options: Option[];
  onPress?: (option: string) => void;
  children: React.ReactElement;
}

export default function DropdownOptionsMenu({
  children,
  options,
  onPress,
}: DropdownSelectorProps) {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        style={{
          backgroundColor: "red",
          borderBottomColor: "red",
        }}
      >
        {options.map((option) => (
          <DropdownMenuItem
            destructive={option.destructive}
            textValue={option.text}
            key={option.value}
            onSelect={() => onPress(option.value)}
            // value={option.value === selected?.value ? "on" : "off"}
          >
            <DoropdownMenuItemTitle>{option.text}</DoropdownMenuItemTitle>
            {option.icon && (
              <DropdownMenuItemIcon
                //@ts-expect-error
                ios={option.icon.ios}
                androidIconName={option.icon.androidIconName}
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
