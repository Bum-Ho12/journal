import React, { useEffect, useState } from 'react';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { selectIsUserSignedIn } from '@/store/auth-slice';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { store } from '@/store';

export default function RootLayoutNav() {
    const [initialRoute, setInitialRoute] = useState<"index" | "(tabs)" | null>(null);

    useEffect(() => {
        const isLoggedIn = store.getState().auth.isSignedIn
        // Wait for the auth state to load before determining the initial route
        if (isLoggedIn !== null) {
        setInitialRoute(isLoggedIn ? '(tabs)' : 'index');
        }
    }, []);

    if (initialRoute === null) {
        // Show a loading indicator while determining the initial route
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        );
    }

    return (
        <ThemeProvider value={DefaultTheme}>
        <Stack initialRouteName={initialRoute}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{
            title: 'Profile',
            headerTitleStyle: styles.titleStyle,
            }} />
            <Stack.Screen name="update" options={{
            title: 'Update Journal',
            headerTitleStyle: styles.titleStyle,
            }} />
        </Stack>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        width: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
