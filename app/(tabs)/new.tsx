import CategoryList from '@/components/category-list';
import Colors from '@/constants/Colors';
import { categories } from '@/data/test-data';
import React from 'react';
import { StyleSheet, View, ScrollView, TextInput, Pressable,Text } from 'react-native';

export default function New() {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}>
            <TextInput placeholder='Title' multiline
                style={{...styles.inputStyle, fontSize: 24}}
            />
            <CategoryList categories={categories}/>
                <TextInput placeholder='content...' multiline
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
        width:'90%',
        backgroundColor:'white',
        paddingHorizontal:10,
        margin: 20, borderRadius: 10
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
