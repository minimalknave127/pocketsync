import { View } from "react-native";
import EventTimelineItem from "./event-timeline-item";

export default function EventTimeline() {
  return (
    <View>
      {Array.from({ length: 5 }).map((_, i) => (
        <EventTimelineItem key={i} />
      ))}
    </View>
  );
}
