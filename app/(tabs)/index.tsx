import FilterCategory from '@/components/filter';
import JournalCard from '@/components/journal-card';
import { categories, journals } from '@/data/test-data';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewStyle}>
        {/* <NewNoteButton/> */}
        <FilterCategory categories={categories}/>
        <FlatList scrollEnabled={false} data={journals}
        contentContainerStyle={styles.listStyle}
        renderItem={({item})=><JournalCard journal={item}/>}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}/>
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
    paddingVertical:20,
    paddingBottom: 10, alignItems:'center'
  },
  listStyle:{
    gap:10,
    width:'100%',
    alignItems:'stretch',
    justifyContent:'center',
    paddingBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
