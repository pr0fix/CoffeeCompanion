  import { AuthProvider } from "./src/contexts/AuthContext";
  import { GestureHandlerRootView } from "react-native-gesture-handler";
  import AppNavigator from "./src/navigation/AppNavigator";

  export default function App() {
    return (
      <GestureHandlerRootView>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </GestureHandlerRootView>
    );
  }
