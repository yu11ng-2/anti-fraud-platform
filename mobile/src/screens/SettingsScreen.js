import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [autoCheckEnabled, setAutoCheckEnabled] = React.useState(false);

  const SettingItem = ({ icon, title, description, action }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingContent}>
        <Ionicons name={icon} size={24} color="#1890ff" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingDesc}>{description}</Text>
        </View>
      </View>
      {action}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚙️ 設置</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>通知設置</Text>
        <SettingItem
          icon="notifications"
          title="推送通知"
          description="接收風險警告和舉報更新"
          action={
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#d9d9d9', true: '#95de64' }}
              thumbColor={notificationsEnabled ? '#52c41a' : '#f5f5f5'}
            />
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>功能設置</Text>
        <SettingItem
          icon="phone"
          title="自動檢查來電"
          description="來電時自動檢查是否為詐騙電話"
          action={
            <Switch
              value={autoCheckEnabled}
              onValueChange={setAutoCheckEnabled}
              trackColor={{ false: '#d9d9d9', true: '#95de64' }}
              thumbColor={autoCheckEnabled ? '#52c41a' : '#f5f5f5'}
            />
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>帳戶</Text>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Ionicons name="person" size={24} color="#1890ff" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>登入/註冊</Text>
              <Text style={styles.settingDesc}>保存您的舉報和偏好設置</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>關於</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Ionicons name="information-circle" size={24} color="#1890ff" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>應用版本</Text>
              <Text style={styles.settingDesc}>v1.0.0</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>登出</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#faad14',
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 8,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDesc: {
    fontSize: 12,
    color: '#999',
  },
  logoutButton: {
    backgroundColor: '#ff4d4f',
    margin: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
