import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
  const [name, setName] = useState("");
  const [mood, setMood] = useState("😊");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const savedName = await AsyncStorage.getItem("username");
    if (savedName) setName(savedName);
  };

  const moodOptions = ["😊", "😔", "😡", "😴", "😍"];

  return (
    <ScrollView style={styles.container}>
      {/* Greeting */}
      <Text style={styles.greeting}>Hi {name} 💜</Text>

      {/* Mood Selector */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>How are you feeling today?</Text>
        <View style={styles.moodRow}>
          {moodOptions.map((m, i) => (
            <TouchableOpacity key={i} onPress={() => setMood(m)}>
              <Text style={styles.mood}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.selectedMood}>Selected: {mood}</Text>
      </View>

      {/* Hormone Balance Chart */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hormone Balance Overview</Text>
        <LineChart
          data={{
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [
              {
                data: [3, 4, 2, 5],
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(106, 90, 205, ${opacity})`,
            labelColor: () => "#333",
          }}
          style={{
            borderRadius: 16,
          }}
        />
      </View>

      {/* Quick Action Cards */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/lifestyle")}
        >
          <Text style={styles.actionText}>Lifestyle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/workouts")}
        >
          <Text style={styles.actionText}>Workouts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/symptoms")}
        >
          <Text style={styles.actionText}>Symptoms</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/hormone-score")}
        >
          <Text style={styles.actionText}>Hormone Score</Text>
        </TouchableOpacity>
      </View>

      {/* Motivation Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Motivation 🌸</Text>
        <Text style={styles.motivation}>
          “Your body is not against you. It’s communicating with you.”
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCE4EC",
    padding: 20,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#AD1457",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  mood: {
    fontSize: 28,
  },
  selectedMood: {
    textAlign: "center",
    marginTop: 10,
    color: "#AD1457",
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#D81B60",
    width: "48%",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  motivation: {
    fontSize: 16,
    textAlign: "center",
    color: "#444",
  },
});