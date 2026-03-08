import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account Created 💜");
      router.replace("/home"); // ✅ CORRECT
    } catch (error: any) {
      Alert.alert("Signup Error", error.message);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Welcome Back 💜");
      router.replace("/home"); // ✅ CORRECT
    } catch (error: any) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SyncHer 💜</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 10, backgroundColor: "#9370DB" }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#4B0082",
  },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#98FF98",
    padding: 16,
    borderRadius: 14,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});