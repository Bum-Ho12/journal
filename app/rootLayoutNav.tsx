import React, { useEffect, useState } from 'react';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { selectIsUserSignedIn } from '@/store/auth-slice';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

export default function RootLayoutNav() {
    const isUserSignedIn = useSelector(selectIsUserSignedIn);
    const [initialRoute, setInitialRoute] = useState<"sign-in" | "(tabs)" | null>(null);

    useEffect(() => {
        // Wait for the auth state to load before determining the initial route
        if (isUserSignedIn !== null) {
        setInitialRoute(isUserSignedIn ? '(tabs)' : 'sign-in');
        }
    }, [isUserSignedIn]);

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
