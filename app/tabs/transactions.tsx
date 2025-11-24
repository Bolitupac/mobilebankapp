import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function TransactionsScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      
      <Text style={styles.infoText}>
        List of all financial activities (NGN), sorted by date (most recent first).
      </Text>

      <ScrollView style={styles.listContainer}>
        <View style={styles.transactionItem}>
          <Text style={styles.itemTextMajor}>Transfer -₦25,000.00</Text>
          <Text style={styles.itemTextMinor}>To Femi Adekunle | 2025-11-20, 10:30 AM</Text>
        </View>
        <View style={styles.transactionItem}>
          <Text style={styles.itemTextMajor}>Receive +₦50,000.00</Text>
          <Text style={styles.itemTextMinor}>From Jane Doe (UBA) | 2025-11-19, 04:45 PM</Text>
        </View>
        <View style={styles.transactionItem}>
          <Text style={styles.itemTextMajor}>Airtime -₦1,000.00</Text>
          <Text style={styles.itemTextMinor}>MTN - 080******** | 2025-11-19, 09:15 AM</Text>
        </View>
        <View style={styles.transactionItem}>
          <Text style={styles.itemTextMajor}>Bill -₦12,500.00</Text>
          <Text style={styles.itemTextMinor}>PHCN Electricity Bill | 2025-11-15, 08:30 AM</Text>
        </View>
        
        <Text style={styles.endListText}>End of Recent History</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  infoText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    flex: 1,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#00A651',
  },
  itemTextMajor: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  itemTextMinor: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
  },
  endListText: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 50,
    color: '#aaa',
  }
});