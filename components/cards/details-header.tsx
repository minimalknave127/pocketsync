import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import CardSeparator from "../ui/card-separator";

interface DetailsHeaderProps {
  title: string | React.JSX.Element;
  avatar?: string;
  avatarFallback?: string;
  descripton?: string | React.JSX.Element;
  separator?: boolean;
  icon?: string | React.JSX.Element;
  classNames?: {
    iconWrapper?: string;
    textIcon?: string;
  };
}

export default function DetailsHeader({
  title,
  avatar,
  avatarFallback,
  descripton,
  separator = false,
  icon,
  classNames,
}: DetailsHeaderProps) {
  return (
    <>
      <View className="px-container flex-row items-center gap-6">
        {avatar && (
          <Avatar alt="ts" className={`w-20 h-20`}>
            {avatarFallback && (
              <AvatarFallback>
                <Text className="text-2xl font-medium capitalize">
                  {avatarFallback}
                </Text>
              </AvatarFallback>
            )}
          </Avatar>
        )}
        {icon && typeof icon === "string" ? (
          <View
            className={`w-20 h-20 bg-slate-100 rounded-xl items-center justify-center ${classNames?.iconWrapper}`}
          >
            <Text className={`text-2xl font-medium ${classNames?.textIcon}`}>
              {icon}
            </Text>
          </View>
        ) : (
          icon
        )}
        <View>
          {typeof title === "string" ? (
            <Text className="text-xl font-semibold capitalize">{title}</Text>
          ) : (
            title
          )}
          {typeof descripton === "string" ? (
            <Text className="text-sm mt-2.5">{descripton}</Text>
          ) : (
            <View className="flex-row items-center gap-4 mt-2.5">
              {descripton}
            </View>
          )}
        </View>
      </View>

      {separator && <CardSeparator className="py-4" />}
    </>
  );
}
