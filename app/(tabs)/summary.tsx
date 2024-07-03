import JournalCard from '@/components/journal-card';
import { journals } from '@/data/test-data';
import React from 'react';
import { StyleSheet, View , FlatList, ScrollView } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}>
        <FlatList scrollEnabled={false} data={journals}
        renderItem={({item})=><JournalCard journal={item}/>}
        contentContainerStyle={styles.listStyle} numColumns={2}
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
    width:'100%',paddingBottom: 20,
    paddingVertical:10
  },
  listStyle:{
    gap:10,
    width:'100%',
    alignItems:'center',paddingBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
