import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const CheckRiskScreen = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState('phone');

  const handleCheck = async () => {
    if (!input.trim()) {
      alert('請輸入電話號碼或網域');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/fraud/check-risk`,
        inputType === 'phone' ? { phoneNumber: input } : { domain: input }
      );
      setResult(response.data);
    } catch (error) {
      alert('查詢失敗: ' + error.message);
    }
    setLoading(false);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'high':
        return '#ff4d4f';
      case 'medium':
        return '#faad14';
      default:
        return '#52c41a';
    }
  };

  const getRiskLabel = (level) => {
    switch (level) {
      case 'high':
        return '⚠️ 高風險';
      case 'medium':
        return '⚡ 中風險';
      default:
        return '✅ 低風險';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔍 風險查詢</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, inputType === 'phone' && styles.typeButtonActive]}
            onPress={() => { setInputType('phone'); setInput(''); setResult(null); }}
          >
            <Text style={[styles.typeButtonText, inputType === 'phone' && styles.typeButtonTextActive]}>☎️ 電話號碼</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, inputType === 'domain' && styles.typeButtonActive]}
            onPress={() => { setInputType('domain'); setInput(''); setResult(null); }}
          >
            <Text style={[styles.typeButtonText, inputType === 'domain' && styles.typeButtonTextActive]}>🌐 網域</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={inputType === 'phone' ? '輸入電話號碼' : '輸入網域'}
            value={input}
            onChangeText={setInput}
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[styles.checkButton, loading && styles.checkButtonDisabled]}
          onPress={handleCheck}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="search" size={20} color="white" />
              <Text style={styles.checkButtonText}>查詢風險</Text>
            </>
          )}
        </TouchableOpacity>

        {result && (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultInput}>輸入: {result.input}</Text>
              <View style={[styles.riskBadge, { backgroundColor: getRiskColor(result.riskLevel) }]}>
                <Text style={styles.riskBadgeText}>{getRiskLabel(result.riskLevel)}</Text>
              </View>
            </View>

            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>風險分數</Text>
              <Text style={[styles.resultValue, { color: getRiskColor(result.riskLevel) }]}>
                {result.riskScore}/100
              </Text>
            </View>

            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>查詢時間</Text>
              <Text style={styles.resultValue}>
                {new Date(result.timestamp).toLocaleString('zh-TW')}
              </Text>
            </View>
          </View>
        )}
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
    backgroundColor: '#1890ff',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    padding: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#1890ff',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  typeButtonTextActive: {
    color: 'white',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  checkButton: {
    flexDirection: 'row',
    backgroundColor: '#1890ff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  checkButtonDisabled: {
    opacity: 0.6,
  },
  checkButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultHeader: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    paddingBottom: 12,
  },
  resultInput: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  riskBadge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  riskBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  resultItem: {
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CheckRiskScreen;
