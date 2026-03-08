import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function HormoneScore() {

  const [water, setWater] = useState("");
  const [protein, setProtein] = useState("");
  const [sleep, setSleep] = useState("");
  const [exercise, setExercise] = useState("");

  const [score, setScore] = useState(null);
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("#fff");

  const calculateScore = () => {

    let total = 0;

    const waterScore = Math.min(parseInt(water) || 0, 8) * 5;
    const proteinScore = Math.min(parseInt(protein) || 0, 3) * 10;
    const sleepScore = Math.min(parseInt(sleep) || 0, 8) * 5;
    const exerciseScore = Math.min(parseInt(exercise) || 0, 60) * 0.5;

    total = waterScore + proteinScore + sleepScore + exerciseScore;

    if (total > 100) total = 100;

    const finalScore = Math.round(total);

    setScore(finalScore);

    // Hormone indicator
    if (finalScore >= 80) {
      setStatus("🟩 Balanced Hormones");
      setColor("#4CAF50");
    } else if (finalScore >= 50) {
      setStatus("🟨 Moderate Balance");
      setColor("#FFC107");
    } else {
      setStatus("🟥 Hormone Imbalance");
      setColor("#F44336");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Hormone Balance Score</Text>

      <TextInput
        placeholder="Water glasses (0-8)"
        keyboardType="numeric"
        value={water}
        onChangeText={setWater}
        style={styles.input}
      />

      <TextInput
        placeholder="Protein meals (0-3)"
        keyboardType="numeric"
        value={protein}
        onChangeText={setProtein}
        style={styles.input}
      />

      <TextInput
        placeholder="Sleep hours"
        keyboardType="numeric"
        value={sleep}
        onChangeText={setSleep}
        style={styles.input}
      />

      <TextInput
        placeholder="Exercise minutes"
        keyboardType="numeric"
        value={exercise}
        onChangeText={setExercise}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={calculateScore}>
        <Text style={styles.buttonText}>Calculate Score</Text>
      </TouchableOpacity>

      {score !== null && (
        <View style={[styles.scoreCard, { borderColor: color }]}>
          <Text style={styles.scoreTitle}>Your Hormone Score</Text>
          <Text style={[styles.score, { color: color }]}>{score} / 100</Text>
          <Text style={[styles.status, { color: color }]}>{status}</Text>
        </View>
      )}

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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
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

  scoreCard: {
    marginTop: 25,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 3,
  },

  scoreTitle: {
    fontSize: 18,
    marginBottom: 10,
  },

  score: {
    fontSize: 34,
    fontWeight: "bold",
  },

  status: {
    fontSize: 16,
    marginTop: 5,
  },

});