import {
  Jost_400Regular,
  Jost_600SemiBold,
  useFonts,
} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { PlantProps } from "./src/libs/storage";
import Routes from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({ Jost_400Regular, Jost_600SemiBold });

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    const subscription = Notifications.addNotificationReceivedListener(
      async (notification) => {
        const data = notification.request.content.data.plant as PlantProps;
      }
    );

    return () => subscription.remove();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return <Routes />;
}
