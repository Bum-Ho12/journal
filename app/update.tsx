import CategoryList from '@/components/category-list';
import Colors from '@/constants/Colors';
import { categories, journals } from '@/data/test-data';
import { Journal } from '@/utils/types';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View, ScrollView, TextInput, Pressable,Text } from 'react-native';

export default function Update() {
    const{id} = useLocalSearchParams()
    const [title,setTitle] = React.useState<string>()
    const [content,setContent] = React.useState<string>()
    const [category,setCategory] = React.useState<string>()

    React.useEffect(()=>{
        const journal = journals.find((item:Journal)=>item.id===id)
        setTitle(journal?.title)
        setContent(journal?.content)
        setCategory(journal?.category)
    },[])
    return (
        <View style={styles.container}>
            <TextInput placeholder='Title' multiline
                value={title} onChangeText={(e)=>setTitle(e)}
                style={{...styles.inputStyle, fontSize: 24}}
            />
            <CategoryList categories={categories}/>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}>
                <TextInput placeholder='content...' multiline
                    value={content} onChangeText={(e)=>setContent(e)}
                style={styles.inputStyle}
            />
            </ScrollView>
            <View style={styles.buttonSectionStyle}>
                <Pressable style={styles.buttonStyle}><Text style={styles.buttonTextStyle}>Save</Text></Pressable>
                <Pressable style={styles.buttonStyle}><Text style={styles.buttonTextStyle}>Cancel</Text></Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        backgroundColor:'white',
        paddingHorizontal:10
    },
    scrollViewStyle:{
        width:'100%',
        paddingVertical:10
    },
    inputStyle:{
        width:'100%',
        paddingVertical: 10,
        alignItems:'flex-start',
        paddingHorizontal: 10,
        fontSize: 18
    },
    buttonSectionStyle:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%',
        alignItems:'center',
        padding: 10,
        backgroundColor:Colors.light.background
    },
    buttonStyle:{
        borderRadius:15,
        // backgroundColor:Colors.light.tint,
        paddingHorizontal: 20,
        paddingVertical:10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonTextStyle:{
        fontSize: 18,
        fontWeight:'600',
        color: Colors.light.tint,
    }
});
