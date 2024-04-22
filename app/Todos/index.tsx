import { Link } from "expo-router";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  addTodo,
  delTodo,
  getToDoForUser,
  getUser,
  updateToDo,
} from "../../firebase/Auth";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

export default function Page() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    init();
  }, []);


  const init = async () => {
    try {
      const user = await getUser();
      setUser(user);
      const todo = await getToDoForUser(user.uid);
      setTodos(todo);
    } catch (e) {
      console.log(e);
    }
  };
  const adduser = async () => {
    try {
      // const y = await addTodo(
      //   user.uid,
      //   "bbbbbbbbbbbbbbbbbbbbbb",
      //   "mathcccccccc"
      // );
      // console.log("ddddddddd",y)
      init();

      // const todo = todos[0]
      //  await updateToDo( todo.id,{...todo,name:"mmmmmmmmmmmmmmmm"})
      // todos.forEach(async (item) => {
      //   await delTodo(item.id);
      // });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={adduser}>
        <Text>sdfdgfh</Text>
      </Pressable>

      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#f1f1f1f1"
          animating={todos.length === 0}
        />
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <Pressable
              style={styles.btn}
              onPress={() => {
                delTodo(item.id);
                init();
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "white",
                }}
              >
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#111",
  },
  btn: {
    borderRadius: 10,
    width: 300,
    minHeight: 60,
    backgroundColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    padding: 10,
  },
});
