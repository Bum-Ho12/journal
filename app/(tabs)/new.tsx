import CategoryList from '@/components/category-list';
import Colors from '@/constants/Colors';
import { categories } from '@/data/test-data';
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Pressable, Text } from 'react-native';
import { useCreateJournalMutation } from '@/store/api'; // Adjust the path based on your project structure

export default function New() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');

    const [createJournal, { isLoading, isError, isSuccess }] = useCreateJournalMutation();

    const handleSave = () => {
        if (!title.trim() || !category.trim() || !content.trim()) {
            alert('Please fill out all fields.');
            return;
        }

        createJournal({ title, category, content })
            .unwrap()
            .then(() => {
                // Optionally handle success
                console.log('Journal entry created successfully.');
                // Reset form fields if needed
                setTitle('');
                setCategory('');
                setContent('');
            })
            .catch((error) => {
                // Handle error if necessary
                console.error('Failed to create journal entry:', error);
            });
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}>
                <TextInput
                    placeholder='Title'
                    multiline
                    style={{ ...styles.inputStyle, fontSize: 24 }}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
                <CategoryList
                    categories={categories}
                    onSelectCategory={(selectedCategory) => setCategory(selectedCategory)}
                />
                <TextInput
                    placeholder='Content...'
                    multiline
                    style={styles.inputStyle}
                    value={content}
                    onChangeText={(text) => setContent(text)}
                />
            </ScrollView>
            <View style={styles.buttonSectionStyle}>
                <Pressable style={styles.buttonStyle} onPress={handleSave}>
                    <Text style={styles.buttonTextStyle}>Save</Text>
                </Pressable>
                <Pressable style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>Cancel</Text>
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
