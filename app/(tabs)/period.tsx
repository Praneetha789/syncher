import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function PeriodScreen() {

  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState('');

  const [prediction, setPrediction] = useState('');
  const [phase, setPhase] = useState('');
  const [fertileWindow, setFertileWindow] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const saved = await AsyncStorage.getItem('periodData');

      if (saved) {
        const data = JSON.parse(saved);

        setLastPeriod(data.lastPeriod);
        setCycleLength(data.cycleLength);

        calculate(data.lastPeriod, data.cycleLength);
      }

    } catch (e) {
      console.log("Load error", e);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const calculate = (dateStr: string, cycle: string) => {

    if (!dateStr || !cycle) return;

    const start = new Date(dateStr);
    const today = new Date();

    const cycleDays = parseInt(cycle);

    const diffDays = Math.floor(
      (today.getTime() - start.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    const dayOfCycle = (diffDays % cycleDays) + 1;

    let currentPhase = '';

    if (dayOfCycle <= 5) {
      currentPhase = '🩸 Menstrual Phase';
    }
    else if (dayOfCycle <= 13) {
      currentPhase = '🌱 Follicular Phase';
    }
    else if (dayOfCycle <= 16) {
      currentPhase = '🌸 Ovulation Phase';
    }
    else {
      currentPhase = '🌙 Luteal Phase';
    }

    setPhase(currentPhase);

    const cyclesPassed = Math.floor(diffDays / cycleDays) + 1;

    const nextPeriodDate = new Date(start);
    nextPeriodDate.setDate(start.getDate() + cyclesPassed * cycleDays);

    setPrediction(formatDate(nextPeriodDate));

    const ovulation = new Date(nextPeriodDate);
    ovulation.setDate(nextPeriodDate.getDate() - 14);

    const fertileStart = new Date(ovulation);
    fertileStart.setDate(ovulation.getDate() - 3);

    const fertileEnd = new Date(ovulation);
    fertileEnd.setDate(ovulation.getDate() + 1);

    setFertileWindow(
      `${formatDate(fertileStart)} - ${formatDate(fertileEnd)}`
    );
  };

  const saveData = async () => {

    if (!lastPeriod || !cycleLength) {
      alert("Please fill all fields");
      return;
    }

    const data = {
      lastPeriod,
      cycleLength
    };

    await AsyncStorage.setItem(
      'periodData',
      JSON.stringify(data)
    );

    calculate(lastPeriod, cycleLength);
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>🩸 Period Tracker</Text>

      <View style={styles.card}>

        <Text style={styles.label}>Last Period Date</Text>

        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={lastPeriod}
          onChangeText={setLastPeriod}
        />

        <Text style={styles.label}>Cycle Length</Text>

        <TextInput
          style={styles.input}
          placeholder="Example: 28"
          value={cycleLength}
          onChangeText={setCycleLength}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={saveData}
        >
          <Text style={styles.buttonText}>
            Save & Analyze
          </Text>
        </TouchableOpacity>

      </View>

      {prediction ? (

        <View style={styles.resultCard}>

          <Text style={styles.resultTitle}>
            Cycle Insights
          </Text>

          <Text style={styles.result}>
            📅 Next Period: {prediction}
          </Text>

          <Text style={styles.result}>
            🌸 Fertile Window: {fertileWindow}
          </Text>

          <Text style={styles.phase}>
            {phase}
          </Text>

        </View>

      ) : null}

      <TouchableOpacity
        onPress={() => router.back()}
      >
        <Text style={styles.back}>
          ← Back
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FCE4EC',
    justifyContent: 'center'
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#AD1457'
  },

  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3
  },

  label: {
    marginBottom: 6,
    fontWeight: '600'
  },

  input: {
    backgroundColor: '#F8BBD0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15
  },

  button: {
    backgroundColor: '#D81B60',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center'
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },

  resultCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#D81B60'
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },

  result: {
    marginBottom: 6
  },

  phase: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#AD1457'
  },

  back: {
    marginTop: 20,
    textAlign: 'center',
    color: '#AD1457'
  }

});