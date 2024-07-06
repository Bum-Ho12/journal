import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Text, TouchableOpacity, Pressable } from 'react-native';
import JournalCard from '@/components/journal-card';
import Colors from '@/constants/Colors';
import { useGetDailyJournalsQuery, useGetWeeklyJournalsQuery, useGetMonthlyJournalsQuery } from '@/store/api';
import { Journal } from '@/utils/types';
import { getErrorMessage } from '@/utils/handlers';

export default function TabTwoScreen() {
  const [selectedTab, setSelectedTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const { data: dailyJournals, isLoading: isLoadingDaily, error: dailyError, refetch: refetchDaily } = useGetDailyJournalsQuery({});
  const { data: weeklyJournals, isLoading: isLoadingWeekly, error: weeklyError, refetch: refetchWeekly } = useGetWeeklyJournalsQuery({});
  const { data: monthlyJournals, isLoading: isLoadingMonthly, error: monthlyError, refetch: refetchMonthly } = useGetMonthlyJournalsQuery({});

  const getJournals = () => {
    switch (selectedTab) {
      case 'daily':
        return dailyJournals || [];
      case 'weekly':
        return weeklyJournals || [];
      case 'monthly':
        return monthlyJournals || [];
      default:
        return [];
    }
  };

  const renderItem = ({ item }: { item: Journal }) => <JournalCard journal={item} />;

  const onRefresh = async () => {
    switch (selectedTab) {
      case 'daily':
        await refetchDaily();
        break;
      case 'weekly':
        await refetchWeekly();
        break;
      case 'monthly':
        await refetchMonthly();
        break;
      default:
        break;
    }
  };

  if (dailyError || weeklyError || monthlyError) {
    return (
      <View style={styles.container}>
        <Text>Error: {getErrorMessage(dailyError || weeklyError || monthlyError)}</Text>
        <Pressable onPress={onRefresh} style={styles.reloadButton}>
          <Text style={styles.reloadButtonText}>Reload</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setSelectedTab('daily')}>
          <Text style={[styles.tabTextStyle, selectedTab === 'daily' && styles.selectedTabTextStyle]}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('weekly')}>
          <Text style={[styles.tabTextStyle, selectedTab === 'weekly' && styles.selectedTabTextStyle]}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('monthly')}>
          <Text style={[styles.tabTextStyle, selectedTab === 'monthly' && styles.selectedTabTextStyle]}>Monthly</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewStyle}
      >
        {isLoadingDaily || isLoadingWeekly || isLoadingMonthly ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <FlatList
            scrollEnabled={false}
            data={getJournals()}
            renderItem={renderItem}
            contentContainerStyle={styles.listStyle}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '95%',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    borderRadius: 7,
  },
  scrollViewStyle: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  listStyle: {
    gap: 10,
    width: '100%',
    paddingBottom: 10,
  },
  tabTextStyle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.tabIconDefault,
  },
  selectedTabTextStyle: {
    color: Colors.light.tabIconSelected,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginTop: 10,
  },
  reloadButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
  },
  reloadButtonText: {
    fontSize: 16,
    color: Colors.light.tint,
    textAlign: 'center',
  },
});
