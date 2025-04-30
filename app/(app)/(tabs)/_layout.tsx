import { Redirect, Tabs } from "expo-router";
import React, { useRef } from "react";
import { Platform, View } from "react-native";
import colors from "tailwindcss/colors";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSession } from "@/auth/auth";
import { Text } from "@/components/ui/text";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { Button } from "@/components/ui/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OptionsSheet from "@/components/OptionsSheet";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const sheet = useRef<TrueSheet>(null);

  // Present the sheet ✅
  const present = async () => {
    await sheet.current?.present();
    console.log("horray! sheet has been presented 💩");
  };

  // Dismiss the sheet ✅
  const dismiss = async () => {
    await sheet.current?.dismiss();
    console.log("Bye bye 👋");
  };

  return (
    <>
      <OptionsSheet sheetRef={sheet} dismiss={dismiss} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#26C195",
          headerShown: false,
          headerShadowVisible: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,

          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Domů",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="clients"
          options={{
            title: "Klienti",
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="options"
          options={{
            title: "Klienti",
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="dot.square" color={color} />
            ),
          }}
          listeners={() => ({
            tabPress: (e) => {
              //@ts-ignore
              e.preventDefault();
              present();
            },
          })}
        />
      </Tabs>
    </>
  );
}
