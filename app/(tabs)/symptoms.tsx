import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SymptomScreen() {

  const today = new Date().toISOString().split('T')[0]; // safer date format

  const [selected, setSelected] = useState([]);
  const [allData, setAllData] = useState({});
  const [analysis, setAnalysis] = useState('');
  const [weeklyInsight, setWeeklyInsight] = useState('');

  const symptoms = [
    { name: 'Cramps', emoji: '😖' },
    { name: 'Acne', emoji: '🧴' },
    { name: 'Bloating', emoji: '🤰' },
    { name: 'Mood Swings', emoji: '😡' },
    { name: 'Headache', emoji: '🤕' },
    { name: 'Fatigue', emoji: '😴' },
    { name: 'Cravings', emoji: '🍫' },
  ];

  useEffect(() => {
    loadSymptoms();
  }, []);

  const loadSymptoms = async () => {
    try {
      const saved = await AsyncStorage.getItem('symptomHistory');

      if (saved) {
        const parsed = JSON.parse(saved);

        setAllData(parsed);

        if (parsed[today]) {
          setSelected(parsed[today]);
        }

        generateWeeklyInsights(parsed);
      }
    } catch (error) {
      console.log("Error loading symptoms", error);
    }
  };

  const toggleSymptom = async (item) => {

    let updated;

    if (selected.includes(item)) {
      updated = selected.filter(s => s !== item);
    } else {
      updated = [...selected, item];
    }

    const newAllData = {
      ...allData,
      [today]: updated,
    };

    setSelected(updated);
    setAllData(newAllData);

    try {
      await AsyncStorage.setItem(
        'symptomHistory',
        JSON.stringify(newAllData)
      );
    } catch (error) {
      console.log("Error saving symptoms", error);
    }

    generateWeeklyInsights(newAllData);
  };

  const generateWeeklyInsights = (data) => {

    const symptomCount = {};
    const todayDate = new Date();

    Object.keys(data).forEach(date => {

      const entryDate = new Date(date);

      if (isNaN(entryDate)) return;

      const diffDays = Math.floor(
        (todayDate.getTime() - entryDate.getTime()) /
        (1000 * 60 * 60 * 24)
      );

      if (diffDays <= 7) {

        data[date].forEach(symptom => {
          symptomCount[symptom] = (symptomCount[symptom] || 0) + 1;
        });

      }

    });

    let message = "📊 This Week Insights\n\n";

    if (Object.keys(symptomCount).length === 0) {
      message += "No symptoms logged this week.";
    } else {

      Object.keys(symptomCount).forEach(symptom => {
        message += `${symptom}: ${symptomCount[symptom]} days\n`;
      });

    }

    setWeeklyInsight(message);
  };

  const getCurrentPhase = async () => {

    const saved = await AsyncStorage.getItem('periodData');
    if (!saved) return null;

    const { lastPeriod, cycleLength } = JSON.parse(saved);

    if (!lastPeriod || !cycleLength) return null;

    const start = new Date(lastPeriod);
    const todayDate = new Date();

    const diffDays = Math.floor(
      (todayDate.getTime() - start.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    const dayOfCycle = (diffDays % parseInt(cycleLength)) + 1;

    if (dayOfCycle <= 5) return 'Menstrual 🩸';
    if (dayOfCycle <= 13) return 'Follicular 🌱';
    if (dayOfCycle === 14) return 'Ovulation 🌸';

    return 'Luteal 🌙';
  };

  const analyzeSymptoms = async () => {

    if (selected.length === 0) {
      setAnalysis('⚠️ Please select at least one symptom.');
      return;
    }

    const phase = await getCurrentPhase();
    let message = '';

    if (phase) {
      message += `You are currently in the ${phase} phase.\n\n`;
    }

    if (selected.includes('Cramps')) {
      message += '😖 Cramps are common during menstruation.\n\n';
    }

    if (selected.includes('Acne')) {
      message += '🧴 Acne may increase due to hormone changes.\n\n';
    }

    if (selected.includes('Bloating')) {
      message += '🤰 Bloating happens due to water retention.\n\n';
    }

    if (selected.includes('Mood Swings')) {
      message += '😡 Mood swings are caused by estrogen changes.\n\n';
    }

    if (selected.includes('Headache')) {
      message += '🤕 Headaches may occur due to estrogen drop.\n\n';
    }

    if (selected.includes('Fatigue')) {
      message += '😴 Fatigue is common during luteal phase.\n\n';
    }

    if (selected.includes('Cravings')) {
      message += '🍫 Cravings happen due to serotonin changes.\n\n';
    }

    message += '💡 Tip: Stay hydrated and get enough rest.';

    setAnalysis(message);
  };

  return (

    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>🌸 Symptom Logger</Text>
      <Text style={styles.date}>Today: {today}</Text>

      <View style={styles.grid}>

        {symptoms.map((item) => (

          <TouchableOpacity
            key={item.name}
            style={[
              styles.card,
              selected.includes(item.name) && styles.selectedCard
            ]}
            onPress={() => toggleSymptom(item.name)}
          >

            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.cardText}>{item.name}</Text>

          </TouchableOpacity>

        ))}

      </View>

      <TouchableOpacity
        style={styles.analyzeButton}
        onPress={analyzeSymptoms}
      >
        <Text style={styles.analyzeText}>Analyze Symptoms</Text>
      </TouchableOpacity>

      {analysis ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>{analysis}</Text>
        </View>
      ) : null}

      {weeklyInsight ? (
        <View style={styles.weekBox}>
          <Text style={styles.resultText}>{weeklyInsight}</Text>
        </View>
      ) : null}

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>⬅ Back</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    backgroundColor: '#F3E5F5',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  date: {
    marginBottom: 20,
    color: '#555',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: 'center',
  },

  selectedCard: {
    backgroundColor: '#A5D6A7',
  },

  emoji: {
    fontSize: 26,
    marginBottom: 6,
  },

  cardText: {
    fontSize: 15,
    fontWeight: '500',
  },

  analyzeButton: {
    backgroundColor: '#8E24AA',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  analyzeText: {
    color: 'white',
    fontWeight: 'bold',
  },

  resultBox: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },

  weekBox: {
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 12,
    marginTop: 15,
  },

  resultText: {
    fontSize: 15,
    lineHeight: 22,
  },

  back: {
    marginTop: 25,
    color: '#6A1B9A',
    fontWeight: '600',
  },

});