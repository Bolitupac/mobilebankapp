import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { validatePassword } from './tabs/BankAccount';

export default function Login(): React.JSX.Element {
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Check if fields are empty
    if (!accountNumber || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all fields',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    // Check account number length
    if (accountNumber.length < 6) { 
      Toast.show({
        type: 'error',
        text1: 'Invalid Account Number',
        text2: 'Account number must be at least 6 digits',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    // Check password
    if (!validatePassword(password)) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Incorrect password',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    // Successful login
    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: 'Welcome!',
      position: 'top',
      visibilityTime: 2000,
    });

    router.push('/tabs/home'); // redirect to home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter account number"
          keyboardType="numeric"
          value={accountNumber}
          onChangeText={setAccountNumber}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 30, textAlign: 'center' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5, color: '#555' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16 },
  loginButton: { backgroundColor: '#00A651', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
