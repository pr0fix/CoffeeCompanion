import { UserProvider } from "./src/contexts/UserContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
import { NotificationProvider } from "./src/contexts/NotificationContext";
import Notification from "./src/components/Notification/Notification";

export default function App() {
  return (
    <GestureHandlerRootView>
      <NotificationProvider>
        <UserProvider>
          <Notification />
          <AppNavigator />
        </UserProvider>
      </NotificationProvider>
    </GestureHandlerRootView>
  );
}
