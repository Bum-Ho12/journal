import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import * as React from 'react';
import { Link, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { useRegisterUserMutation } from '@/store/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/auth-slice';
import { store } from "@/store";
import { getErrorMessage } from "@/utils/handlers";
import { AuthResponse } from "@/utils/types";


const SignUpPage = () => {
    const router = useRouter();
    const [username, setUsername] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [visible, setVisibility] = React.useState<boolean>(true);
    const [registerUser, { isLoading, error }] = useRegisterUserMutation();

    const handleSignUp = async () => {
        try {
            const user = { username, email, password };
            const response = await registerUser(user).unwrap() as AuthResponse;
            await store.dispatch(setCredentials(response));
            // Navigate to Home screen
            router.replace('/(tabs)');
        } catch (err) {
            Alert.alert('Failed to register user.');
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.textTitle}>Sign Up</Text>
                <View style={{ width: '100%', gap: 20 }}>
                    <Text style={styles.subtitleStyle}>Username</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="John Doe"
                        value={username}
                        onChangeText={(e) => setUsername(e)}
                    />
                    <Text style={styles.subtitleStyle}>Email Address</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="johndoe@gmail.com"
                        value={email}
                        onChangeText={(e) => setEmail(e)}
                        inputMode="email"
                        keyboardType="email-address"
                    />
                    <Text style={styles.subtitleStyle}>Password</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="password"
                        value={password}
                        onChangeText={(e) => setPassword(e)}
                        secureTextEntry={visible}
                    />
                    <Pressable
                        style={styles.visibilityStyle}
                        onPress={() => setVisibility((val) => !val)}
                    >
                        <Text style={styles.highlightText}>
                            {visible ? 'view' : 'hide'} password
                        </Text>
                    </Pressable>
                </View>
                <Pressable style={styles.buttonStyle} onPress={handleSignUp}>
                    <Text style={styles.buttonTextStyle}>
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </Text>
                </Pressable>
                {error && <Text style={styles.errorTextStyle}>Error: {getErrorMessage(error)}</Text>}
                <View style={styles.bottomStyle}>
                    <Text style={styles.normalText}>Have an account, </Text>
                    <Link href={'/'} asChild>
                        <Text style={styles.highlightText}>Sign In</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 30,
        gap: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
    },
    inputContainerStyle: {
        width: '100%',
        gap: 20,
    },
    inputStyle: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        backgroundColor: '#F0EEEE',
        fontSize: 18,
    },
    visibilityStyle: {
        width: '100%',
        alignItems: 'flex-end',
    },
    buttonStyle: {
        backgroundColor: Colors.light.tint,
        width: '100%',
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
    },
    bottomStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    textTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: Colors.light.tint,
    },
    subtitleStyle: {
        fontSize: 20,
        fontWeight: '600',
    },
    buttonTextStyle: {
        fontWeight: '700',
        fontSize: 20,
        color: 'white',
    },
    normalText: {
        fontSize: 18,
    },
    highlightText: {
        fontSize: 18,
        color: Colors.light.tint,
        fontWeight: '700',
    },
    errorTextStyle: {
        color: 'red',
        marginTop: 10,
    },
});

export default SignUpPage;
