import Colors from "@/constants/Colors";
import { Category } from "@/utils/types";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated, TextInput } from "react-native";

const FilterCategory = ({ categories }:{categories:Category[]}) => {
    const [expanded,setExpanded] = useState<boolean>(false)
    const animation = useRef(new Animated.Value(0)).current

    const toggleExpanded =()=>{
        if(categories.length>0){
            Animated.timing(animation,{
                toValue:expanded?0:1,
                duration:300,
                useNativeDriver:false,
            }).start(()=>setExpanded(!expanded))
        }
    }

    const heightStyle = {
        maxHeight:animation.interpolate({
            inputRange:[0,1],
            outputRange:[0,categories.length * 70]
        })
    }

    return (<View style={styles.container}>
        <View style={styles.categoryPressStyle}>
            <Ionicons name="search" size={30}/>
            <TextInput placeholder="search..."
                style={styles.inputStyle}
            />
            <Pressable
            onPress={toggleExpanded}
            >
                <Ionicons name={expanded?"close-circle-outline":"filter"} size={30}
                color={Colors.light.tint}/>
            </Pressable>
        </View>
        <Animated.View style={[styles.subContainer,heightStyle]}>
            <Text style={styles.titleStyle}>categories</Text>
            <View style={styles.categoryContentStyle}>
                {categories.map((item:Category,index:number)=>
                <Pressable style={styles.categoryButtonStyle} key={index}>
                    <Text style={styles.contentTextStyle}>{item.name}</Text>
                </Pressable>)}
            </View>
        </Animated.View>
    </View>)
}

export default FilterCategory;

const styles = StyleSheet.create({
    container:{
        width:'100%',
        padding:10,
        gap: 10,
        marginBottom: 10
    },
    subContainer:{
        overflow:'hidden', gap: 10
    },
    inputStyle:{
        width:'80%',
        paddingVertical: 10,
        borderRadius: 30,
        alignItems:'flex-start',
        paddingHorizontal: 20,
        fontSize: 18
    },
    categoryPressStyle:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        padding:10,
        backgroundColor:Colors.light.background,
        alignItems:'center',borderRadius: 10
    },
    categoryContentStyle:{
        flexDirection:'row',
        justifyContent:'flex-start',
        width:'100%', flexWrap:'wrap', gap:5,
        backgroundColor: 'white',
        padding: 20,borderRadius: 10
    },
    categoryButtonStyle:{
        padding: 10,
        borderRadius: 10,
        borderWidth: .5,
        borderColor: Colors.light.text,
    },
    titleStyle:{
        fontSize: 16,
        fontWeight:'600'
    },
    contentTextStyle:{
        fontSize:16,
        fontWeight:'700'
    }
})