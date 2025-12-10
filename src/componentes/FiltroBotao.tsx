import { TouchableOpacity, Text, StyleSheet } from "react-native";

type FiltroBotaoProps = {
  type: string;
  active: boolean;
  onPress: () => void;
};

export default function FiltroBotao({ type, active, onPress }: FiltroBotaoProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, active && styles.active]}
    >
      <Text style={styles.text}>{active ? `${type} ×` : type}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#333",
  },
  active: { backgroundColor: "#555" },
  text: { color: "white", fontWeight: "bold" },
});
