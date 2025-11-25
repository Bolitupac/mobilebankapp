import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';
import { buyAirtime } from "../../services/userService";
import { addTransaction } from "../../utils/transactionStorage";

export default function AirtimeScreen(): React.JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [network, setNetwork] = useState("");

const networks = [
  { name: "MTN", logo: "https://seeklogo.com/images/M/mtn-logo-8E052A07C0-seeklogo.com.png" },
  { name: "Airtel", logo: "https://seeklogo.com/images/A/airtel-logo-2F3C7595CE-seeklogo.com.png" },
  { name: "Glo", logo: "https://seeklogo.com/images/G/glo-logo-2F7C38E5D4-seeklogo.com.png" },
];

// handle the notifications
  const handleBuyAirtime = async () => {
    const numAmount = parseFloat(amount);
    if (!phoneNumber || !amount || !pin || !network) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please fill in all fields', position: 'top', visibilityTime: 3000 });
      return;
    }
    if (phoneNumber.length !== 11) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Phone number must be 11 digits', position: 'top', visibilityTime: 3000 });
      return;
    }
    const result = await buyAirtime(numAmount, pin);
    if (result.success) {
      addTransaction("airtime", { phone: phoneNumber, network, amount: numAmount, newBalance: result.newBalance });
      Toast.show({ type: 'success', text1: 'Airtime Purchased', text2: `₦${numAmount.toLocaleString()} for ${phoneNumber} (${network})`, position: 'top', visibilityTime: 4000 });
      setAmount(""); setPhoneNumber(""); setPin(""); setNetwork("");
    } else {
      Toast.show({ type: 'error', text1: 'Purchase Failed', text2: result.message, position: 'top', visibilityTime: 3000 });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buy Airtime</Text>

      {/* pick network*/}
      <Text style={styles.label}>Select Network</Text>
      <View style={styles.networkRow}>
        {networks.map((n) => (
          <TouchableOpacity
            key={n.name}
            style={[styles.networkButton, network === n.name && styles.networkButtonSelected]}
            onPress={() => setNetwork(n.name)}
          >
            <Image source={{ uri: n.logo }} style={styles.networkLogo} resizeMode="contain" />
            <Text style={[styles.networkText, network === n.name && styles.networkTextSelected]}>{n.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* enter phone num */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} placeholder="Enter phone number" keyboardType="numeric" value={phoneNumber} onChangeText={setPhoneNumber} />
      </View>

      {/* input airtime */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount (₦)</Text>
        <TextInput style={styles.input} placeholder="Enter amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
      </View>

      {/* input pic */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Enter PIN</Text>
        <TextInput style={styles.input} placeholder="Enter 4-digit PIN" keyboardType="numeric" secureTextEntry maxLength={4} value={pin} onChangeText={setPin} />
      </View>

      <TouchableOpacity style={styles.sendButton} onPress={handleBuyAirtime}>
        <Text style={styles.sendButtonText}>Buy Airtime</Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 20, textAlign: "center" },
  inputGroup: { marginBottom: 25 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 5, color: "#555" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 12, fontSize: 16 },
  networkRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  networkButton: { flex: 1, padding: 12, marginHorizontal: 5, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', alignItems: 'center', backgroundColor: '#fff' },
  networkButtonSelected: { backgroundColor: '#00A651', borderColor: '#00A651' },
  networkText: { fontSize: 14, color: '#333', fontWeight: '600', marginTop: 5 },
  networkTextSelected: { color: '#fff' },
  networkLogo: { width: 40, height: 40 },
  sendButton: { backgroundColor: "#00A651", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  sendButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
