import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

const MATERIALS_KEY = "IFIX_MATERIALS_V1";
const FEEDBACKS_KEY = "IFIX_FEEDBACKS_V1";

export const MaterialsContext = createContext();

export const MaterialsProvider = ({ children }) => {
  const [materials, setMaterials] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    (async () => {
      const rawM = await AsyncStorage.getItem(MATERIALS_KEY);
      const rawF = await AsyncStorage.getItem(FEEDBACKS_KEY);
      setMaterials(rawM ? JSON.parse(rawM) : []);
      setFeedbacks(rawF ? JSON.parse(rawF) : []);
    })();
  }, []);

  const saveMaterials = async (arr) => {
    setMaterials(arr);
    await AsyncStorage.setItem(MATERIALS_KEY, JSON.stringify(arr));
  };

  const saveFeedbacks = async (arr) => {
    setFeedbacks(arr);
    await AsyncStorage.setItem(FEEDBACKS_KEY, JSON.stringify(arr));
  };

  const addMaterial = async (material) => {
    const newMaterial = { ...material, id: uuid.v4(), createdAt: Date.now() };
    await saveMaterials([newMaterial, ...materials]);
    return newMaterial;
  };

  const updateMaterial = async (id, patch) => {
    const updated = materials.map((m) =>
      m.id === id ? { ...m, ...patch, updatedAt: Date.now() } : m
    );
    await saveMaterials(updated);
  };

  const deleteMaterial = async (id) => {
    console.log('Deleting material with id:', id);
    console.log('Current materials count:', materials.length);
    
    try {
      // Use a more direct approach
      const updatedMaterials = materials.filter((m) => m.id !== id);
      
      console.log('Updated materials count:', updatedMaterials.length);
      
      // Update both state and storage
      setMaterials(updatedMaterials);
      await AsyncStorage.setItem(MATERIALS_KEY, JSON.stringify(updatedMaterials));
      
      console.log('Material deleted successfully and saved to storage');
      return true;
    } catch (error) {
      console.error('Error deleting material:', error);
      throw error;
    }
  };

  const addFeedback = async (text) => {
    const newFb = { id: uuid.v4(), text, createdAt: Date.now() };
    await saveFeedbacks([newFb, ...feedbacks]);
  };

  const deleteFeedback = async (id) => {
    await saveFeedbacks(feedbacks.filter((f) => f.id !== id));
  };

  const searchMaterials = (query) => {
    if (!query) return materials;
    const q = query.toLowerCase();
    return materials.filter(
      (m) =>
        (m.title || "").toLowerCase().includes(q) ||
        (m.description || "").toLowerCase().includes(q) ||
        (m.category || "").toLowerCase().includes(q) ||
        (m.steps || []).some(
          (s) =>
            (s.title || "").toLowerCase().includes(q) ||
            (s.content || "").toLowerCase().includes(q)
        )
    );
  };

  return (
    <MaterialsContext.Provider
      value={{
        materials,
        feedbacks,
        addMaterial,
        updateMaterial,
        deleteMaterial,
        addFeedback,
        deleteFeedback,
        searchMaterials,
      }}
    >
      {children}
    </MaterialsContext.Provider>
  );
};
