import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { View, Dimensions } from "react-native";
import CardSeparator from "../ui/card-separator";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import SkeletonBox from "../skeletons/skeleton-box";

const { width } = Dimensions.get("screen");

export interface DetailsHeaderProps {
  title: string | React.JSX.Element;
  avatar?: string;
  avatarFallback?: string;
  descripton?: string | React.JSX.Element;
  separator?: boolean;
  loading?: boolean;
  icon?: string | React.JSX.Element;
  classNames?: { iconWrapper?: string; textIcon?: string };
}

export default function DetailsHeader({
  title,
  avatar,
  avatarFallback,
  descripton,
  separator = false,
  icon,
  classNames = {},
  loading = false,
}: DetailsHeaderProps) {
  const renderAvatar = () =>
    loading ? (
      <SkeletonBox w={70} h={70} />
    ) : avatar ? (
      <Avatar alt="avatar" className="w-20 h-20">
        {avatarFallback && (
          <AvatarFallback>
            <Text className="text-2xl font-medium capitalize">
              {avatarFallback}
            </Text>
          </AvatarFallback>
        )}
      </Avatar>
    ) : null;

  const renderIcon = () =>
    typeof icon === "string" ? (
      loading ? (
        <SkeletonBox w={70} h={70} />
      ) : (
        <View
          className={`w-20 h-20 bg-slate-100 rounded-xl items-center justify-center ${classNames.iconWrapper}`}
        >
          <Text className={`text-2xl font-medium ${classNames.textIcon}`}>
            {icon}
          </Text>
        </View>
      )
    ) : (
      icon
    );

  const renderTitle = () =>
    loading ? (
      <SkeletonBox w={width * 0.5} h={30} />
    ) : typeof title === "string" ? (
      <Text className="text-xl font-semibold capitalize">{title}</Text>
    ) : (
      title
    );

  const renderDescription = () =>
    loading ? (
      <View className="mt-2">
        <SkeletonBox w={width * 0.4} h={25} />
      </View>
    ) : typeof descripton === "string" ? (
      <Text className="text-sm mt-2.5">{descripton}</Text>
    ) : (
      <View className="flex-row items-center gap-4 mt-2.5">{descripton}</View>
    );

  return (
    <>
      <View className="px-container flex-row items-center gap-6">
        {avatar ? renderAvatar() : renderIcon()}
        <View>
          {renderTitle()}
          {descripton !== undefined && renderDescription()}
        </View>
      </View>

      {separator && <CardSeparator className="py-4" />}
    </>
  );
}
