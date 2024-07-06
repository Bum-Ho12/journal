import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Pressable, useWindowDimensions } from 'react-native';
import JournalCard from '@/components/journal-card'; // Importing JournalCard component
import Colors from '@/constants/Colors'; // Importing Colors from constants
import { useGetDailyJournalsQuery, useGetWeeklyJournalsQuery, useGetMonthlyJournalsQuery } from '@/store/api'; // Importing query hooks from store/api
import { getErrorMessage } from '@/utils/handlers'; // Importing utility function for error messages

export default function SummaryScreen() {
  const windowWidth = useWindowDimensions().width; // Getting window width
  const [selectedTab, setSelectedTab] = useState<'daily' | 'weekly' | 'monthly'>('daily'); // State for selected tab ('daily', 'weekly', 'monthly')

  // Query hooks for fetching daily, weekly, and monthly journals
  const { data: dailyJournals, isLoading: isLoadingDaily, error: dailyError, refetch: refetchDaily } = useGetDailyJournalsQuery({});
  const { data: weeklyJournals, isLoading: isLoadingWeekly, error: weeklyError, refetch: refetchWeekly } = useGetWeeklyJournalsQuery({});
  const { data: monthlyJournals, isLoading: isLoadingMonthly, error: monthlyError, refetch: refetchMonthly } = useGetMonthlyJournalsQuery({});

  const [isSingleColumnView, setIsSingleColumnView] = useState(false); // State for single column view toggle
  const [forceRerenderKey, setForceRerenderKey] = useState(0); // State to force rerender on layout toggle

  // Function to toggle between single column and multi-column view
  const toggleLayout = () => {
    setIsSingleColumnView(prev => !prev); // Toggle single column view state
    setForceRerenderKey(prev => prev + 1); // Force rerender by incrementing key
  };

  // Calculates number of columns based on window width and single column view state
  const numColumns = isSingleColumnView ? 1 : Math.floor(windowWidth / 160);

  // Function to get journals based on selected tab
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

  // Custom logic to render items in rows based on numColumns
  const rows = [];
  for (let i = 0; i < Math.ceil(getJournals().length / numColumns); i++) {
    const rowItems = [];
    for (let j = 0; j < numColumns; j++) {
      const dataIndex = i * numColumns + j;
      if (dataIndex < getJournals().length) {
        rowItems.push(
          <JournalCard journal={getJournals()[dataIndex]} key={dataIndex} fill={isSingleColumnView} />
        );
      }
    }
    rows.push(
      <View style={styles.rowContainer} key={i}>
        {rowItems}
      </View>
    );
  }

  // Function to handle refresh on pull-down refresh
  const onRefresh = async () => {
    switch (selectedTab) {
      case 'daily':
        await refetchDaily(); // Refetch daily journals
        break;
      case 'weekly':
        await refetchWeekly(); // Refetch weekly journals
        break;
      case 'monthly':
        await refetchMonthly(); // Refetch monthly journals
        break;
      default:
        break;
    }
  };

  // Render error message and reload button if there's an error fetching data
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

  // Render summary screen with tabs, layout toggle button, and journals list
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {/* Tab buttons for daily, weekly, and monthly */}
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
        <View style={styles.viewStyle}>
          {/* Toggle button for single column/grid view */}
          <TouchableOpacity onPress={toggleLayout} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}>{isSingleColumnView ? 'Grid view' : 'List view'}</Text>
          </TouchableOpacity>
        </View>
        {/* Render loading text if data is loading */}
        {isLoadingDaily || isLoadingWeekly || isLoadingMonthly ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          // {/* Render rows of journals */}
          <View>
            {rows}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// Styles for SummaryScreen component
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
  viewStyle:{
    width: '100%', flexDirection:'row',
    justifyContent:'flex-end',paddingHorizontal:10
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
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
  toggleButton: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
  },
  toggleButtonText: {
    fontSize: 16,
    color: Colors.light.tint,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
