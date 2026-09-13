import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PendingScreen} from '../screens/barista/PendingScreen';
import {InProgressScreen} from '../screens/barista/InProgressScreen';
import {CompletedScreen} from '../screens/barista/CompletedScreen';
import {BaristaTabBar} from '../components/BaristaTabBar';
import {colors} from '../theme/colors';

export function BaristaTabs() {
  const [activeTab, setActiveTab] = useState('pending');

  const renderScreen = () => {
    switch (activeTab) {
      case 'pending':
        return <PendingScreen />;
      case 'in_progress':
        return <InProgressScreen />;
      case 'completed':
        return <CompletedScreen />;
      default:
        return <PendingScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        {renderScreen()}
        <BaristaTabBar activeTab={activeTab} onTabChange={setActiveTab} />
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
