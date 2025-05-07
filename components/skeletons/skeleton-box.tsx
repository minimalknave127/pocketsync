import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const SkeletonBox = ({ w, h }: { w: number; h: number }) => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item width={w} height={h} borderRadius={10} />
  </SkeletonPlaceholder>
);

export default SkeletonBox;
