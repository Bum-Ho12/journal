import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text, ScrollView, FlatList, useWindowDimensions } from 'react-native';
import FilterCategory from '@/components/filter';
import JournalCard from '@/components/journal-card';
import { categories, journals } from '@/data/test-data';
import { Journal } from '@/utils/types';

export default function TabOneScreen() {
  const windowWidth = useWindowDimensions().width;

  // Calculate number of columns based on screen width
  const numColumns = Math.floor(windowWidth / 160);

  const [data, setData] = useState(journals);

  const renderItem = ({ item, index }:{item:Journal,index:number}) => (
    <JournalCard
      journal={item} key={index}
    />
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewStyle}>
        <FilterCategory categories={categories}/>
        <FlatList
          data={data} scrollEnabled={false}
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
    width:'100%'
  },
  scrollViewStyle:{
    width:'100%',
    paddingTop:5,
    paddingBottom: 10, alignItems:'center'
  },
  listStyle:{
    gap:10,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    paddingBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
