import * as Linking from "expo-linking";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function FindDoctors() {
  const [place, setPlace] = useState("");

  const searchDoctors = async () => {
    if (!place.trim()) {
      Alert.alert("Please enter a city");
      return;
    }

    const url = `https://www.google.com/maps/search/gynecologist+near+${encodeURIComponent(
      place
    )}`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Cannot open Google Maps");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Gynecologists 🏥</Text>

      <TextInput
        placeholder="Enter city (e.g. Mangalore)"
        value={place}
        onChangeText={setPlace}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={searchDoctors}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCE4EC",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#6A5ACD",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});