import * as signalR from "@microsoft/signalr";
import * as Notifications from "expo-notifications";

import storageService from "../utils/storageService";
function GetNewOffer() {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://hatley.runasp.net/NotifyNewOfferForUser")
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection
    .start()
    .then(() => console.log("Connected to SignalR hub"))
    .catch((err) => console.error("Error while starting connection: " + err));

  connection.on("NotifyNewOfferForUser", async (user, message) => {
    const Email = await storageService.get("Email");
    if (Email == message.email) {
      await schedulePushNotification(user);
      const offers = await storageService.get("Offer");
      const offersArray = offers != null ? JSON.parse(offers) : [];
      offersArray.push(user);
      await storageService.set("Offer", JSON.stringify(offersArray));
    }
    console.log(
      `User: ${JSON.stringify(user)}, Message: ${JSON.stringify(message)} `
    );
    console.log(message.email, Email);
    // Handle the received message
  });
  async function schedulePushNotification(delivery) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got New Offer",
        body: `on ${delivery.offer_value}`,
        data: {
          screen: "Notification", // Add the target screen here
          params: {
            delivery_avg_rate: delivery.delivery_avg_rate,
            delivery_count_rate: delivery.delivery_count_rate,
          },
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

export default GetNewOffer;
