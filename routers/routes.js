import { LayoutAnimation } from "react-native";
import SignIn from "../views/Register/SignIn";
import Logo from "../views/Logo";
import SignUp from "../views/Register/SignUp";
import Home from "../views/Hatley";
import MakeOrderPage from "../views/MakeOrder";
import DeliveryOrdersScreen from "../views/Notification";
import Profile from "../views/Profile";
import ForgotPassword from "../views/Register/ForgetPassword";
import EnterCodePage from "../views/Register/CodePage";
import NewPasswordPage from "../views/Register/NewPassword";
import MapScreen from "../views/Map/Map";
import DisplayOrder from "../views/DisplayOrder";
import OrderDetails from "../components/OrderDetails";
const routes = [
  {
    name: "Splash",
    component: Logo,
    Option: {
      headerShown: false,
      cardStyle: { backgroundColor: "#fff" },
      gestureEnabled: false,
    },
  },
  {
    name: "SignIn",
    component: SignIn,
    Option: {
      headerShown: false,
      cardStyle: { backgroundColor: "#fff" },
      gestureEnabled: false,
    },
  },
  {
    name: "SignUp",
    component: SignUp,
    Option: {
      headerShown: false,
      cardStyle: { backgroundColor: "#fff" },
      gestureEnabled: false,
    },
  },
  {
    name: "Forget",
    component: ForgotPassword,
    Option: {
      headerShown: true,
      cardStyle: { backgroundColor: "#fff" },
      gestureEnabled: false,
    },
  },
  {
    name: "Code",
    component: EnterCodePage,
    Option: {
      headerShown: true,
      cardStyle: { backgroundColor: "#fff" },
      gestureEnabled: false,
    },
  },
  {
    name: "Password",
    component: NewPasswordPage,
    Option: {
      headerShown: true,
      cardStyle: { backgroundColor: "#fff" },
      gestureEnabled: false,
    },
  },
  {
    name: "Home",
    component: Home,
    Option: {
      headerShown: false,
      cardStyle: { backgroundColor: "#fff" },
      gestureEnabled: false,
    },
  },
  {
    name: "Order",
    component: MakeOrderPage,
    Option: {
      headerShown: false,
      cardStyle: { backgroundColor: "#fff" },
      gestureEnabled: false,
    },
  },
  {
    name: "Map",
    component: MapScreen,
    Option: {
      headerShown: true,
      cardStyle: { backgroundColor: "#fff" },
      gestureEnabled: false,
    },
  },
  {
    name: "Notification",
    component: DeliveryOrdersScreen,
    Option: {
      headerShown: true,
      cardStyle: { backgroundColor: "#fff" },
      gestureEnabled: false,
    },
  },
  {
    name: "Profile",
    component: Profile,
    Option: {
      headerShown: false,
      cardStyle: { backgroundColor: "#fff" },
      gestureEnabled: false,
    },
  },
  {
    name: "Orders",
    component: DisplayOrder,
    Option: {
      headerShown: false,
      cardStyle: { backgroundColor: "#fff" },
      gestureEnabled: false,
    },
  },
  {
    name: "Details",
    component: OrderDetails,
    Option: {
      headerShown: true,
      cardStyle: { backgroundColor: "#fff" },
      gestureEnabled: false,
    },
  },
];
export default routes;
