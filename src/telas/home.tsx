import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Image,
} from "react-native";
import useBuscador from "../hooks/useBuscador";
import AnimeCard from "../componentes/AnimeCard";
import FiltroBotao from "../componentes/FiltroBotao";

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedAnime, setSelectedAnime] = useState<any>(null);

  const {
    loading,
    results,
    types,
    activeFilters,
    toggleFilter,
    searchAnime,
    filteredResults,
  } = useBuscador();

  return (
    <View style={styles.container}>
      {/* TÍTULO */}
      <Text style={styles.title}>Buscador de Animes</Text>

      {/* INPUT */}
      <View style={styles.searchRow}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Digite o nome do anime..."
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => searchAnime(query)}
        >
          <Text style={{ color: "white", fontSize: 20 }}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* FILTROS */}
      <View style={styles.filterRow}>
        {types.map((t) => (
          <FiltroBotao
            key={t}
            type={t}
            active={activeFilters.includes(t)}
            onPress={() => toggleFilter(t)}
          />
        ))}
      </View>

      {/* RESULTADOS */}
      {loading ? (
        <Text style={styles.loading}>Carregando...</Text>
      ) : (
        <FlatList
          data={filteredResults}
          keyExtractor={(item) => item.mal_id.toString()}
          renderItem={({ item }) => (
            <AnimeCard
              anime={item}
              onPress={() => setSelectedAnime(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
      )}

      {/* MODAL */}
      <Modal visible={!!selectedAnime} animationType="fade" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            {selectedAnime && (
              <>
                <Image
                  source={{ uri: selectedAnime.images.jpg.image_url }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{selectedAnime.title}</Text>

                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setSelectedAnime(null)}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Fechar
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 16 },
  title: { color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  searchRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  input: {
    flex: 1,
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 8,
    color: "white",
  },
  searchButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 16,
  },
  loading: { color: "white", fontSize: 18, textAlign: "center", marginTop: 20 },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalImage: { width: 150, height: 220, borderRadius: 8 },
  modalTitle: { color: "white", marginTop: 10, fontSize: 20 },
  closeBtn: {
    marginTop: 20,
    backgroundColor: "#444",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
