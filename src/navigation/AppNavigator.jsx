import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/SignInScreen";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import Icon from "react-native-vector-icons/Ionicons";
import UserProfileScreen from "../screens/UserProfileScreen";
import { useUser } from "../contexts/UserContext";
import EditProfileScreen from "../screens/EditProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Navigation stack for profile and edit profile screens
const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Stack.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
    </Stack.Navigator>
  );
};

// Navigation stack for sign in and sign up screens
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Sign In"
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Stack.Screen
        name="Sign In"
        component={SignInScreen}
        options={{ title: "Sign In" }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{ title: "Sign Up" }}
      />
    </Stack.Navigator>
  );
};

// Main bottom tabs navigator
const AppNavigator = () => {
  const { user, loading } = useUser();

  if (loading) return null;

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        {user ? (
          <>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="home-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="ProfileStack"
              component={ProfileStack}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="person" color={color} size={size} />
                ),
                headerShown: false,
                title: "Profile",
              }}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="home-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Auth"
              component={AuthStack}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="log-in-outline" color={color} size={size} />
                ),
                headerShown: false,
                title: "Sign In",
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
