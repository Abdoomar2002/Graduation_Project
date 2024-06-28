import * as signalR from "@microsoft/signalr";
import * as Notifications from "expo-notifications";
import storageService from "../utils/storageService";
function GetNewOrder(dispatch, actions) {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://hatley.runasp.net/NotifyNewOrderForDelivery")
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection
    .start()
    .then(() => console.log("Connected to SignalR hub"))
    .catch((err) => console.error("Error while starting connection: " + err));

  connection.on("NotifyOrderForDeliveryHup", async (user, message) => {
    const Email = await storageService.get("Zone");
    if (Email == user.order_zone_from || Email == user.order_zone_to) {
      await schedulePushNotification(user);
      const offers = await storageService.get("Offer");
      const offersArray = offers != null ? JSON.parse(offers) : [];
      offersArray.push(user);
      await storageService.set("Offer", JSON.stringify(offersArray));
    }
    console.log(
      `User: ${JSON.stringify(user)}, Message: ${JSON.stringify(message)} `
    );
    console.log(user.order_zone_from, user.order_zone_to, Email);
    // Handle the received message
  });
  async function schedulePushNotification(delivery) {
    await dispatch(actions.displayRelatedOrders());
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "there is New Order",
        body: `from ${delivery.order_zone_from} to ${delivery.order_zone_to}`,
        data: {
          screen: "Notification",
        },
        launchImageName: "../assets/images/Logo.png",
      },
      trigger: { seconds: 2 },
    });
  }

  connection.onclose(async () => {
    console.log("Disconnected from SignalR hub");
    try {
      await connection.start();
      console.log("Reconnected to SignalR hub");
    } catch (err) {
      console.error("Error while reconnecting: " + err);
    }
  });

  return () => {
    connection.stop().then(() => console.log("Connection stopped"));
  };
}

export default GetNewOrder;
