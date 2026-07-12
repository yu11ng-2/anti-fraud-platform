import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const ReportsScreen = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/reports`
      );
      setReports(response.data.reports || []);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    }
    setLoading(false);
  };

  const categoryMap = {
    'impersonation': '冒充詐騙',
    'phishing': '釣魚詐騙',
    'investment': '投資詐騙',
    'romance': '感情詐騙',
    'other': '其他'
  };

  const getCategoryColor = (category) => {
    const colors = {
      'impersonation': '#ff4d4f',
      'phishing': '#faad14',
      'investment': '#1890ff',
      'romance': '#eb2f96',
      'other': '#999'
    };
    return colors[category] || '#999';
  };

  const renderReport = ({ item }) => (
    <View style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <Ionicons name="warning" size={24} color="#ff4d4f" />
        <Text style={styles.reportTitle}>{item.title}</Text>
      </View>
      <Text style={styles.reportDesc}>{item.description}</Text>
      <View style={styles.reportFooter}>
        <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryText}>{categoryMap[item.category] || item.category}</Text>
        </View>
        <Text style={styles.reportDate}>{new Date(item.date).toLocaleDateString('zh-TW')}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📋 舉報記錄</Text>
      </View>

      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#1890ff" />
        </View>
      ) : reports.length === 0 ? (
        <View style={styles.centerContent}>
          <Ionicons name="folder-open" size={64} color="#ccc" />
          <Text style={styles.emptyText}>暫無舉報記錄</Text>
        </View>
      ) : (
        <FlatList
          data={reports}
          renderItem={renderReport}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          onRefresh={fetchReports}
          refreshing={loading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#52c41a',
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
  listContent: {
    padding: 12,
  },
  reportCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
    flex: 1,
  },
  reportDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  reportFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryTag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reportDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default ReportsScreen;
