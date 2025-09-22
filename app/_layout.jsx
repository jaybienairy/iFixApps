import { Stack } from "expo-router";
import { MaterialsProvider } from "../contexts/MaterialsContext";
import { AuthProvider } from "../contexts/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <MaterialsProvider>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{ 
              title: "My Goals",
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="welcome" 
            options={{ 
              title: "Welcome",
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="auth/login" 
            options={{ 
              title: "Sign In",
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="auth/signup" 
            options={{ 
              title: "Sign Up",
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="materials/index" 
            options={{ title: "All Materials" }} 
          />
          <Stack.Screen 
            name="materials/edit" 
            options={{ title: "Add/Edit Material" }} 
          />
          <Stack.Screen 
            name="materials/[id]" 
            options={{ title: "Material Details" }} 
          />
          <Stack.Screen 
            name="feedbacks/index" 
            options={{ title: "Feedbacks" }} 
          />
        </Stack>
      </MaterialsProvider>
    </AuthProvider>
  );
}
