import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Dashboard() {
  // ---------------------- STATES ----------------------
  const [mealInput, setMealInput] = useState("");
  const [mealSuggestion, setMealSuggestion] = useState("");
  const [plateSuggestion, setPlateSuggestion] = useState("");
  const [weeklyStats, setWeeklyStats] = useState({ good: 0, moderate: 0, bad: 0 });
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [symptomHistory, setSymptomHistory] = useState<any>({});
  const today = new Date().toLocaleDateString();

  // ---------------------- LOAD SYMPTOMS ----------------------
  useEffect(() => {
    loadSymptoms();
  }, []);

  const loadSymptoms = async () => {
    const saved = await AsyncStorage.getItem("symptomHistory");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSymptomHistory(parsed);
      if (parsed[today]) setSymptoms(parsed[today]);
    }
  };

  const toggleSymptom = async (item: string) => {
    const updated = symptoms.includes(item)
      ? symptoms.filter((s) => s !== item)
      : [...symptoms, item];

    const newHistory = { ...symptomHistory, [today]: updated };
    setSymptoms(updated);
    setSymptomHistory(newHistory);
    await AsyncStorage.setItem("symptomHistory", JSON.stringify(newHistory));
  };

  // ---------------------- MEAL ANALYZER ----------------------
  const analyzeMeal = () => {
    const text = mealInput.toLowerCase();
    const goodFoods = ["dal", "paneer", "curd", "sprouts", "eggs", "salad", "chicken"];
    const moderateFoods = ["rice", "poha", "upma", "idli", "dosa"];
    const badFoods = ["maggi", "pizza", "burger", "fries", "potato fry", "chips", "cake", "sweet", "chocolate", "ice cream"];

    let good: string[] = [];
    let moderate: string[] = [];
    let bad: string[] = [];

    goodFoods.forEach(f => text.includes(f) && good.push(f));
    moderateFoods.forEach(f => text.includes(f) && moderate.push(f));
    badFoods.forEach(f => text.includes(f) && bad.push(f));

    let result = "";
    if (good.length) result += `🟢 Good: ${good.join(", ")}\n`;
    if (moderate.length) result += `🟡 Moderate: ${moderate.join(", ")}\n`;
    if (bad.length) result += `🔴 Avoid: ${bad.join(", ")}\n`;
    if (!result) result = "Try adding protein (dal, eggs, paneer) and vegetables.";

    setMealSuggestion(result);

    setWeeklyStats({
      good: weeklyStats.good + good.length,
      moderate: weeklyStats.moderate + moderate.length,
      bad: weeklyStats.bad + bad.length,
    });
  };

  const buildPlate = () => {
    const text = mealInput.toLowerCase();
    let best: string[] = [];
    let avoid: string[] = [];
    if (text.includes("rice")) best.push("✔ Small portion rice");
    if (text.includes("dal") || text.includes("sambar")) best.push("✔ Dal / Sambar (protein)");
    if (text.includes("curd")) best.push("✔ Curd (gut health)");
    if (text.includes("salad")) best.push("✔ Salad (fiber)");
    if (text.includes("fried") || text.includes("potato")) avoid.push("✖ Fried potato");
    if (text.includes("maggi")) avoid.push("✖ Maggi (refined carbs)");

    setPlateSuggestion(`Best Plate:\n${best.join("\n")}\n\nAvoid:\n${avoid.join("\n")}`);
  };

  // ---------------------- SYMPTOMS LIST ----------------------
  const symptomOptions = ["Cramps", "Acne", "Bloating", "Mood Swings", "Headache", "Fatigue", "Cravings"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌸 Smart PCOD Dashboard</Text>

      {/* ------------------ WORKOUT BUTTON ------------------ */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/workouts")}>
        <Text style={styles.buttonText}>💪 Workouts</Text>
      </TouchableOpacity>

      {/* ------------------ AI COACH BUTTON ------------------ */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/coach")}>
        <Text style={styles.buttonText}>🤖 AI PCOD Coach</Text>
      </TouchableOpacity>

      {/* ------------------ MEAL ANALYZER ------------------ */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🍛 Meal Analyzer</Text>
        <TextInput
          placeholder="Enter today's meal"
          style={styles.input}
          value={mealInput}
          onChangeText={setMealInput}
        />
        <TouchableOpacity style={styles.button2} onPress={analyzeMeal}>
          <Text style={styles.buttonText}>Analyze Meal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={buildPlate}>
          <Text style={styles.buttonText}>Build Best Plate</Text>
        </TouchableOpacity>
        {mealSuggestion ? <Text style={styles.resultBox}>{mealSuggestion}</Text> : null}
        {plateSuggestion ? <Text style={styles.resultBox}>{plateSuggestion}</Text> : null}
      </View>

      {/* ------------------ SYMPTOM LOGGER ------------------ */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🤒 Symptom Logger</Text>
        <View style={styles.symptomRow}>
          {symptomOptions.map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.symptomBtn, symptoms.includes(s) && styles.symptomActive]}
              onPress={() => toggleSymptom(s)}
            >
              <Text style={{ color: symptoms.includes(s) ? "#fff" : "#000" }}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ------------------ WEEKLY TRACKER ------------------ */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📊 Weekly Food Tracker</Text>
        <Text>🟢 Friendly: {weeklyStats.good}</Text>
        <Text>🟡 Moderate: {weeklyStats.moderate}</Text>
        <Text>🔴 Avoid: {weeklyStats.bad}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#FCE4EC" },
  title: { fontSize: 24, fontWeight: "bold", color: "#AD1457", textAlign: "center", marginBottom: 16 },
  button: { backgroundColor: "#D81B60", padding: 14, borderRadius: 12, marginBottom: 12, alignItems: "center" },
  button2: { backgroundColor: "#6A1B9A", padding: 12, borderRadius: 10, alignItems: "center", marginVertical: 6 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 16, marginBottom: 12 },
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 10, marginBottom: 10 },
  resultBox: { backgroundColor: "#F8BBD0", padding: 10, borderRadius: 10, marginTop: 6 },
  symptomRow: { flexDirection: "row", flexWrap: "wrap" },
  symptomBtn: { padding: 10, borderRadius: 10, backgroundColor: "#fff", margin: 4 },
  symptomActive: { backgroundColor: "#AD1457" },
});