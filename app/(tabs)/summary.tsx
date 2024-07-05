import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Text, TouchableOpacity } from 'react-native';
import JournalCard from '@/components/journal-card';
import Colors from '@/constants/Colors';
import { useGetDailyJournalsQuery, useGetWeeklyJournalsQuery, useGetMonthlyJournalsQuery } from '@/store/api';
import { Journal } from '@/utils/types';

export default function TabTwoScreen() {
  const [selectedTab, setSelectedTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const { data: dailyJournals, isLoading: isLoadingDaily } = useGetDailyJournalsQuery({});
  const { data: weeklyJournals, isLoading: isLoadingWeekly } = useGetWeeklyJournalsQuery({});
  const { data: monthlyJournals, isLoading: isLoadingMonthly } = useGetMonthlyJournalsQuery({});

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

  const renderItem = ({ item }:{item:Journal}) => <JournalCard journal={item} />;

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
          <Text>Loading...</Text>
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
    alignItems: 'center',
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
});

