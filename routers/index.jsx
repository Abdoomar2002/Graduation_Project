import routes from "./routes";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const AppRouters = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
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
