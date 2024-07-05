import React from 'react';
import { StyleSheet, View, ScrollView, TextInput, Pressable, Text, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useUpdateJournalMutation, useDeleteJournalMutation } from '@/store/api';
import { Journal } from '@/utils/types';
import CategoryList from '@/components/category-list';
import Colors from '@/constants/Colors';
import { store } from '@/store';
import { categories } from '@/data/test-data';

export default function Update() {
    const { id } = useLocalSearchParams();
    const [title, setTitle] = React.useState<string>('');
    const [content, setContent] = React.useState<string>('');
    const [category, setCategory] = React.useState<string>('');
    const [updateJournal, { isLoading: isUpdating }] = useUpdateJournalMutation();
    const [deleteJournal, { isLoading: isDeleting }] = useDeleteJournalMutation();
    const journals =  store.getState().journals.journals

    React.useEffect(() => {
        const journal = journals.find((item: Journal) => item.id === id);
        if (journal) {
            setTitle(journal.title);
            setContent(journal.content);
            setCategory(journal.category);
        }
    }, [id]);

    const handleUpdate = async () => {
        try {
            await updateJournal({ id, title, content, category }).unwrap();
            Alert.alert('Success', 'Journal updated successfully');
        } catch (error) {
            console.error('Failed to update journal:', error);
            Alert.alert('Error', 'Failed to update journal');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteJournal(id).unwrap();
            Alert.alert('Success', 'Journal deleted successfully');
        } catch (error) {
            console.error('Failed to delete journal:', error);
            Alert.alert('Error', 'Failed to delete journal');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}>
                <TextInput
                    placeholder="Title"
                    multiline
                    value={title}
                    onChangeText={(e) => setTitle(e)}
                    style={{ ...styles.inputStyle, fontSize: 24 }}
                />
                <CategoryList categories={categories} selectedCategory={category} onSelectCategory={setCategory} />
                <TextInput
                    placeholder="Content..."
                    multiline
                    value={content}
                    onChangeText={(e) => setContent(e)}
                    style={styles.inputStyle}
                />
            </ScrollView>
            <View style={styles.buttonSectionStyle}>
                <Pressable style={styles.buttonStyle} onPress={handleUpdate}>
                    <Text style={styles.buttonTextStyle}>{isUpdating ? 'Saving...' : 'Save'}</Text>
                </Pressable>
                <Pressable style={styles.buttonStyle} onPress={handleDelete}>
                    <Ionicons name="archive-outline" size={32} color={Colors.light.tint} />
                </Pressable>
                <Pressable style={styles.buttonStyle} onPress={handleDelete}>
                    <MaterialCommunityIcons name="trash-can-outline" size={36} color={Colors.light.tint} />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        margin: 20,
        borderRadius: 10,
    },
    scrollViewStyle: {
        width: '100%',
        paddingVertical: 10,
    },
    inputStyle: {
        width: '100%',
        paddingVertical: 10,
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        fontSize: 18,
    },
    buttonSectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.light.background,
        borderTopWidth: 1.5,
        borderColor: Colors.light.tint,
    },
    buttonStyle: {
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonTextStyle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.light.tint,
    },
});
