import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, FlatList, useWindowDimensions, RefreshControl, Pressable, TouchableOpacity } from 'react-native';
import FilterCategory from '@/components/filter';
import JournalCard from '@/components/journal-card';
import { categories } from '@/data/test-data';
import { Journal } from '@/utils/types';
import { useGetJournalsQuery } from '@/store/api';
import { getErrorMessage } from '@/utils/handlers';
import Colors from '@/constants/Colors';
import { store } from '@/store';
import { setJournals } from '@/store/journals-slice';

export default function TabOneScreen() {
  const windowWidth = useWindowDimensions().width;
  const { data: journals, error, isLoading, refetch } = useGetJournalsQuery({});

  const [data, setData] = useState<Journal[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSingleColumnView, setIsSingleColumnView] = useState(false);
  const [forceRerenderKey, setForceRerenderKey] = useState(0); // Key to force re-render

  useEffect(() => {
    if (journals) {
      setData(journals);
      store.dispatch(setJournals(journals));
    }
  }, [journals]);

  const toggleLayout = () => {
    setIsSingleColumnView(prev => !prev);
    setForceRerenderKey(prev => prev + 1);
  };

  const numColumns = isSingleColumnView ? 1 : Math.floor(windowWidth / 160);

  const handleFilterChange = (searchTerm: string, selectedCategory: React.SetStateAction<string>) => {
    setSearchTerm(searchTerm);
    setSelectedCategory(selectedCategory);

    const filteredJournals = journals.filter((journal: Journal) =>
      (journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === '' || journal.category === selectedCategory)
    );
    setData(filteredJournals);
  };

  const renderItem = ({ item, index }: { item: Journal, index: number }) => (
    <JournalCard journal={item} key={index} fill={isSingleColumnView?true:false}/>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {getErrorMessage(error)}</Text>
        <Pressable onPress={onRefresh} style={styles.reloadButton}>
          <Text style={styles.reloadButtonText}>Reload</Text>
        </Pressable>
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
        <FilterCategory categories={categories} onFilterChange={handleFilterChange} />
        <View style={{width: '100%', flexDirection:'row', justifyContent:'flex-end',paddingHorizontal:10}}>
          <TouchableOpacity onPress={toggleLayout} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}>{isSingleColumnView ? 'Grid view' : 'List view'}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          scrollEnabled={false}
          contentContainerStyle={styles.listStyle}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          // Force re-render when numColumns changes
          key={forceRerenderKey}
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
  viewStyle:{
    width: '100%', flexDirection:'row',
    justifyContent:'flex-end',paddingHorizontal:10
  },
  listStyle: {
    gap: 10,
    // width: '100%',
    justifyContent: 'center',
    paddingBottom: 10
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
