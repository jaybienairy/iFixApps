import { useContext } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MaterialsContext } from "../../contexts/MaterialsContext";
import MaterialCard from "../../components/MaterialCard";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function MaterialListScreen() {
  const { materials } = useContext(MaterialsContext);
  const router = useRouter();

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>All Materials</Text>
          <Text style={styles.subtitle}>{materials.length} material{materials.length !== 1 ? 's' : ''}</Text>
        </View>
        <FlatList
          data={materials}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MaterialCard
              material={item}
              onPress={(m) =>
                router.push({ pathname: "/materials/[id]", params: { id: m.id } })
              }
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No materials yet</Text>
              <Text style={styles.emptySubtext}>Add your first material from the home screen</Text>
            </View>
          }
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
