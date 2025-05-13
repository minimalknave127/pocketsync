import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import RHFInput from "@/components/ui/form/rhf-input";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { tServStoreOption, useServiceStore } from "@/stores/service";
import { sServiceOptionSchema } from "@/zod/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { Modal, View } from "react-native";

export default function ServiceEditOptionsCreateEditSheet({
  isOpen,
  setIsOpen,
  selected,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  selected?: tServStoreOption;
}) {
  return (
    <Modal visible={isOpen} animationType="slide">
      <Screen className="flex-col justify-between">
        <FormComponent selected={selected} setIsOpen={setIsOpen} />
      </Screen>
    </Modal>
  );
}

const FormComponent = ({ selected, setIsOpen }) => {
  const setServiceOptions = useServiceStore((state) => state.updateOptions);
  const serviceOptions = useServiceStore((state) => state.options);
  const form = useForm({
    defaultValues: {
      name: selected?.name || "",
      description: selected?.description || "",
    },
    resolver: zodResolver(sServiceOptionSchema),
  });

  const onSubmit = (data: any) => {
    if (!selected) {
      const newOption: tServStoreOption = {
        ...data,
        id: `custom-${serviceOptions.length + 1}`,
        order: serviceOptions.length,
      };
      setServiceOptions([...serviceOptions, newOption]);
    } else {
      // ✅ Immutable update
      const newOptions = serviceOptions.map((option) =>
        option.id === selected.id ? { ...option, ...data } : option
      );
      setServiceOptions(newOptions);
    }
    setIsOpen(false);
    form.reset();
  };
  return (
    <>
      <View>
        <View className={cn(`flex-row items-center justify-end px-container `)}>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full"
            onPress={() => setIsOpen(false)}
          >
            <Icon
              icon={XIcon}
              width={18}
              height={18}
              className="text-foreground"
            />
          </Button>
        </View>
        <View className="flex-row items-center justify-between px-container">
          <Text className="font-semibold text-2xl  mt-4">Upravte obsah</Text>
        </View>

        <View className="px-container">
          <Form {...form}>
            <RHFInput
              name="name"
              label="Název"
              placeholder="Zadejte název"
              className="mt-4"
              variant="insetLabel"
            />
            <RHFInput
              name="description"
              label="Popis"
              placeholder="Zadejte popis"
              className="mt-4"
              variant="insetLabel"
              multiline
              numberOfLines={4}
              inputClassName="h-24"
              containerClassName="!h-24"
            />
          </Form>
        </View>
      </View>

      <View className="px-container">
        <Button onPress={form.handleSubmit(onSubmit)}>Potvrdit</Button>
      </View>
    </>
  );
};
