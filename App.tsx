import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import Home from "./src/telas/home";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }}>
      <StatusBar style="light" />
      <Home />
    </SafeAreaView>
  );
}
