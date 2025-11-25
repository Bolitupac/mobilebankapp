import { Picker } from '@react-native-picker/picker';
import React, { useState } from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';
import { transferMoney } from "../../services/userService";
import { addTransaction } from "../../utils/transactionStorage";

export default function TransferScreen(): React.JSX.Element {
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState(""); 

  const handleTransfer = async () => {
    const numAmount = parseFloat(amount);

    if (!accountNumber || !amount || !pin) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all required fields',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    if (accountNumber.length !== 10) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Account number must be 10 digits',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    const result = await transferMoney(accountNumber, numAmount, pin);

    if (result.success) {
      addTransaction("transfer", {
        bank: bank || "Internal Transfer",
        accountNumber,
        amount: numAmount
      });

      Toast.show({
        type: 'success',
        text1: 'Transfer Successful',
        text2: `₦${numAmount.toLocaleString()} sent to ${accountNumber}`,
        position: 'top',
        visibilityTime: 4000,
      });

      setAmount("");
      setAccountNumber("");
      setBank("");
      setPin("");

    } else {
      Toast.show({
        type: 'error',
        text1: 'Transfer Failed',
        text2: result.message,
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };

  const banks = [
    "Opay",
    "Access Bank",
    "Zenith Bank",
    "Guaranty Trust Bank (GTB)",
    "First Bank of Nigeria",
    "United Bank for Africa (UBA)",
    "Fidelity Bank",
    "Union Bank",
    "Stanbic IBTC Bank",
    "Polaris Bank",
    "Ecobank Nigeria",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bank Transfer (NGN)</Text>

      {/* Bank Picker */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Select Bank</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={bank}
            onValueChange={(itemValue) => setBank(itemValue)}
            mode="dropdown"
            style={styles.picker}
          >
            <Picker.Item label="Select a bank..." value="" />
            {banks.map((b, i) => (
              <Picker.Item key={i} label={b} value={b} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Account Number */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Recipient Account Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter 10-digit account number"
          keyboardType="numeric"
          value={accountNumber}
          onChangeText={setAccountNumber}
        />
      </View>

      {/* Amount */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount (₦)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount to send"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      {/* PIN */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Enter PIN</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter 4-digit PIN"
          keyboardType="numeric"
          secureTextEntry={true}
          maxLength={4}
          value={pin}
          onChangeText={setPin}
        />
      </View>

      <TouchableOpacity style={styles.sendButton} onPress={handleTransfer}>
        <Text style={styles.sendButtonText}>Send Money Now</Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5", paddingTop: 50 },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 30, textAlign: "center" },
  inputGroup: { marginBottom: 25 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 5, color: "#555" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 12, fontSize: 16 },

  pickerWrapper: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    height: 50,
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: Platform.OS === "ios" ? 180 : 50,
  },

  sendButton: { backgroundColor: "#00A651", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 20 },
  sendButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
