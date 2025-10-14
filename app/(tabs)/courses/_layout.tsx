import { Stack } from 'expo-router';

export default function CoursesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1e40af',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="six-month"
        options={{
          title: 'Six-Month Courses',
        }}
      />
      <Stack.Screen
        name="six-week"
        options={{
          title: 'Six-Week Courses',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Course Details',
        }}
      />
    </Stack>
  );
}
