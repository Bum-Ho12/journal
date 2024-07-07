import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text,
  Pressable, TouchableOpacity, useWindowDimensions, RefreshControl
} from 'react-native';
import FilterCategory from '@/components/filter'; // Importing FilterCategory component
import JournalCard from '@/components/journal-card'; // Importing JournalCard component
import { Journal } from '@/utils/types'; // Importing Journal type
import { useGetJournalsQuery } from '@/store/api'; // Importing useGetJournalsQuery hook
import { getErrorMessage } from '@/utils/handlers'; // Importing getErrorMessage function
import Colors from '@/constants/Colors'; // Importing Colors from constants
import { store } from '@/store'; // Importing Redux store
import { setJournals } from '@/store/journals-slice'; // Importing setJournals action creator

export default function HomeScreen() {
  const windowWidth = useWindowDimensions().width; // Getting window width
  const { data: journals, error, isLoading, refetch } = useGetJournalsQuery({}); // Fetching journals data using useGetJournalsQuery hook

  const [data, setData] = useState<Journal[]>([]); // State for storing journal data
  const [refreshing, setRefreshing] = useState(false); // State for refresh control
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [isSingleColumnView, setIsSingleColumnView] = useState(false); // State for layout view mode
  const [forceRerenderKey, setForceRerenderKey] = useState(0); // State key to force re-render

  useEffect(() => {
    if (journals) {
      setData(journals); // Setting journal data in state
      store.dispatch(setJournals(journals)); // Dispatching setJournals action to Redux store
    }
  }, [journals]);

  // Toggle between grid and list view layout
  const toggleLayout = () => {
    setIsSingleColumnView(prev => !prev); // Toggling layout view mode
    setForceRerenderKey(prev => prev + 1); // Incrementing force re-render key
  };

  // Calculating number of columns based on window width
  const numColumns = isSingleColumnView ? 1 : Math.floor(windowWidth / 160);

  // Handling filter change for search term and selected category
  const handleFilterChange = (searchTerm: string, selectedCategory: React.SetStateAction<string>) => {
    setSearchTerm(searchTerm); // Setting search term state
    setSelectedCategory(selectedCategory); // Setting selected category state

    // Filtering journals based on search term and selected category
    const filteredJournals = journals.filter((journal: Journal) =>
      (journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === '' || journal.category === selectedCategory)
    );
    setData(filteredJournals); // Updating filtered data in state
  };

  // Custom logic to render items in rows based on numColumns
  const rows = [];
  for (let i = 0; i < Math.ceil(data.length / numColumns); i++) {
    const rowItems = [];
    for (let j = 0; j < numColumns; j++) {
      const dataIndex = i * numColumns + j;
      if (dataIndex < data.length) {
        rowItems.push(
          <JournalCard journal={data[dataIndex]} key={dataIndex} fill={isSingleColumnView} />
        );
      }
    }
    rows.push(
      <View style={styles.rowContainer} key={i}>
        {rowItems}
      </View>
    );
  }

  // Function to handle refresh action
  const onRefresh = async () => {
    setRefreshing(true); // Setting refreshing state to true
    await refetch(); // Refetching journals data
    setRefreshing(false); // Setting refreshing state to false
  };

  // Rendering loading indicator while data is loading
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Rendering error message if there's an error fetching data
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

  // Rendering filtered rows of journals data
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewStyle}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Rendering filter category component */}
        <FilterCategory onFilterChange={handleFilterChange} />

        {/* Toggle layout button */}
        <View style={styles.viewStyle}>
          <TouchableOpacity onPress={toggleLayout} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}>{isSingleColumnView ? 'Grid view' : 'List view'}</Text>
          </TouchableOpacity>
        </View>

        {/* Rendering rows of journal cards */}
        {rows}
      </ScrollView>
    </View>
  );
}

// Styles for TabOneScreen component
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
  viewStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
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
