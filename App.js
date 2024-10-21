  import { UserProvider } from "./src/contexts/UserContext";
  import { GestureHandlerRootView } from "react-native-gesture-handler";
  import AppNavigator from "./src/navigation/AppNavigator";

  export default function App() {
    return (
      <GestureHandlerRootView>
        <UserProvider>
          <AppNavigator />
        </UserProvider>
      </GestureHandlerRootView>
    );
  }
