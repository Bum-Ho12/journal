import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useDispatch } from 'react-redux';
import { logOut } from '@/store/auth-slice';
import { useRouter } from 'expo-router';
import { store } from '@/store';

export default function AccountScreen() {
    const user = store.getState().auth.user;
    const dispatch = useDispatch();
    const router = useRouter();

    const handleEditProfile = () => {
        // Navigate to edit profile screen
        router.push('/profile')
    };

    const handleLogout = () => {
        // Dispatch the logOut action to clear authentication state
        dispatch(logOut());
        // Navigate to initial route screen (login screen)
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            {/* Profile Details Section */}
            <View style={styles.profileContainer}>
                <Ionicons name='person-circle-outline' style={styles.avatar} size={100} color={Colors.light.tint} />
                <Text style={styles.username}>{user?.username}</Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>

            {/* Edit and Logout Buttons */}
            <View style={styles.buttonContainer}>
                <Pressable style={styles.editButton} onPress={handleEditProfile}>
                    <Ionicons name="create-outline" size={30} color={Colors.light.tint} />
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </Pressable>
                <Pressable style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={30} color="red" />
                    <Text style={styles.buttonText}>Logout</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal:10,
    },
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        backgroundColor:Colors.light.background,
        borderRadius: 10,
        padding: 10,
        width: '100%'
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        marginBottom: 5,
        color:Colors.light.tint
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    buttonContainer: {
        // flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 10,
        width: '100%',borderRadius:10,
        padding: 10,backgroundColor: Colors.light.background,

    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    buttonText: {
        // color: 'white',
        marginLeft: 10,
        fontSize: 18,
        fontWeight: '600'
    },
});
