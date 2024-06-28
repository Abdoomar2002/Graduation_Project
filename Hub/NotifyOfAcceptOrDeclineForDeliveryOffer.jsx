import * as signalR from "@microsoft/signalr";
import * as Notifications from "expo-notifications";

import storageService from "../utils/storageService";
function GetAcceptOrReject() {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(
      "https://hatley.runasp.net/NotifyOfAcceptOrDeclineForDeliveryOffer"
    )
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection
    .start()
    .then(() => console.log("Connected to SignalR hub"))
    .catch((err) => console.error("Error while starting connection: " + err));

  connection.on("NotifyOfAcceptOrDeclineForDeliveryOffer", async (...arg) => {
    const Email = await storageService.get("Email");
    if (Email == arg[6].email) {
      await schedulePushNotification(arg[0]);
      const offers = await storageService.get("Offer");
      const offersArray = offers != null ? JSON.parse(offers) : [];
      offersArray.push(arg[0]);
      await storageService.set("Offer", JSON.stringify(offersArray));
    }

    // Handle the received message
  });
  async function schedulePushNotification(delivery) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got New Offer",
        body: `on ${delivery}`,
        data: {
          screen: "Notification", // Add the target screen here
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

export default GetAcceptOrReject;
