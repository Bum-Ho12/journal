import CategoryList from '@/components/category-list';
import Colors from '@/constants/Colors';
import { categories } from '@/data/test-data';
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Pressable, Text, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useCreateJournalMutation } from '@/store/api';

export default function New() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [createJournal, { isLoading, isError, isSuccess }] = useCreateJournalMutation();

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false); // Hide date picker
        if (selectedDate) {
            setDueDate(selectedDate);
        }
    };

    const handleSave = () => {
        if (!title.trim() || !category.trim() || !content.trim()) {
            alert('Please fill out all fields.');
            return;
        }

        const journalData: any = { title, category, content };
        if (dueDate) {
            journalData.due_date = dueDate.toISOString(); // Convert to ISOString
        }

        createJournal(journalData)
            .unwrap()
            .then(() => {
                // Reset form
                setTitle('');
                setCategory('');
                setContent('');
                setDueDate(undefined);
            })
            .catch((error) => {
                // Handle error
                console.error('Failed to create journal entry:', error);
            });
    };

    const handleCancel = () => {
        // Reset form
        setTitle('');
        setCategory('');
        setContent('');
        setDueDate(undefined);
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
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                        {dueDate ? dueDate.toDateString() : 'Select due date'}
                    </Text>
                    <Pressable style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.datePickerButtonText}>Select Date</Text>
                    </Pressable>
                </View>
                {showDatePicker && (
                    <DateTimePicker
                        style={{ width: '100%' }}
                        value={dueDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
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
                    <Text style={styles.buttonTextStyle}>{isLoading?"Saving...":"Save"}</Text>
                </Pressable>
                <Pressable style={styles.buttonStyle} onPress={handleCancel}>
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
    buttonTextStyle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.light.tint,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    dateText: {
        fontSize: 18,
        paddingHorizontal: 10,
    },
    datePickerButton: {
        backgroundColor: Colors.light.background,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    datePickerButtonText: {
        fontSize: 18,
        color: Colors.light.tint,
        fontWeight:'700'
    },
});
