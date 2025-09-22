import { useContext, useState, useEffect } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialsContext } from "../contexts/MaterialsContext";
import { useAuth } from "../contexts/AuthContext";
import MaterialCard from "../components/MaterialCard";
import ProtectedRoute from "../components/ProtectedRoute";
import { confirm } from "../utils/confirm";

export default function HomeScreen() {
  const { searchMaterials } = useContext(MaterialsContext);
  const { currentUser, logout, loading } = useAuth();
  const [query, setQuery] = useState("");
  const results = searchMaterials(query);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      console.log('User logged out, redirecting to welcome screen');
      router.replace('/welcome');
    }
  }, [currentUser, loading, router]);

  const handleLogout = async () => {
    const ok = await confirm({
      title: "Logout",
      message: "Are you sure you want to logout?",
      okText: "Logout",
      cancelText: "Cancel",
      destructive: true,
    });
    if (!ok) return;
    try {
      console.log('Logout button confirmed');
      await logout();
      console.log('Logout function completed');
      setTimeout(() => {
        console.log('Forcing redirect to welcome screen');
        router.replace('/welcome');
      }, 50);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!currentUser) {
    return null; // Will redirect to welcome screen
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.userText}>{currentUser?.displayName || currentUser?.email}</Text>
        </View>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => {
            console.log('Logout TouchableOpacity pressed');
            handleLogout();
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search problem or material..."
        style={styles.searchInput}
      />

      <View style={styles.buttonContainer}>
        <Button title="All" onPress={() => router.push("/materials")} />
        <Button title="Add" onPress={() => router.push("/materials/edit")} />
        <Button title="Feedbacks" onPress={() => router.push("/feedbacks")} />
      </View>

      <Text style={styles.sectionTitle}>Search results</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MaterialCard
            material={item}
            onPress={(m) => router.push({ pathname: "/materials/[id]", params: { id: m.id } })}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No results</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  userText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    marginVertical: 8,
    fontWeight: "600",
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    marginTop: 12,
    textAlign: 'center',
    color: '#666',
  },
});
