import { dateToLocale, timeToLocale } from "@/functions/date";
import { useState } from "react";
import { Pressable, View, ViewStyle } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Input } from "./input";
import { Label } from "./label";

export interface DateTimePickerProps {
  value: Date | undefined;
  onChange: (date: Date) => void;
  label?: string;
  mode?: "date" | "datetime" | "time";
  minimumDate?: Date;
  maximumDate?: Date;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
}

export default function GSDateTimePicker(props: DateTimePickerProps) {
  const [isVisible, setIsVisible] = useState(false);

  function handleConfirm(val: any) {
    props.onChange(val);
    setIsVisible(false);
  }
  return (
    <>
      <DateTimePickerModal
        display="spinner"
        isVisible={isVisible}
        date={new Date(props.value)}
        onCancel={() => setIsVisible(false)}
        onConfirm={handleConfirm}
        mode={props.mode || "date"}
        minimumDate={props.minimumDate}
        maximumDate={props.maximumDate}
        // confirmTextIOS={t.t("buttons.confirm")}
        // cancelTextIOS={t.t("buttons.cancel")}
      />
      <Pressable
        style={[props.containerStyle]}
        onPress={() => setIsVisible(true)}
      >
        <View pointerEvents="none">
          <Input
            value={
              props.mode === "time"
                ? timeToLocale(props?.value)
                : dateToLocale(
                    props.value,
                    props.mode === "datetime" ? false : true
                  )
            }
            // style={[
            //   styles.textfield,
            //   props.label ? { marginTop: 0 } : {},
            //   props.inputStyle,
            // ]}
          />
        </View>
      </Pressable>
    </>
  );
}
