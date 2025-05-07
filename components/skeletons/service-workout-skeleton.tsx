import React, { useMemo } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function ServiceWorkoutSkeleton() {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          //   width={width * 0.9}
          height={70}
          borderRadius={10}
          marginBottom={12}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
