import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Stepper({ steps = [] }) {
  const [index, setIndex] = useState(0);
  
  if (!steps.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No steps available.</Text>
      </View>
    );
  }

  const step = steps[index];
  return (
    <View style={styles.wrap}>
      <Text style={styles.counter}>
        Step {index + 1} / {steps.length}
      </Text>
      <Text style={styles.title}>{step.title}</Text>
      <Text style={styles.content}>{step.content}</Text>

      <View style={styles.buttons}>
        <Button
          title="Prev"
          onPress={() => setIndex(Math.max(0, index - 1))}
          disabled={index === 0}
        />
        <Button
          title="Next"
          onPress={() => setIndex(Math.min(steps.length - 1, index + 1))}
          disabled={index === steps.length - 1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { 
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  counter: { 
    fontSize: 12, 
    color: "#666",
    marginBottom: 8,
  },
  title: { 
    fontSize: 18, 
    fontWeight: "700", 
    marginBottom: 12,
    color: '#333',
  },
  content: { 
    fontSize: 14, 
    marginBottom: 16,
    color: '#666',
    lineHeight: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});
