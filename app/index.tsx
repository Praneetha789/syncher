import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#D81B60" />
      <Text style={styles.text}>Loading Smart PCOD App...</Text>

      {/* Redirect to Dashboard */}
      <Redirect href="/dashboard" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCE4EC",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#AD1457",
    fontWeight: "600",
  },
});