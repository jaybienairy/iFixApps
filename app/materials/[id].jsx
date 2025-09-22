import { useContext, useMemo } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialsContext } from "../../contexts/MaterialsContext";
import Stepper from "../../components/Stepper";
import ProtectedRoute from "../../components/ProtectedRoute";
import { confirm } from "../../utils/confirm";

export default function MaterialDetailScreen() {
  const { id } = useLocalSearchParams();
  const { materials, deleteMaterial } = useContext(MaterialsContext);
  const router = useRouter();

  const material = useMemo(() => materials.find((m) => m.id === id), [materials, id]);
  if (!material) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Material not found.</Text>
      </View>
    );
  }

  const onDelete = async () => {
    const ok = await confirm({
      title: "Delete Material",
      message: "Are you sure you want to delete this material? This action cannot be undone.",
      okText: "Delete",
      cancelText: "Cancel",
      destructive: true,
    });
    if (!ok) return;

    try {
      console.log('Delete button confirmed for material:', id);
      const result = await deleteMaterial(id);
      console.log('Delete result:', result);
      if (result) {
        console.log('Navigating back to materials list');
        router.back();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <ProtectedRoute>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{material.title}</Text>
          {material.category && (
            <Text style={styles.category}>{material.category}</Text>
          )}
          {material.description && (
            <Text style={styles.description}>{material.description}</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title="Edit" 
            onPress={() => {
              console.log('Edit button pressed');
              router.push({ pathname: "/materials/edit", params: { id } });
            }} 
            color="#007AFF"
          />
          <Button 
            title="Delete" 
            onPress={() => {
              console.log('Delete button pressed - calling onDelete');
              onDelete();
            }} 
            color="#ff4444"
          />
        </View>

        <View style={styles.stepsSection}>
          <Text style={styles.sectionTitle}>Steps</Text>
          <Stepper steps={material.steps || []} />
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  stepsSection: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
});
