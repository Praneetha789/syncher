
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Coach() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 AI PCOD Coach</Text>

      <Text style={styles.text}>
        Welcome to your PCOD AI Coach.
      </Text>

      <Text style={styles.text}>
        Here you will get:
      </Text>

      <Text style={styles.list}>• Diet suggestions</Text>
      <Text style={styles.list}>• Symptom guidance</Text>
      <Text style={styles.list}>• Workout tips</Text>
      <Text style={styles.list}>• Lifestyle advice</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCE4EC",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#AD1457",
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
    marginBottom: 10,
  },

  list: {
    fontSize: 16,
    marginVertical: 4,
  },
});