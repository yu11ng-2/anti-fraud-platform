import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const handleFeaturePress = (feature) => {
    alert(`你點擊了: ${feature}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🛡️ 防詐平台</Text>
        <Text style={styles.subtitle}>利用公開數據源和社群智慧，幫助台灣民眾防範詐騙。</Text>
      </View>

      <View style={styles.featureContainer}>
        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => handleFeaturePress('風險查詢')}
        >
          <Ionicons name="search" size={40} color="#1890ff" />
          <Text style={styles.featureTitle}>風險查詢</Text>
          <Text style={styles.featureDesc}>查詢電話號碼或網域是否存在詐騙風險</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => handleFeaturePress('舉報記錄')}
        >
          <Ionicons name="document" size={40} color="#52c41a" />
          <Text style={styles.featureTitle}>舉報記錄</Text>
          <Text style={styles.featureDesc}>查看社群舉報的詐騙案件和詐騙手法</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => handleFeaturePress('數據分析')}
        >
          <Ionicons name="bar-chart" size={40} color="#faad14" />
          <Text style={styles.featureTitle}>數據分析</Text>
          <Text style={styles.featureDesc}>查看詐騙趨勢分析和數據統計</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dataSourceSection}>
        <Text style={styles.sectionTitle}>📊 數據來源</Text>
        <View style={styles.sourceItem}>
          <Ionicons name="checkmark-circle" size={20} color="#52c41a" />
          <Text style={styles.sourceText}>台灣警政署詐騙案件數據</Text>
        </View>
        <View style={styles.sourceItem}>
          <Ionicons name="checkmark-circle" size={20} color="#52c41a" />
          <Text style={styles.sourceText}>金融監督管理委員會警示清單</Text>
        </View>
        <View style={styles.sourceItem}>
          <Ionicons name="checkmark-circle" size={20} color="#52c41a" />
          <Text style={styles.sourceText}>消費者保護委員會投訴統計</Text>
        </View>
        <View style={styles.sourceItem}>
          <Ionicons name="checkmark-circle" size={20} color="#52c41a" />
          <Text style={styles.sourceText}>社群用戶舉報</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#667eea',
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  featureContainer: {
    padding: 16,
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  dataSourceSection: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sourceText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#333',
  },
});

export default HomeScreen;
