import { Link, router, Redirect } from "expo-router";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    // <Redirect href={'/auth/login'}/>
    <View style={styles.container}>
      <Text style={styles.title}>Get Started !</Text>
      <Pressable
        onPress={() => router.push("/auth/reg")}
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
      >
        <Text style={styles.link}> Create new Account , sign Up</Text>
      </Pressable>
      <Pressable
        onPress={() => router.navigate("/auth/login")}
        style={({ pressed }) => [{ opacity: pressed ? 0.2 : 1 }]}
      >
        <Text style={styles.link}>I have Account , sign in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
  },
  link: {
    fontSize: 22,
    backgroundColor: "#333",
    color: "#fff",
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
});
