import { useContext, useEffect, useState } from "react";
import { View, TextInput, Button, ScrollView, Text, Alert, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialsContext } from "../../contexts/MaterialsContext";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function AddEditMaterialScreen() {
  const { id } = useLocalSearchParams();
  const { materials, addMaterial, updateMaterial } = useContext(MaterialsContext);
  const router = useRouter();

  const existing = materials.find((m) => m.id === id);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (existing) {
      setTitle(existing.title || "");
      setCategory(existing.category || "");
      setDescription(existing.description || "");
      setSteps(existing.steps || []);
    }
  }, [existing]);

  const addStep = () =>
    setSteps([...steps, { id: Date.now().toString(), title: "", content: "" }]);
  const updateStep = (idx, patch) =>
    setSteps(steps.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  const removeStep = (idx) => setSteps(steps.filter((_, i) => i !== idx));

  const onSave = async () => {
    if (!title.trim()) return Alert.alert("Validation", "Title required");
    const payload = { title, category, description, steps };
    if (existing) {
      await updateMaterial(existing.id, payload);
      router.replace({ pathname: "/materials/[id]", params: { id: existing.id } });
    } else {
      const newM = await addMaterial(payload);
      router.replace({ pathname: "/materials/[id]", params: { id: newM.id } });
    }
  };

  return (
    <ProtectedRoute>
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title *</Text>
          <TextInput 
            value={title} 
            onChangeText={setTitle} 
            placeholder="Enter material title" 
            style={styles.input} 
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category</Text>
          <TextInput 
            value={category} 
            onChangeText={setCategory} 
            placeholder="Enter category" 
            style={styles.input} 
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput 
            value={description} 
            onChangeText={setDescription} 
            placeholder="Enter description" 
            multiline 
            style={[styles.input, styles.textArea]} 
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Steps</Text>
          {steps.map((s, idx) => (
            <View key={s.id} style={styles.stepContainer}>
              <Text style={styles.stepNumber}>Step {idx + 1}</Text>
              <TextInput 
                placeholder="Step title" 
                value={s.title} 
                onChangeText={(t) => updateStep(idx, { title: t })} 
                style={styles.input} 
              />
              <TextInput 
                placeholder="Step content" 
                value={s.content} 
                onChangeText={(t) => updateStep(idx, { content: t })} 
                multiline 
                style={[styles.input, styles.stepContent]} 
              />
              <Button 
                title="Remove step" 
                onPress={() => removeStep(idx)} 
                color="#ff4444"
              />
            </View>
          ))}
          <Button 
            title="Add step" 
            onPress={addStep} 
            color="#007AFF"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title={existing ? "Update Material" : "Create Material"} 
            onPress={onSave} 
            color="#007AFF"
          />
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  sectionContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
  },
  stepContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  stepContent: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
});
