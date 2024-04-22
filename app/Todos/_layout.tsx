import { Stack, Tabs } from "expo-router";
import { Link, router } from "expo-router";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { logout } from "../../firebase/Auth";
export default function Layout() {
  const lout = async () => {
    try {
      await logout();
      alert("your signed out");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
        tabBarHideOnKeyboard: true,
        tabBarStyle: { backgroundColor: "#333" },
        headerStyle: { backgroundColor: "#333" , borderColor:"#333"},
        headerRight: () => (
          <Pressable
            style={{
              backgroundColor: "#333",
              paddingHorizontal: 10,
              paddingVertical: 10,
              marginRight: 15,
              borderRadius: 10,
            }}
            onPress={() => {
              router.push("/auth/login");
              lout();
            }}
          >
            <Text style={{ color: "#fff" }}>Sign UP</Text>
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
        }}
      />
    </Tabs>
  );
}
