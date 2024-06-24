import * as signalR from "@microsoft/signalr";
function GetNewOffer() {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://hatley.runasp.net/NotifyNewOfferForUser")
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection
    .start()
    .then(() => console.log("Connected to SignalR hub"))
    .catch((err) => console.error("Error while starting connection: " + err));

  connection.on("ReceiveMessage", (user, message) => {
    console.log(`User: ${user}, Message: ${message}`);
    // Handle the received message
  });

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
