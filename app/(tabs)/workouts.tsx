import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Workouts() {
  const [phase, setPhase] = useState("");
  const [energy, setEnergy] = useState<"low" | "medium" | "high">("medium");
  const [streak, setStreak] = useState(0);

  const workouts = {
    Menstrual: ["Gentle Yoga", "Meditation", "Stretching"],
    Follicular: ["Strength Training", "Light Cardio", "Pilates"],
    Ovulatory: ["HIIT", "Dance Fitness", "Strength Training"],
    Luteal: ["Yoga Flow", "Light Cardio", "Core Exercises"],
  };

  const motivationalQuotes = [
    "Strong today, balanced tomorrow 💪",
    "Consistency is your superpower 🌸",
    "Small steps every day lead to big changes 🌱",
    "Your body, your rhythm, your power 🌷",
  ];

  useEffect(() => {
    getCyclePhase();
    loadStreak();
  }, []);

  const getCyclePhase = async () => {
    const saved = await AsyncStorage.getItem("periodData");
    if (!saved) return;
    const { lastPeriod, cycleLength } = JSON.parse(saved);
    if (!lastPeriod || !cycleLength) return;

    const start = new Date(lastPeriod);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const dayOfCycle = (diffDays % parseInt(cycleLength)) + 1;

    if (dayOfCycle <= 5) setPhase("Menstrual");
    else if (dayOfCycle <= 13) setPhase("Follicular");
    else if (dayOfCycle === 14) setPhase("Ovulatory");
    else setPhase("Luteal");
  };

  const loadStreak = async () => {
    const saved = await AsyncStorage.getItem("workoutStreak");
    if (saved) setStreak(parseInt(saved));
  };

  const completeWorkout = async () => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    await AsyncStorage.setItem("workoutStreak", newStreak.toString());
    alert("🎉 Workout completed! Keep going!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🏋️ Today’s Workout</Text>
      <Text style={styles.phaseText}>Cycle Phase: {phase || "Loading..."}</Text>

      <Text style={styles.subtitle}>Your Energy Level</Text>
      <View style={styles.energyRow}>
        {["low", "medium", "high"].map((lvl) => (
          <TouchableOpacity
            key={lvl}
            style={[styles.energyBtn, energy === lvl && styles.activeEnergy]}
            onPress={() => setEnergy(lvl as "low" | "medium" | "high")}
          >
            <Text style={styles.energyText}>{lvl.charAt(0).toUpperCase() + lvl.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>Recommended Workouts</Text>
      {phase &&
        workouts[phase].map((w) => (
          <View key={w} style={styles.workoutCard}>
            <Text style={styles.workoutName}>{w}</Text>
            <TouchableOpacity style={styles.completeBtn} onPress={completeWorkout}>
              <Text style={styles.completeText}>✔ Complete</Text>
            </TouchableOpacity>
          </View>
        ))}

      <View style={styles.streakBox}>
        <Text style={styles.streakText}>🔥 Weekly Streak: {streak} days</Text>
      </View>

      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>
          {motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FCE4EC",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#AD1457",
    marginBottom: 10,
    textAlign: "center",
  },
  phaseText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
  },
  energyRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  energyBtn: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    width: 90,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeEnergy: {
    backgroundColor: "#AD1457",
  },
  energyText: {
    color: "#000",
    fontWeight: "bold",
  },
  workoutCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  completeBtn: {
    backgroundColor: "#D81B60",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  completeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  streakBox: {
    backgroundColor: "#F8BBD0",
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  streakText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quoteBox: {
    marginTop: 15,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#F3E5F5",
  },
  quoteText: {
    fontStyle: "italic",
    textAlign: "center",
    fontSize: 15,
  },
});