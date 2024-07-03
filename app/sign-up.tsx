import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import * as React from 'react'
import { Link } from "expo-router"

const SignUpPage=()=>{
    const [username,setUsername] = React.useState<string>()
    const [email,setEmail] = React.useState<string>()
    const [password,setPassword] = React.useState<string>()
    const [visible, setVisibility] = React.useState<boolean>(true)

    return(
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.textTitle}>Sign Up</Text>
                <TextInput
                style={styles.inputStyle}
                placeholder="username" value={username}
                onChangeText={(e)=>setUsername(e)}
                />
                <TextInput
                style={styles.inputStyle}
                placeholder="email" value={email}
                onChangeText={(e)=>setEmail(e)}
                inputMode="email" keyboardType="email-address"
                />
                <TextInput
                style={styles.inputStyle}
                placeholder="password" value={password}
                onChangeText={(e)=>setPassword(e)} secureTextEntry={visible}
                />
                <Pressable style={styles.visibilityStyle}
                onPress={()=>setVisibility((val)=> !val)}>
                    <Text style={styles.highlightText}>{visible?'view':'hide'} password</Text>
                </Pressable>
                <Pressable style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>Sign Up</Text>
                </Pressable>
                <Link href={'/sign-in'}>
                    <View  style={styles.bottomStyle}>
                        <Text style={styles.normalText}>Have an account, </Text>
                        <Text style={styles.highlightText}>Sign In</Text>
                    </View>
                </Link>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        paddingHorizontal: 20,
        gap: 20,
        justifyContent:'center',
        alignItems:'center'
    },
    inputStyle:{
        width:'100%',
        paddingVertical: 10,
        borderRadius: 30,
        alignItems:'flex-start',
        paddingHorizontal: 20,
        backgroundColor:'white',
        fontSize: 18
    },
    visibilityStyle:{
        width:'100%',
        alignItems:'flex-end',
    },
    buttonStyle:{
        backgroundColor:'blue',
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
        fontWeight: 'bold'
    },
    buttonTextStyle:{
        fontWeight:'700',
        fontSize: 20,
        color:'white'
    },
    normalText:{
        fontSize: 16,
    },
    highlightText:{
        fontSize:16,
        color:'blue',
    }
})


export default SignUpPage