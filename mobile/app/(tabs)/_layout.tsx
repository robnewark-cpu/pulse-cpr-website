import { SymbolView } from "expo-symbols"
import { Tabs } from "expo-router"

import Colors from "@/constants/Colors"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tabIconSelected,
        tabBarInactiveTintColor: Colors.light.tabIconDefault,
        tabBarStyle: { backgroundColor: "#FFFFFF" },
        headerStyle: { backgroundColor: Colors.light.navy },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "700" },
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Pulse CPR",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: "house.fill", android: "home", web: "home" }}
              tintColor={color}
              size={26}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="classes"
        options={{
          title: "Classes",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: "heart.fill", android: "favorite", web: "favorite" }}
              tintColor={color}
              size={26}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: "calendar", android: "calendar_month", web: "calendar_month" }}
              tintColor={color}
              size={26}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: "phone.fill", android: "call", web: "call" }}
              tintColor={color}
              size={26}
            />
          ),
        }}
      />
    </Tabs>
  )
}
