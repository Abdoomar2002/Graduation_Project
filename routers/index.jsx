import routes from "./routes";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as TaskManager from "expo-task-manager";
import { createRef, useEffect } from "react";
import { setupNotifications } from "../Hub/setNotification";
const AppRouters = () => {
  const Stack = createStackNavigator();
  const navigationRef = createRef();
  useEffect(() => {
    const cleanup = setupNotifications(navigationRef.current);

    return () => {
      if (cleanup) cleanup();
    };
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Splash">
        {routes.map((e) => (
          <Stack.Screen
            key={e.name}
            name={e.name}
            component={e.component}
            options={e.Option}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouters;
TaskManager.defineTask("BACKGROUND-NOTIFICATION-TASK", ({ data, error }) => {
  if (error) {
    console.error("Notification task error:", error);
    return;
  }
  if (data) {
    console.log("Received a notification in the background!", data);
    // Handle the notification, e.g., save it in local storage
  }
});
