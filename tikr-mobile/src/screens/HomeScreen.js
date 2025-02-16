import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import StockInput from '../components/StockInput';
import PredictionResults from '../components/PredictionResults';
import { getPrediction } from '../services/api';

export default function HomeScreen() {
  const [predictions, setPredictions] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTicker, setCurrentTicker] = useState('');

  const handlePrediction = async (ticker) => {
    setLoading(true);
    setError('');
    setCurrentTicker(ticker);
    
    try {
      const data = await getPrediction(ticker);
      setPredictions(data.predictions);
    } catch (err) {
      setError('Error fetching prediction');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>TIKR Stock Prediction</Text>
          <StockInput onSubmit={handlePrediction} />
          <PredictionResults 
            predictions={predictions}
            error={error}
            loading={loading}
            ticker={currentTicker}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
}); 