import { router } from "expo-router";
import { ViewStyle } from "react-native";
import { Button } from "../ui/button";
import { ArrowLeftIcon, XIcon } from "lucide-react-native";
import { Icon } from "../icon";

export default function BackBtn({
  style,
  isModal,
}: {
  style?: ViewStyle;
  isModal?: boolean;
}) {
  if (!router.canGoBack()) return null;
  // check if is in a modal

  //@ts-ignore
  // const isModal = segments.includes("(modal)");
  // const isModal = false;

  return (
    <Button
      size="icon"
      variant="secondary"
      className="rounded-full"
      onPress={router.back}
    >
      {/* <ChevronLeft color={PALETTE.common.black} /> */}
      {isModal ? (
        <Icon icon={XIcon} width={18} height={18} className="text-foreground" />
      ) : (
        <Icon
          icon={ArrowLeftIcon}
          style={{ width: 18, height: 18 }}
          className="text-foreground"
        />
      )}
    </Button>
  );
}
