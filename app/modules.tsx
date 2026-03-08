import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ModulesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Explore Modules</Text>
      <Text style={styles.text}>
        Available Modules:
        {"\n"}• PCOD  
        {"\n"}• Thyroid  
        {"\n"}• Fertility  
        {"\n"}• Menopause
      </Text>

      <Text style={styles.text}>
        Click on a module to see tips, diet plans, and exercise routines for your hormones.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor:'#FFF0F6' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  button: { backgroundColor: '#EC407A', padding: 12, borderRadius: 12 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});