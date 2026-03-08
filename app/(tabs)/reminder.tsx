import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

type Medicine = {
  name: string;
  time: string;
  enabled: boolean;
};

export default function Reminder() {

  const [waterEnabled, setWaterEnabled] = useState(false);
  const [waterInterval, setWaterInterval] = useState("");

  const [medicineName, setMedicineName] = useState("");
  const [medicineTime, setMedicineTime] = useState("");

  const [medicineList, setMedicineList] = useState<Medicine[]>([]);

  const addMedicine = () => {

    if (medicineName.trim() === "" || medicineTime.trim() === "") {
      Alert.alert("Missing Info", "Please enter medicine name and time");
      return;
    }

    const newMedicine: Medicine = {
      name: medicineName,
      time: medicineTime,
      enabled: true,
    };

    setMedicineList([...medicineList, newMedicine]);

    setMedicineName("");
    setMedicineTime("");
  };

  const toggleMedicine = (index: number) => {
    const updated = [...medicineList];
    updated[index].enabled = !updated[index].enabled;
    setMedicineList(updated);
  };

  const deleteMedicine = (index: number) => {
    const updated = medicineList.filter((_, i) => i !== index);
    setMedicineList(updated);
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Reminder Center</Text>

      {/* WATER REMINDER */}

      <View
        style={[
          styles.card,
          waterEnabled ? styles.activeCard : styles.inactiveCard
        ]}
      >

        <Text style={styles.cardTitle}>💧 Water Reminder</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Enable Reminder</Text>

          <Switch
            value={waterEnabled}
            onValueChange={setWaterEnabled}
          />
        </View>

        {waterEnabled && (
          <View style={styles.presetRow}>

            <TouchableOpacity
              style={[
                styles.presetButton,
                waterInterval === "Every 2 hours" && styles.selectedPreset
              ]}
              onPress={() => setWaterInterval("Every 2 hours")}
            >
              <Text style={styles.presetText}>2 Hours</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.presetButton,
                waterInterval === "Every 3 hours" && styles.selectedPreset
              ]}
              onPress={() => setWaterInterval("Every 3 hours")}
            >
              <Text style={styles.presetText}>3 Hours</Text>
            </TouchableOpacity>

          </View>
        )}

        {waterInterval !== "" && (
          <Text style={styles.preview}>
            🔔 Reminder set: {waterInterval}
          </Text>
        )}

        {waterEnabled && (
          <Text style={styles.progress}>
            💧 Hydration goal: 0 / 8 glasses today
          </Text>
        )}

      </View>


      {/* MEDICINE REMINDER */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>💊 Medicine Reminder</Text>

        <TextInput
          placeholder="Medicine Name"
          placeholderTextColor="#ccc"
          value={medicineName}
          onChangeText={setMedicineName}
          style={styles.input}
        />

        <TextInput
          placeholder="Time (ex: 09:00 PM)"
          placeholderTextColor="#ccc"
          value={medicineTime}
          onChangeText={setMedicineTime}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addMedicine}
        >
          <Text style={styles.addText}>+ Add Reminder</Text>
        </TouchableOpacity>

        {medicineList.map((item, index) => (

          <View
            key={index}
            style={[
              styles.medicineItem,
              item.enabled ? styles.activeMedicine : styles.inactiveMedicine
            ]}
          >

            <View>
              <Text style={styles.medText}>
                💊 {item.name}
              </Text>

              <Text style={styles.timeText}>
                ⏰ {item.time}
              </Text>
            </View>

            <View style={styles.row}>

              <Switch
                value={item.enabled}
                onValueChange={() => toggleMedicine(index)}
              />

              <TouchableOpacity
                onPress={() => deleteMedicine(index)}
              >
                <Text style={styles.delete}>❌</Text>
              </TouchableOpacity>

            </View>

          </View>

        ))}

      </View>


      {/* MOTIVATION */}

      <View style={styles.motivationCard}>
        <Text style={styles.motivationText}>
          🌟 Great job taking care of your health today!
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#2B0057",
    padding: 20
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },

  card: {
    backgroundColor: "#3D0075",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20
  },

  activeCard: {
    borderColor: "#5CFF8F",
    borderWidth: 2
  },

  inactiveCard: {
    borderColor: "#555",
    borderWidth: 1
  },

  cardTitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 12
  },

  label: {
    color: "#fff",
    fontSize: 15
  },

  input: {
    backgroundColor: "#4E008C",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  presetRow: {
    flexDirection: "row",
    marginTop: 10
  },

  presetButton: {
    backgroundColor: "#6A00B8",
    padding: 10,
    borderRadius: 10,
    marginRight: 10
  },

  selectedPreset: {
    backgroundColor: "#5CFF8F"
  },

  presetText: {
    color: "#fff"
  },

  addButton: {
    backgroundColor: "#8A2BE2",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10
  },

  addText: {
    color: "#fff",
    fontWeight: "bold"
  },

  medicineItem: {
    padding: 12,
    borderRadius: 12,
    marginTop: 10
  },

  activeMedicine: {
    backgroundColor: "#145A32"
  },

  inactiveMedicine: {
    backgroundColor: "#555"
  },

  medText: {
    color: "#fff",
    fontSize: 15
  },

  timeText: {
    color: "#CFA9FF",
    fontSize: 13
  },

  delete: {
    color: "#FF6B6B",
    fontSize: 18,
    marginLeft: 10
  },

  preview: {
    color: "#CFA9FF",
    marginTop: 10
  },

  progress: {
    color: "#8AFFC1",
    marginTop: 8
  },

  motivationCard: {
    backgroundColor: "#4E008C",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 30
  },

  motivationText: {
    color: "#fff",
    fontSize: 14
  }

});