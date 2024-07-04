import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import * as React from 'react'
import { Link } from "expo-router"
import Colors from "@/constants/Colors"

const SignInPage=()=>{
    const [username,setUsername] = React.useState<string>()
    const [email,setEmail] = React.useState<string>()
    const [password,setPassword] = React.useState<string>()
    const [visible, setVisibility] = React.useState<boolean>(true)

    return(
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.textTitle}>Sign In</Text>
                <View style={{width: '100%', gap: 20}}>
                    <Text style={styles.subtitleStyle}>Email</Text>
                    <TextInput
                    style={styles.inputStyle}
                    placeholder="johndoe@gmail.com" value={email}
                    onChangeText={(e)=>setEmail(e)}
                    />
                    <Text style={styles.subtitleStyle}>Password</Text>
                    <TextInput
                    style={styles.inputStyle}
                    placeholder="password" value={password}
                    onChangeText={(e)=>setPassword(e)} secureTextEntry={visible}
                    />
                    <Pressable style={styles.visibilityStyle}
                    onPress={()=>setVisibility((val)=> !val)}>
                        <Text style={styles.highlightText}>{visible?'view':'hide'} password</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>Sign In</Text>
                </Pressable>
                <View  style={styles.bottomStyle}>
                    <Text style={styles.normalText}>Don't have an account,</Text>
                    <Link href={'/sign-up'} asChild>
                        <Text style={styles.highlightText}>Sign Up</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        paddingHorizontal: 30,
        gap: 20,
        justifyContent:'space-evenly',
        alignItems:'center',
        backgroundColor:Colors.light.background
    },
    inputContainerStyle:{
        width: '100%', gap: 20
    },
    inputStyle:{
        width:'100%',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems:'flex-start',
        paddingHorizontal: 20,
        backgroundColor:'#F0EEEE',
        fontSize: 18
    },
    visibilityStyle:{
        width:'100%',
        alignItems:'flex-end',
    },
    buttonStyle:{
        backgroundColor:Colors.light.tint,
        width:'100%',
        paddingVertical:10,
        borderRadius: 30, alignItems:'center'
    },
    bottomStyle:{
        flexDirection:'row',
        justifyContent:'center',
        width:'100%',
    },
    textTitle:{
        fontSize: 36,
        fontWeight: 'bold',
        color:Colors.light.tint
    },
    subtitleStyle:{
        fontSize: 20,
        fontWeight:'600'
    },
    buttonTextStyle:{
        fontWeight:'700',
        fontSize: 20,
        color:'white'
    },
    normalText:{
        fontSize: 18,
    },
    highlightText:{
        fontSize:18,
        color:Colors.light.tint,
        fontWeight:'700'
    }
})


export default SignInPage