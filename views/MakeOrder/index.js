import { useEffect, useState } from "react";
import {
  View,
  Alert,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import NavBar from "../../components/Navbar";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { actions as GovernateActions } from "../../redux/Governate";
import { actions as ZoneActions } from "../../redux/Zone";
import { actions as OrderActions } from "../../redux/Order";
import Toast from "react-native-toast-message";
import SectionTitle from "../../components/SectionTitle";
function MakeOrderPage({ navigation }) {
  // OrderFormData
  const [orderFormData, setOrderFormData] = useState({
    description: "",
    order_governorate_from: "",
    order_zone_from: "",
    order_city_from: "",
    detailes_address_from: "",
    order_governorate_to: "",
    order_zone_to: "",
    order_city_to: "",
    detailes_address_to: "",
    order_time: new Date(),
    price: 0,
  });
  // Redux Data
  const Governate = useSelector((state) => state?.governate?.data);
  const Zone = useSelector((state) => state?.zone?.data);
  const dispatch = useDispatch();
  // loader
  const [isLoading, setIsLoading] = useState(false);
  //functions
  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(GovernateActions.displayAllGovernorates());
        await dispatch(ZoneActions.getAll());
      } catch (err) {
        Toast.show({ type: "error", text1: "Error", text2: err.message });
      }
    };
    getData();
  }, []);

  const onChangeData = (id, value) => {
    setOrderFormData((elem) => {
      return { ...elem, [id]: value };
    });
  };
  function handleSubmitOrder() {
    const sendData = async () => {
      try {
        if (ValidateOrderData()) {
          //console.log(orderFormData);
          const response = await dispatch(
            OrderActions.postOrder(orderFormData)
          );
          console.log(response);
          if (response != null)
            Toast.show({
              type: "success",
              text1: "Success",
              text2: "Order posted successfully",
            });
          setOrderFormData({
            description: "",
            order_governorate_from: "",
            order_zone_from: "",
            order_city_from: "",
            detailes_address_from: "",
            order_governorate_to: "",
            order_zone_to: "",
            order_city_to: "",
            detailes_address_to: "",
            order_time: new Date(),
            price: 0,
          });
        }
      } catch (err) {
        Toast.show({ type: "error", text1: "Error", text2: err.message });
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    sendData();
  }
  function ValidateOrderData() {
    let err = "";
    if (orderFormData.description.length < 10)
      err += "You must add Description for Order more than 10 characters\n";
    if (orderFormData.price <= 0) err += "You must add Price for Order\n";
    if (orderFormData.order_time == Date.now())
      err += "You must add a time more than now\n";
    if (orderFormData.order_governorate_from == "")
      err += "You Must Choose Governate From\n";
    if (orderFormData.order_zone_from == "")
      err += "You Must Choose Zone From\n";
    //if(orderFormData.order_city_from=="")err+="You Must Choose Village From";
    if (orderFormData.order_governorate_to == "")
      err += "You Must Choose Governate To\n";
    if (orderFormData.order_zone_to == "") err += "You Must Choose Zone To\n";
    // if(orderFormData.order_city_to=="")err+="You Must Choose Village To";
    if ((orderFormData.detailes_address_from = ""))
      err += "You Must add some Details About From Address\n";
    if ((orderFormData.detailes_address_to = ""))
      err += "You Must add some Details About to Address\n";
    if (err.length > 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err,
      });
      return false;
    }
    return true;
  }
  function handleGov(id, value = null) {
    value &&
      setOrderFormData((elem) => {
        return { ...elem, [id]: value };
      });
  }

  const handleTextInputPress = (addressType) => {
    /* Alert.alert(
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
    );*/
  };
  return (
    <>
      {isLoading && <Loader />}
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Make Order </Text>
          </View>
          <View style={styles.formSection}>
            <SectionTitle title={"Order Details"} />

            <TextInput
              style={[styles.input, { height: 200, textAlignVertical: "top" }]}
              placeholder="Order Details"
              value={orderFormData.description}
              multiline={true}
              onChangeText={(value) => onChangeData("description", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              onChangeText={(value) => onChangeData("price", value)}
              value={orderFormData.price}
              keyboardType="phone-pad"
            />
            <Text>Choose the Delivery Time</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={orderFormData.order_time}
              nativeID="order_time"
              mode="datetime"
              minimumDate={new Date()}
              is24Hour={true}
              onChange={(value) => onChangeData("order_time", value)}
              style={{ alignSelf: "flex-start", marginTop: 15, flex: 1 }}
            />
            <SectionTitle title={"From Location"} />
            <RNPickerSelect
              onValueChange={(value) =>
                handleGov("order_governorate_from", value ?? null)
              }
              items={Governate.map((e) => {
                return { label: e.name, value: e.name };
              })}
              placeholder={{ label: "Select Governate From", value: null }}
              disabled={!Governate}
              itemKey="order_governorate_from"
              value={orderFormData.order_governorate_from}
              key={Math.random()}
              style={pickerSelectStyles}
            />
            <RNPickerSelect
              onValueChange={(value) =>
                handleGov("order_zone_from", value ?? null)
              }
              items={Zone.map((e) => {
                return { label: e.name, value: e.name };
              })}
              placeholder={{ label: "Select Zone From", value: null }}
              disabled={!Zone}
              itemKey="order_zone_from"
              value={orderFormData.order_zone_from}
              key={Math.random()}
              style={pickerSelectStyles}
            />
            <RNPickerSelect
              onValueChange={(value) => handleGov("order_city_from", value)}
              items={Zone.map((e) => {
                return { label: e.name, value: e.name };
              })}
              placeholder={{ label: "Select Village From", value: null }}
              disabled={!Zone}
              value={orderFormData.order_city_from}
              itemKey="order_city_from"
              key={Math.random()}
              style={pickerSelectStyles}
            />
            <SectionTitle title={"To Location"} />

            <RNPickerSelect
              onValueChange={(value) =>
                handleGov("order_governorate_to", value)
              }
              items={Governate.map((e) => {
                return { label: e.name, value: e.name };
              })}
              placeholder={{ label: "Select Governate To", value: null }}
              disabled={!Governate}
              itemKey="order_governorate_to"
              value={orderFormData.order_governorate_to}
              key={Math.random()}
              style={pickerSelectStyles}
            />
            <RNPickerSelect
              onValueChange={(value) => handleGov("order_zone_to", value)}
              items={Zone.map((e) => {
                return { label: e.name, value: e.name };
              })}
              placeholder={{ label: "Select Zone To", value: null }}
              disabled={!Zone}
              value={orderFormData.order_zone_to}
              itemKey="order_zone_to"
              key={Math.random()}
              style={pickerSelectStyles}
            />
            <RNPickerSelect
              onValueChange={(value) => handleGov("order_city_to", value)}
              items={Zone.map((e) => {
                return { label: e.name, value: e.name };
              })}
              placeholder={{ label: "Select Village to", value: null }}
              disabled={!Zone}
              value={orderFormData.order_city_to}
              itemKey="order_city_to"
              key={Math.random()}
              style={pickerSelectStyles}
            />
            <SectionTitle title={"Location Details"} />

            <TextInput
              style={styles.input}
              placeholder="From Address"
              value={orderFormData.detailes_address_from}
              nativeID="detailes_address_from"
              onChangeText={(value) =>
                onChangeData("detailes_address_from", value)
              }
              //onFocus={() => handleTextInputPress("target")}
            />
            <TextInput
              value={orderFormData.detailes_address_to}
              onChangeText={(value) =>
                onChangeData("detailes_address_to", value)
              }
              style={styles.input}
              placeholder=" To Address"

              //onFocus={() => handleTextInputPress("delivery")}
            />
          </View>

          <View style={styles.submitbtn}>
            <Button title="Submit Order" onPress={handleSubmitOrder} />
          </View>
        </ScrollView>
        <Toast position="top" />
      </View>
      <NavBar navigation={navigation} active={"order"} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 80,
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    color: "black",
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});
export default MakeOrderPage;
