import { useState } from "react";
import {
  View,
  Alert,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  DatePicker,
  Pressable,
} from "react-native";
import NavBar from "../../components/Navbar";
import DateTimePicker from "@react-native-community/datetimepicker";

function MakeOrderPage({ navigation }) {
  const [details, setDetails] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdownTime, setCountdownTime] = useState(date.getTime()); // initial countdown time

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  function handleSubmitOrder() {
    console.log("done");
  }
  const toggleView = () => {
    setShowCountdown(!showCountdown);
    setShowPicker(true);
  };
  const handleTextInputPress = (addressType) => {
    Alert.alert(
      "Select Address Source",
      "Do you want to input the address manually or select it from the map?",
      [
        {
          text: "Manually",
          onPress: () => console.log("Input address manually"),
        },
        {
          text: "Map",
          onPress: () => navigation.navigate("Map", { addressType }),
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Make Order </Text>
          </View>
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Order Information</Text>
            <TextInput
              style={[styles.input, { height: 200, textAlignVertical: "top" }]}
              placeholder="Order Details"
              value={details}
              multiline={true}
              onChangeText={setDetails}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Target Address"
              value={fromDate}
              onChangeText={setFromDate}
              onFocus={() => handleTextInputPress("target")}
            />
            <TextInput
              style={styles.input}
              placeholder="Delivery Address"
              value={toDate}
              onChangeText={setToDate}
              onFocus={() => handleTextInputPress("delivery")}
            />
          </View>
          <View>
            {showCountdown ? (
              <Pressable onPress={toggleView}>
                <Text style={styles.dateinput}>
                  {date.getHours().toString() +
                    " : " +
                    date.getMinutes().toString()}
                </Text>
              </Pressable>
            ) : (
              <View>
                <Button onPress={toggleView} title="Close" />
                {showPicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="countdown"
                    is24Hour={true}
                    onChange={onChangeDate}
                  />
                )}
              </View>
            )}
          </View>
          <View style={styles.submitbtn}>
            <Button title="Submit Order" onPress={handleSubmitOrder} />
          </View>
        </ScrollView>
      </View>
      <NavBar navigation={navigation} active={"order"} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dateinput: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "solid",
    padding: 12,
  },
  header: {
    flex: 1,
    //flexDirection: "row", // Arrange logo and title horizontally
    alignItems: "center", // Align vertically
    marginBottom: 20,
    textAlign: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerTitle: {
    fontSize: 20,
    marginLeft: 10,
    textAlign: "center",
  },
  formSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  orderDetailsSection: {
    marginBottom: 20,
  },
  orderItem: {
    flexDirection: "row", // Arrange item details horizontally
    justifyContent: "space-between", // Distribute content evenly
    alignItems: "center",
  },
  submitbtn: {
    alignItems: "flex-end",
    marginVertical: 20,
  },
});
export default MakeOrderPage;
