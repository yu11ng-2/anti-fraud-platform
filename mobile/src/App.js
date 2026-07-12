import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import CheckRiskScreen from './screens/CheckRiskScreen';
import ReportsScreen from './screens/ReportsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === '首頁') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === '風險查詢') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === '舉報記錄') {
              iconName = focused ? 'document' : 'document-outline';
            } else if (route.name === '設置') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1890ff',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="首頁" component={HomeScreen} />
        <Tab.Screen name="風險查詢" component={CheckRiskScreen} />
        <Tab.Screen name="舉報記錄" component={ReportsScreen} />
        <Tab.Screen name="設置" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
