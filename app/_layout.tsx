import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="explore" />
      <Stack.Screen name="home" />
      <Stack.Screen name="lifestyle" />
      <Stack.Screen name="find-gynaecologist" />
      <Stack.Screen name="period" />
      <Stack.Screen name="coach" />
      <Stack.Screen name="hormone-score" />
      <Stack.Screen name="reminder" />
      <Stack.Screen name="workouts" />
    </Stack>
  );
}