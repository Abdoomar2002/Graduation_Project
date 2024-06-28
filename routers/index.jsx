import routes from "./routes";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GetNewOrder from "../Hub/GetNewOrder";
import GetAcceptOrReject from "../Hub/NotifyOfAcceptOrDeclineForDeliveryOffer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { actions } from "../redux/Order";
const AppRouters = () => {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();
  useEffect(() => {
    GetNewOrder(dispatch, actions);
    GetAcceptOrReject();
  }, []);
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
