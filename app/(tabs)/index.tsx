import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, FlatList, useWindowDimensions, RefreshControl } from 'react-native';
import FilterCategory from '@/components/filter';
import JournalCard from '@/components/journal-card';
import { categories } from '@/data/test-data';
import { ApiError, Journal } from '@/utils/types';
import { useGetJournalsQuery } from '@/store/api';

export default function TabOneScreen() {
  const windowWidth = useWindowDimensions().width;
  const { data: journals, error, isLoading, refetch } = useGetJournalsQuery({});

  // Calculate number of columns based on screen width
  const numColumns = Math.floor(windowWidth / 160);

  // State to manage data and refreshing
  const [data, setData] = useState<Journal[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const getErrorMessage = (error: unknown): string => {
    if (error && typeof error === 'object' && 'data' in error) {
      const apiError = error as ApiError;
      return apiError.data?.detail || 'An unexpected error occurred.';
    }
    return 'An unexpected error occurred.';
  };

  // Update state when journals data changes
  React.useEffect(() => {
    if (journals) {
      setData(journals);
    }
  }, [journals]);

  const renderItem = ({ item, index }: { item: Journal; index: number }) => (
    <JournalCard journal={item} key={index} />
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {getErrorMessage(error)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewStyle}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <FilterCategory categories={categories} />
        <FlatList
          data={data}
          scrollEnabled={false}
          contentContainerStyle={styles.listStyle}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} // Assuming you have unique keys
          numColumns={numColumns}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  scrollViewStyle: {
    width: '100%',
    paddingTop: 5,
    paddingBottom: 10,
    alignItems: 'center'
  },
  listStyle: {
    gap: 10,
    width: '100%',
    justifyContent: 'center',
    paddingBottom: 10
  },
});
