import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';
import { depositMoney, getCurrentUser, getUserBalance } from "../../services/userService";

export default function HomeScreen(): React.JSX.Element {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [hideBalance, setHideBalance] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [depositValue, setDepositValue] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const loadBalance = async () => {
        const bal = await getUserBalance();
        setBalance(bal);
      };
      loadBalance();
    }, [])
  );

  const toggleBalance = () => setHideBalance(!hideBalance);

  const handleDeposit = async () => {
    const amount = parseFloat(depositValue);
    if (isNaN(amount) || amount <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Amount',
        text2: 'Enter a valid number greater than 0',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    const result = await depositMoney(amount);

    if (result.success) {
      setBalance(result.newBalance || 0);
      setDepositValue("");
      setShowDeposit(false);

      Toast.show({
        type: 'success',
        text1: 'Deposit Successful',
        text2: `₦${amount.toLocaleString()} added to your account`,
        position: 'top',
        visibilityTime: 3000,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Deposit Failed',
        text2: result.message,
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Home Dashboard</Text>
        <TouchableOpacity onPress={() => router.push('./profile')}>
          <Ionicons name="person-circle" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance (NGN)</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceAmount}>
            {hideBalance
              ? "₦" + "*".repeat(balance.toFixed(2).length)
              : `₦${balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
            }
          </Text>
          <TouchableOpacity onPress={toggleBalance} style={styles.eyeButton}>
            <Ionicons
              name={hideBalance ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsRow}>
          <TouchableOpacity style={styles.quickButton} onPress={() => router.push("./transfer")}>
            <Ionicons name="send-outline" size={28} color="#00A651" />
            <Text style={styles.quickButtonText}>Send Money</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickButton} onPress={() => router.push("./airtime")}>
            <Ionicons name="phone-portrait-outline" size={28} color="#00A651" />
            <Text style={styles.quickButtonText}>Buy Airtime</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickButton} onPress={() => router.push("./transactions")}>
            <Ionicons name="list-outline" size={28} color="#00A651" />
            <Text style={styles.quickButtonText}>View History</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.quickActionsRow}>
          <TouchableOpacity style={styles.quickButton} onPress={() => setShowDeposit(!showDeposit)}>
            <Ionicons name="cash-outline" size={28} color="#00A651" />
            <Text style={styles.quickButtonText}>Deposit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickButton} onPress={() => router.push("./airtime")}>
            <Ionicons name="wifi-outline" size={28} color="#00A651" />
            <Text style={styles.quickButtonText}>Buy Data</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickButton} onPress={() => router.push("./profile")}>
            <Ionicons name="person-circle-outline" size={28} color="#00A651" />
            <Text style={styles.quickButtonText}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showDeposit && (
        <View style={styles.depositContainer}>
          <TextInput
            style={styles.depositInput}
            placeholder="Enter amount to deposit"
            keyboardType="numeric"
            value={depositValue}
            onChangeText={setDepositValue}
          />
          <TouchableOpacity style={styles.depositButton} onPress={handleDeposit}>
            <Text style={styles.depositButtonText}>Add Money</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <Text style={styles.transactionItem}>-₦2,500.00 | Transfer to Zenith Bank | Yesterday</Text>
        <Text style={styles.transactionItem}>+₦50,000.00 | Received from UBA | 2 days ago</Text>
        <Text style={styles.transactionItem}>-₦500.00 | MTN Airtime Purchase | 3 days ago</Text>
      </View>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20, paddingTop: 50 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#333" },
  balanceCard: { backgroundColor: "#00A651", padding: 20, borderRadius: 15, marginBottom: 30, alignItems: 'center' },
  balanceLabel: { fontSize: 16, color: "#fff", opacity: 0.8 },
  balanceRow: { flexDirection: 'row', alignItems: 'center' },
  balanceAmount: { fontSize: 32, fontWeight: "800", color: "#fff", marginTop: 5 },
  eyeButton: { marginLeft: 10 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, color: "#333" },
  quickActionsRow: { flexDirection: "row", justifyContent: "space-around" },
  quickButton: { backgroundColor: "#fff", padding: 15, borderRadius: 10, alignItems: "center", width: "30%", borderWidth: 1, borderColor: '#eee' },
  quickButtonText: { marginTop: 8, fontSize: 12, fontWeight: "600", textAlign: "center", color: "#333" },
  transactionItem: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 8, fontSize: 14, color: '#555', borderLeftWidth: 4, borderLeftColor: '#ccc' },
  depositContainer: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#fff', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', flexDirection: 'row', alignItems: 'center' },
  depositInput: { flex: 1, backgroundColor: '#f9f9f9', borderRadius: 8, borderWidth: 1, borderColor: '#ddd', padding: 10, marginRight: 10 },
  depositButton: { backgroundColor: '#00A651', padding: 12, borderRadius: 8 },
  depositButtonText: { color: '#fff', fontWeight: 'bold' }
});
