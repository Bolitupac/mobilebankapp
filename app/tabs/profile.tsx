import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';

import {
  changePassword,
  getUserInfo,
  updateUserInfo,
  validatePassword
} from "./BankAccount";

export default function ProfileScreen(): React.JSX.Element {
  const info = getUserInfo();

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");

  const [showEditInfo, setShowEditInfo] = useState(false);
  const [name, setName] = useState(info.name);
  const [email, setEmail] = useState(info.email);

  // =============================
  // CHANGE PASSWORD FUNCTION
  // =============================
  const handleChangePassword = () => {
    if (!currentPin || !newPin) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in both fields',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    if (!validatePassword(currentPin)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Current PIN is incorrect',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    if (newPin.length !== 4) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'New PIN must be 4 digits',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    const result = changePassword(newPin);

    if (result.success) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: result.message,
        position: 'top',
        visibilityTime: 3000,
      });
      setCurrentPin("");
      setNewPin("");
      setShowChangePassword(false);
    }
  };

  // =============================
  // UPDATE PERSONAL INFO FUNCTION
  // =============================
  const handleSaveInfo = () => {
    if (!name || !email) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'All fields are required',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    const result = updateUserInfo(name, email);

    if (result.success) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: result.message,
        position: 'top',
        visibilityTime: 3000,
      });
      setShowEditInfo(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      {/* Profile Info Card */}
      <View style={styles.infoCard}>
        <Image
          source={require("./profile_placeholder.png")}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userInfo}>Account No: 9012345678</Text>
        <Text style={styles.userInfo}>Email: {email}</Text>
      </View>

      {/* Settings Section */}
      <View style={styles.settingsSection}>

        {/* CHANGE PASSWORD */}
        <TouchableOpacity 
          style={styles.settingRow}
          onPress={() => setShowChangePassword(!showChangePassword)}
        >
          <Ionicons name="lock-closed-outline" size={24} color="#00A651" />
          <Text style={styles.settingText}>Change Password</Text>
        </TouchableOpacity>

        {showChangePassword && (
          <View style={styles.changePasswordForm}>
            <TextInput
              style={styles.input}
              placeholder="Enter Current PIN"
              secureTextEntry
              keyboardType="numeric"
              maxLength={4}
              value={currentPin}
              onChangeText={setCurrentPin}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter New PIN"
              secureTextEntry
              keyboardType="numeric"
              maxLength={4}
              value={newPin}
              onChangeText={setNewPin}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
              <Text style={styles.saveButtonText}>Save New PIN</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* UPDATE PERSONAL INFO */}
        <TouchableOpacity 
          style={styles.settingRow}
          onPress={() => setShowEditInfo(!showEditInfo)}
        >
          <Ionicons name="create-outline" size={24} color="#00A651" />
          <Text style={styles.settingText}>Update Personal Info</Text>
        </TouchableOpacity>

        {showEditInfo && (
          <View style={styles.changePasswordForm}>
            <TextInput
              style={styles.input}
              placeholder="Enter Full Name"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveInfo}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Help row (not modified) */}
        <TouchableOpacity style={styles.settingRow}>
          <Ionicons name="help-circle-outline" size={24} color="#00A651" />
          <Text style={styles.settingText}>Help & Support</Text>
        </TouchableOpacity>

      </View>

      {/* Logout */}
      <Link href="/" asChild>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => console.log('Logout action')}
        >
          <Ionicons name="log-out-outline" size={20} color="#E74C3C" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </Link>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5", paddingTop: 50, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 30, textAlign: "center" },
  infoCard: { backgroundColor: "#fff", padding: 20, borderRadius: 15, alignItems: "center", width: '100%', marginBottom: 30, borderWidth: 1, borderColor: '#eee' },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10, backgroundColor: '#ddd' },
  userName: { fontSize: 20, fontWeight: "700", color: "#333", marginBottom: 5 },
  userInfo: { fontSize: 14, color: "#666", marginBottom: 3 },
  settingsSection: { backgroundColor: "#fff", borderRadius: 15, width: '100%', marginBottom: 20, borderWidth: 1, borderColor: '#eee' },
  settingRow: { flexDirection: "row", alignItems: "center", padding: 15, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  settingText: { flex: 1, fontSize: 16, color: "#333", marginLeft: 15 },
  changePasswordForm: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  input: { backgroundColor: "#f9f9f9", borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, marginBottom: 10, fontSize: 16 },
  saveButton: { backgroundColor: "#00A651", padding: 12, borderRadius: 8, alignItems: "center" },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 15, borderWidth: 1, borderColor: "#E74C3C", width: '100%', marginTop: 10 },
  logoutButtonText: { color: "#E74C3C", fontSize: 18, fontWeight: "bold", marginLeft: 10 },
});
