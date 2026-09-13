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
    <View style={styles.container}>
      <SafeAreaView style={styles.safeTop} edges={['top']}>
        <BaristaTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </SafeAreaView>
      <View style={styles.content}>{renderScreen()}</View>
      <SafeAreaView style={styles.safeBottom} edges={['bottom']} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeTop: {
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  safeBottom: {
    backgroundColor: colors.background,
  },
});
