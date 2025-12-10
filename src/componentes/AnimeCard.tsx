import { TouchableOpacity, Image, Text, View, StyleSheet } from "react-native";

type AnimeCardProps = {
  anime: {
    mal_id: number;
    title: string;
    episodes?: number;
    score?: number;
    year?: number;
    images: {
      jpg: {
        image_url: string;
      };
    };
  };
  onPress: () => void;
};

export default function AnimeCard({ anime, onPress }: AnimeCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: anime.images.jpg.image_url }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{anime.title}</Text>
        <Text style={styles.text}>📺 Episódios: {anime.episodes || "N/A"}</Text>
        <Text style={styles.text}>⭐ Nota: {anime.score || "N/A"}</Text>
        <Text style={styles.text}>📅 Ano: {anime.year || "?"}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1b1b1b",
    marginBottom: 12,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: { width: 90, height: 130 },
  info: { padding: 10, flex: 1 },
  title: { color: "white", fontSize: 16, fontWeight: "bold" },
  text: { color: "#ccc", marginTop: 4 },
});
