import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PendingScreen} from '../screens/barista/PendingScreen';
import {InProgressScreen} from '../screens/barista/InProgressScreen';
import {CompletedScreen} from '../screens/barista/CompletedScreen';
import {colors} from '../theme/colors';

export function BaristaTabs() {
  const [activeTab, setActiveTab] = useState('pending');

  const renderScreen = () => {
    switch (activeTab) {
      case 'pending':
        return <PendingScreen activeTab={activeTab} onTabChange={setActiveTab} />;
      case 'in_progress':
        return <InProgressScreen activeTab={activeTab} onTabChange={setActiveTab} />;
      case 'completed':
        return <CompletedScreen activeTab={activeTab} onTabChange={setActiveTab} />;
      default:
        return <PendingScreen activeTab={activeTab} onTabChange={setActiveTab} />;
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
});
