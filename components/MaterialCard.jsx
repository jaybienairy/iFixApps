import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MaterialCard({ material, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(material)}>
      <Text style={styles.title}>{material.title}</Text>
      {material.category && (
        <Text style={styles.category}>{material.category}</Text>
      )}
      {material.description && (
        <Text style={styles.description} numberOfLines={2}>
          {material.description}
        </Text>
      )}
      {material.steps && material.steps.length > 0 && (
        <Text style={styles.stepsCount}>
          {material.steps.length} step{material.steps.length !== 1 ? 's' : ''}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  stepsCount: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});