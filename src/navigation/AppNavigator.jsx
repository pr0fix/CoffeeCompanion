import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import SignInScreen from "../screens/SignInScreen";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import { useUser } from "../contexts/UserContext";
import ShopDetailsScreen from "../screens/ShopDetailsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Navigation stack for profile and edit profile screens
const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#F4ECE3",
        },
        headerTintColor: "#6F3E37",
        headerTitleStyle: {
          fontWeight: "bold",
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
        headerShown: false,
      }}
    >
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#F4ECE3",
        },
        headerTintColor: "#6F3E37",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="ShopDetails"
        component={ShopDetailsScreen}
        options={{ title: "Shop Details" }}
      />
    </Stack.Navigator>
  );
};

// Main bottom tabs navigator for authenticated users
const AppTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "HomeStack") {
            iconName = "home-outline";
          } else if (route.name === "ProfileStack") {
            iconName = "person-outline";
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: "#6F3E37",
        tabBarInactiveTintColor: "#B3A394",
        tabBarStyle: {
          backgroundColor: "#F4ECE3",
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: "#F4ECE3",
        },
        headerTintColor: "#6F3E37",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ title: "Home", headerShown:false }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
          title: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

// Main app navigator with conditional navigation container
const AppNavigator = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
