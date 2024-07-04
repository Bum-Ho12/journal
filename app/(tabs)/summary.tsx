import JournalCard from '@/components/journal-card';
import Colors from '@/constants/Colors';
import { journals } from '@/data/test-data';
import React from 'react';
import { StyleSheet, View , FlatList, ScrollView, Text } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Text style={styles.tabTextStyle}>Monthly</Text>
        <Text style={styles.tabTextStyle}>Weekly</Text>
        <Text style={styles.tabTextStyle}>Daily</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewStyle}>
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
    width:'100%', paddingTop: 10
  },
  tabContainer:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    width:'95%',paddingVertical:10,
    alignItems:'center',
    backgroundColor:Colors.light.background,
    borderRadius: 7
  },

  scrollViewStyle:{
    width:'100%',
    paddingVertical:10,
    alignItems:'center'
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
  tabTextStyle:{
    fontSize: 18,
    fontWeight:'700',
    color:Colors.light.tabIconSelected
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
