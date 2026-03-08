import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="bloomcircle" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="finddoctors" />
      <Tabs.Screen name="lifestyle" />
      <Tabs.Screen name="period" />
      <Tabs.Screen name="reminder" />
      <Tabs.Screen name="symptoms" />
      <Tabs.Screen name="workouts" />
    </Tabs>
  );
}