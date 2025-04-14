import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="web" options={{ headerShown: false }} />
    </Stack>
  );
}
