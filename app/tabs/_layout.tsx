import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout(): React.JSX.Element {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false, 
        tabBarActiveTintColor: "#00A651", // Nigerian/OPay Green
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }: { color: string, size: number }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="transfer"
        options={{
          tabBarLabel: "Transfer",
          tabBarIcon: ({ color, size }: { color: string, size: number }) => (
            <Ionicons name="swap-horizontal-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="airtime"
        options={{
          tabBarLabel: "Airtime/Data",
          tabBarIcon: ({ color, size }: { color: string, size: number }) => (
            <Ionicons name="phone-portrait-outline" color={color} size={size} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="transactions"
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color, size }: { color: string, size: number }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }: { color: string, size: number }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}