import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import * as React from 'react'
import { Link } from "expo-router"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import Colors from "@/constants/Colors"

const SignInPage=()=>{
    const [username,setUsername] = React.useState<string>()
    const [email,setEmail] = React.useState<string>()
    const [password,setPassword] = React.useState<string>()
    const [visible, setVisibility] = React.useState<boolean>(true)

    return(
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.buttonStyle}>
                    <Ionicons name="person-circle-outline" size={30} color={Colors.light.tint}/>
                    <Link href={'/profile'}>
                        <Text style={styles.normalText}>Profile</Text>
                    </Link>
                </View>
                <View style={styles.buttonStyle}>
                    <MaterialIcons name="password" size={30} color={Colors.light.tint}/>
                    <Link href={'/password'}>
                        <Text style={styles.normalText}>Password</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        paddingVertical: 20,
        gap: 5,
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    buttonStyle:{
        flexDirection:'row',
        gap: 10,
        alignItems:'center',
        width:'100%', padding: 10,
        backgroundColor:Colors.light.background
    },
    normalText:{
        fontSize: 18,
        fontWeight:'700'
    },
    highlightText:{
        fontSize:16,
        color:'blue',
    }
})


export default SignInPage