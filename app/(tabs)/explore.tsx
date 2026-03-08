import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Explore() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>PCOD Recovery Journeys 🌸</Text>

      <View style={styles.card}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg",
          }}
          style={styles.image}
        />
        <Text style={styles.heading}>Ananya’s Journey</Text>
        <Text style={styles.text}>
          “After struggling with irregular periods for 3 years,
          I focused on insulin-friendly meals, yoga, and stress control.
          Slowly, my cycles became regular and my energy improved.”
        </Text>
      </View>

      <View style={styles.card}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
          }}
          style={styles.image}
        />
        <Text style={styles.heading}>Meera’s Transformation</Text>
        <Text style={styles.text}>
          “Consistency changed everything. Daily 30-minute walks,
          hydration tracking, and reducing sugar helped balance my hormones.”
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#F5F5DC" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  image: { width: "100%", height: 200, borderRadius: 15 },
  heading: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  text: { marginTop: 5, color: "#555" },
});