<<<<<<< HEAD
import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
  async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.error("Error getting data from AsyncStorage:", error);
      return null;
    }
  },

  async set(key, value) {
    try {
      await AsyncStorage.setItem(key, value);

      console.log("Data saved successfully!");
      return true;
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
      return false;
    }
  },
  async remove(key, value) {
    try {
      await AsyncStorage.removeItem(key);

      console.log("Data removed successfully!");
      return true;
    } catch (error) {
      console.error("Error removing data from AsyncStorage:", error);
      return false;
    }
=======
/* eslint-disable import/no-anonymous-default-export */
export default {
  get(key) {
    return new Promise((resolve) => resolve(localStorage.getItem(key)));
  },

  set(key, value) {
    return new Promise((resolve) => resolve(localStorage.setItem(key, value)));
>>>>>>> fdb828f2cdb078504b2778ba662b959b03b01081
  },
};
