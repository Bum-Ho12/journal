import React, { useEffect, useState } from 'react';
import {
    Pressable, SafeAreaView, StyleSheet, Text,
    TextInput, View, ActivityIndicator
} from 'react-native';
import { Link, useRouter } from "expo-router"; // Importing Link and useRouter from expo-router
import Colors from "@/constants/Colors"; // Importing Colors from constants
import { useLoginUserMutation } from '@/store/api'; // Importing useLoginUserMutation from api
import { loadCredentials, setCredentials } from '@/store/auth-slice'; // Importing loadCredentials and setCredentials from auth-slice
import { store } from "@/store"; // Importing store from store
import { getErrorMessage } from '@/utils/handlers'; // Importing getErrorMessage from handlers
import { AuthResponse } from '@/utils/types'; // Importing AuthResponse from types

const SignInPage = () => {
    const router = useRouter(); // useRouter hook for navigation
    const [email, setEmail] = useState<string>(''); // State for email input
    const [password, setPassword] = useState<string>(''); // State for password input
    const [visible, setVisibility] = useState<boolean>(true); // State for password visibility toggle
    const [isLoadingAccount, setLoadingAccount] = useState<boolean>(true); // State for loading account state
    const [signInUser, { isLoading, error }] = useLoginUserMutation(); // useLoginUserMutation hook for signing in user

    useEffect(() => {
        const loadAccount = async () => {
            try {
                await store.dispatch(loadCredentials()).then((res) => {
                    const user = store.getState().auth.user; // Getting user details from Redux store
                    if (user) {
                        router.replace('/(tabs)'); // Redirect to home screen if user is authenticated
                    } else {
                        setLoadingAccount(false); // Set loading account state to false
                    }
                });
            } catch (error) {
                console.error('Error loading account:', error); // Log error if loading account fails
                setLoadingAccount(false); // Set loading account state to false
            }
        };
        loadAccount(); // Call loadAccount function on component mount
    }, []);

    const handleSignIn = async () => {
        try {
            const user = { email, password }; // Create user object with email and password
            const response = await signInUser(user).unwrap() as AuthResponse; // Sign in user and unwrap response
            await store.dispatch(setCredentials(response)); // Set user credentials in Redux store
            router.replace('/(tabs)'); // Redirect to home screen after successful sign-in
        } catch (err) {
            console.error('Failed to sign in: ', err); // Log error if sign-in fails
        }
    };

    if (isLoadingAccount) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.light.tint} />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.textTitle}>Sign In</Text>
                <View style={{ width: '100%', gap: 20 }}>
                    <Text style={styles.subtitleStyle}>Email</Text>
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
                <Pressable style={styles.buttonStyle} onPress={handleSignIn}>
                    <Text style={styles.buttonTextStyle}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Text>
                </Pressable>
                {error && <Text style={styles.errorTextStyle}>Error: {getErrorMessage(error)}</Text>}
                <View style={styles.bottomStyle}>
                    <Text style={styles.normalText}>Don't have an account, </Text>
                    <Link href={'/sign-up'} asChild>
                        <Text style={styles.highlightText}>Sign Up</Text>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
    },
    loadingImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    loadingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginTop: 10,
    },
});

export default SignInPage;
