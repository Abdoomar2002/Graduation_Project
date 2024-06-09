import { StatusBar } from "expo-status-bar";
<<<<<<< HEAD
import { StyleSheet, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import StorageService from "./utils/storageService";
import LocaleService from "./utils/localeService";
import LocalStorageProvider from "./utils/localStorageProvider";
import LocaleProvider from "./utils/localeProvider";
import store from "./redux/store";
import AppRouters from "./routers";
import "react-native-gesture-handler";
import HttpHelpers from "./services/helpers";
StorageService.setStorageProvider(LocalStorageProvider);
LocaleService.setLocaleResolver(LocaleProvider);
HttpHelpers.setBaseUrl(process.env.REACT_APP_API_URL);
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.phone}>
        <AppRouters />

        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
=======
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackgroundBase,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Image src="./assets/favicon.png" />
        <Text>Hello</Text>
        <ImageBackgroundBase />
      </View>
      <StatusBar style="auto" />
    </View>
>>>>>>> fdb828f2cdb078504b2778ba662b959b03b01081
  );
}

const styles = StyleSheet.create({
  phone: {
    flex: 1,
<<<<<<< HEAD
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 100,
    height: 800,
    width: "auto",
    color: "white",
  },
  foot: {
    position: "absolute",
    bottom: 30,
  },
  logo: {
    width: 250,
    height: 200,
    objectFit: "contain",
=======
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
>>>>>>> fdb828f2cdb078504b2778ba662b959b03b01081
  },
});
