import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { FloatingTabBar } from '@/components/floating-tab-bar';
import { RouteGuard } from '@/components/route-guard';
import { useAppTheme } from '@/hooks/use-app-theme';
import { toRgb } from '@/lib/color';

const TabsLayout = () => {
  const { tokens } = useAppTheme();

  return (
    <RouteGuard requireCompletedProfile>
      <Tabs
        tabBar={(props) => <FloatingTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: toRgb(tokens.colors.background) },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons color={color} name={focused ? 'home' : 'home-outline'} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="plans"
          options={{
            title: 'Plan',
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons color={color} name={focused ? 'star' : 'star-outline'} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="results"
          options={{
            title: 'Style',
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons color={color} name={focused ? 'color-palette' : 'color-palette-outline'} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons color={color} name={focused ? 'person' : 'person-outline'} size={size} />
            ),
          }}
        />
      </Tabs>
    </RouteGuard>
  );
};

export default TabsLayout;
