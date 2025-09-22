import { useContext, useState } from "react";
import { View, TextInput, Button, FlatList, Text, Alert, StyleSheet } from "react-native";
import { MaterialsContext } from "../../contexts/MaterialsContext";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function FeedbackScreen() {
  const { feedbacks, addFeedback, deleteFeedback } = useContext(MaterialsContext);
  const [text, setText] = useState("");

  const submit = async () => {
    if (!text.trim()) return Alert.alert("Validation", "Feedback cannot be empty");
    await addFeedback(text.trim());
    setText("");
  };

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <View style={styles.inputSection}>
          <Text style={styles.label}>Share your feedback</Text>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Write your feedback here..."
            multiline
            style={styles.textInput}
          />
          <Button 
            title="Send Feedback" 
            onPress={submit} 
            color="#007AFF"
          />
        </View>

        <View style={styles.feedbackSection}>
          <Text style={styles.sectionTitle}>Previous Feedback</Text>
          <FlatList
            data={feedbacks}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <View style={styles.feedbackItem}>
                <Text style={styles.feedbackText}>{item.text}</Text>
                <Text style={styles.feedbackDate}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
                <Button 
                  title="Delete" 
                  onPress={() => deleteFeedback(item.id)} 
                  color="#ff4444"
                />
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No feedback yet. Be the first to share!</Text>
            }
          />
        </View>
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  inputSection: {
    backgroundColor: 'white',
    padding: 16,
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
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  feedbackSection: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
  },
  feedbackItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  feedbackText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  feedbackDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 32,
  },
});
