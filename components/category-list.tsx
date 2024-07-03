import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated } from "react-native";

const CategoryList = ({ categories }:{categories:string[]}) => {
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
        <Pressable style={styles.categoryPressStyle}
        onPress={toggleExpanded}
        >
            <Text style={styles.titleStyle}>categories</Text>
            <MaterialIcons name={expanded?"keyboard-arrow-up":"keyboard-arrow-down"} size={30}/>
        </Pressable>
        <Animated.View style={[styles.subContainer,heightStyle]}>
            <View style={styles.categoryContentStyle}>
                {categories.map((item:string,index:number)=>
                <Pressable style={styles.categoryButtonStyle} key={index}>
                    <Text style={styles.contentTextStyle}>{item}</Text>
                </Pressable>)}
            </View>
        </Animated.View>
    </View>)
}

export default CategoryList;

const styles = StyleSheet.create({
    container:{
        width:'100%',
        padding:10,
        gap: 10,
    },
    subContainer:{
        overflow:'hidden'
    },
    categoryPressStyle:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        backgroundColor: 'white',
        padding:10,
    },
    categoryContentStyle:{
        flexDirection:'row',
        justifyContent:'flex-start',
        width:'100%', flexWrap:'wrap', gap:5,
        backgroundColor: 'white',
        padding: 10
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