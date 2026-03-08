import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LifestyleScreen() {
  const [mode, setMode] = useState("home");
  const [mealInput, setMealInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [plateSuggestion, setPlateSuggestion] = useState("");

  const [weeklyStats, setWeeklyStats] = useState({
    good: 0,
    moderate: 0,
    bad: 0,
  });

  const analyzeMeal = () => {
    const text = mealInput.toLowerCase();

    const goodFoods = [
      "dal",
      "paneer",
      "curd",
      "sprouts",
      "eggs",
      "salad",
      "chicken",
    ];

    const moderateFoods = ["rice", "poha", "upma", "idli", "dosa"];

    const badFoods = [
      "maggi",
      "pizza",
      "burger",
      "fries",
      "potato fry",
      "chips",
    ];

    const sugarFoods = ["cake", "sweet", "chocolate", "ice cream"];

    let good = [];
    let moderate = [];
    let bad = [];

    goodFoods.forEach((food) => {
      if (text.includes(food)) good.push(food);
    });

    moderateFoods.forEach((food) => {
      if (text.includes(food)) moderate.push(food);
    });

    badFoods.forEach((food) => {
      if (text.includes(food)) bad.push(food);
    });

    sugarFoods.forEach((food) => {
      if (text.includes(food)) bad.push(food);
    });

    let result = "";

    if (good.length > 0) result += `🟢 Good: ${good.join(", ")}\n`;
    if (moderate.length > 0) result += `🟡 Moderate: ${moderate.join(", ")}\n`;
    if (bad.length > 0) result += `🔴 Avoid: ${bad.join(", ")}\n`;

    if (result === "") {
      result = "Try adding protein (dal, eggs, paneer) and vegetables.";
    }

    setSuggestion(result);

    setWeeklyStats({
      good: weeklyStats.good + good.length,
      moderate: weeklyStats.moderate + moderate.length,
      bad: weeklyStats.bad + bad.length,
    });
  };

  const buildPlate = () => {
    const text = mealInput.toLowerCase();

    let best = [];
    let avoid = [];

    if (text.includes("rice")) best.push("✔ Small portion rice");
    if (text.includes("dal") || text.includes("sambar"))
      best.push("✔ Dal / Sambar (protein)");
    if (text.includes("curd")) best.push("✔ Curd (gut health)");
    if (text.includes("salad")) best.push("✔ Salad (fiber)");

    if (text.includes("fried") || text.includes("potato"))
      avoid.push("✖ Fried potato");
    if (text.includes("maggi")) avoid.push("✖ Maggi (refined carbs)");

    setPlateSuggestion(
      `Best Plate:\n${best.join("\n")}\n\nAvoid:\n${avoid.join("\n")}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>PCOD Lifestyle</Text>

      {/* Hormone Score Feature */}
      <TouchableOpacity
        style={styles.hormoneCard}
        onPress={() => router.push("/hormone-score")}
      >
        <Text style={styles.hormoneTitle}>⚖ Hormone Balance Score</Text>
        <Text style={styles.hormoneDesc}>
          Check your daily hormone health based on sleep, diet, water and
          protein intake.
        </Text>
      </TouchableOpacity>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, mode === "home" && styles.activeTab]}
          onPress={() => setMode("home")}
        >
          <Text style={styles.tabText}>🏠 Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, mode === "hostel" && styles.activeTab]}
          onPress={() => setMode("hostel")}
        >
          <Text style={styles.tabText}>🏫 Hostel</Text>
        </TouchableOpacity>
      </View>

      {/* HOME MODE */}
      {mode === "home" && (
        <>
          <Text style={styles.sectionTitle}>🌅 Breakfast</Text>

          <View style={styles.mealCard}>
            <Text style={styles.mealName}>Moong Dal Chilla</Text>
            <Text style={styles.tag}>Protein Rich • Low GI</Text>
          </View>

          <View style={styles.mealCard}>
            <Text style={styles.mealName}>Vegetable Upma</Text>
            <Text style={styles.tag}>High Fiber</Text>
          </View>

          <View style={styles.mealCard}>
            <Text style={styles.mealName}>Oats with Nuts</Text>
            <Text style={styles.tag}>High Fiber • Low GI</Text>
          </View>

          <Text style={styles.sectionTitle}>🍛 Lunch</Text>

          <View style={styles.mealCard}>
            <Text style={styles.mealName}>Multigrain Roti + Sabzi</Text>
            <Text style={styles.tag}>Balanced Meal</Text>
          </View>

          <View style={styles.mealCard}>
            <Text style={styles.mealName}>Brown Rice + Dal</Text>
            <Text style={styles.tag}>Protein Rich</Text>
          </View>

          <Text style={styles.sectionTitle}>🌙 Dinner</Text>

          <View style={styles.mealCard}>
            <Text style={styles.mealName}>Vegetable Soup</Text>
            <Text style={styles.tag}>Low GI • Light Meal</Text>
          </View>

          <View style={styles.mealCard}>
            <Text style={styles.mealName}>Paneer + Salad</Text>
            <Text style={styles.tag}>Protein Rich</Text>
          </View>
        </>
      )}

      {/* HOSTEL MODE */}
      {mode === "hostel" && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Mess Menu of the Day</Text>

          <TextInput
            placeholder="Example: Rice, Dal, Potato Fry, Curd"
            style={styles.input}
            value={mealInput}
            onChangeText={setMealInput}
          />

          <TouchableOpacity style={styles.button} onPress={analyzeMeal}>
            <Text style={styles.buttonText}>Analyze Meal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button2} onPress={buildPlate}>
            <Text style={styles.buttonText}>Build Best Plate</Text>
          </TouchableOpacity>

          {suggestion !== "" && (
            <View style={styles.resultBox}>
              <Text>{suggestion}</Text>
            </View>
          )}

          {plateSuggestion !== "" && (
            <View style={styles.resultBox}>
              <Text>{plateSuggestion}</Text>
            </View>
          )}

          <View style={styles.tracker}>
            <Text style={styles.sectionTitle}>Weekly Food Tracker</Text>
            <Text>🟢 Friendly: {weeklyStats.good}</Text>
            <Text>🟡 Moderate: {weeklyStats.moderate}</Text>
            <Text>🔴 Avoid: {weeklyStats.bad}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FCE4EC",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#AD1457",
  },

  hormoneCard: {
    backgroundColor: "#FFF3E0",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },

  hormoneTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  hormoneDesc: {
    fontSize: 14,
    color: "#555",
  },

  tabRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },

  tab: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 20,
    marginHorizontal: 10,
  },

  activeTab: {
    backgroundColor: "#AD1457",
  },

  tabText: {
    fontWeight: "bold",
  },

  sectionTitle: {
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    fontSize: 16,
  },

  mealCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  mealName: {
    fontWeight: "bold",
    fontSize: 15,
  },

  tag: {
    color: "#2E7D32",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#D81B60",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  button2: {
    backgroundColor: "#6A1B9A",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  resultBox: {
    backgroundColor: "#F8BBD0",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  tracker: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#F3E5F5",
    borderRadius: 12,
  },
});