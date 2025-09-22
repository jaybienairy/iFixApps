import { Platform, Alert } from "react-native";

export const confirm = async ({ title = "", message = "", okText = "OK", cancelText = "Cancel", destructive = false } = {}) => {
  if (Platform.OS === "web") {
    const composed = [title, message].filter(Boolean).join("\n\n");
    return window.confirm(composed || "Are you sure?");
  }

  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        { text: cancelText, style: "cancel", onPress: () => resolve(false) },
        { text: okText, style: destructive ? "destructive" : "default", onPress: () => resolve(true) },
      ]
    );
  });
};


