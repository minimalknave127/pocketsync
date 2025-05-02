import { Link, router } from "expo-router";
import { ViewStyle } from "react-native";
import { Button } from "../ui/button";
import { ArrowLeftIcon, Pencil, XIcon } from "lucide-react-native";
import { Icon } from "../icon";

export default function EditBtn({ href, route }: { href: string; route: any }) {
  if (!router.canGoBack()) return null;
  const { id } = route.params;

  href.replace("[id]", id);

  return (
    <Link href={href} asChild>
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full"
        onPress={router.back}
      >
        <Icon
          icon={Pencil}
          width={18}
          height={18}
          className="text-foreground"
        />
      </Button>
    </Link>
  );
}
