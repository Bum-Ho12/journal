import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { useUpdateUserMutation } from '@/store/api';
import Colors from '@/constants/Colors';
import { store } from '@/store';

const ProfileScreen = () => {
    const [username, setUsername] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [visible, setVisibility] = React.useState<boolean>(true);
    const account = store.getState().auth.user

    const [updateUser, { isLoading,error }] = useUpdateUserMutation();

    const handleUpdateProfile = async () => {
        try {
            // user object with id, username, email, password properties
            await updateUser({ userId: email, username, email, password }).unwrap();
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            console.error('Failed to update profile:', error);
            if ((error as any).status === 401) {
                handleAuthenticationError(); // Handle authentication error
            } else {
                Alert.alert('Error', 'Failed to update profile');
            }
        }
    };

    const handleAuthenticationError = () => {
        Alert.alert('Session Expired', 'Please log in again.');
    };

    React.useEffect(()=>{
        if(account){
            setUsername(account?.username)
            setEmail(account?.email)
        }
    },[account])

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.textTitle}>Change profile</Text>
                </View>
                <Text style={styles.normalText}>Username</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Username"
                    value={username}
                    onChangeText={(e) => setUsername(e)}
                />
                <Text style={styles.normalText}>Email address</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Email"
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Text style={styles.normalText}>Password</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Password"
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                    secureTextEntry={visible}
                />
                <Pressable style={styles.buttonStyle} onPress={handleUpdateProfile}>
                    <Text style={styles.buttonTextStyle}>{isLoading ? 'Updating...' : 'Update profile'}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        gap: 20,
        justifyContent: 'flex-start',
        paddingTop: 30,
    },
    inputStyle: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        fontSize: 18,
    },
    buttonStyle: {
        backgroundColor: Colors.light.tint,
        width: '100%',
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
    },
    textTitle: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    buttonTextStyle: {
        fontWeight: '700',
        fontSize: 20,
        color: 'white',
    },
    normalText: {
        fontSize: 18,
    },
});

export default ProfileScreen;
