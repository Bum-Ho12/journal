import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Pressable, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importing DateTimePicker component

import CategoryList from '@/components/category-list'; // Importing CategoryList component
import Colors from '@/constants/Colors'; // Importing Colors from constants
import { useCreateJournalMutation } from '@/store/api'; // Importing useCreateJournalMutation hook from store/api

export default function New() {
    const [title, setTitle] = useState(''); // State for journal title
    const [category, setCategory] = useState(''); // State for selected category
    const [content, setContent] = useState(''); // State for journal content
    const [dueDate, setDueDate] = useState<Date | undefined>(undefined); // State for due date
    const [showDatePicker, setShowDatePicker] = useState(false); // State to show/hide date picker

    const [createJournal, { isLoading, isError, isSuccess }] = useCreateJournalMutation(); // Mutation hook for creating journal entry

    // Handler for date picker change
    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false); // Hide date picker
        if (selectedDate) {
            setDueDate(selectedDate); // Set selected due date
        }
    };

    // Handler for saving journal entry
    const handleSave = () => {
        if (!title.trim() || !category.trim() || !content.trim()) {
            alert('Please fill out all fields.'); // Alert if any field is empty
            return;
        }

        const journalData: any = { title, category, content };
        if (dueDate) {
            journalData.due_date = dueDate.toISOString(); // Convert due date to ISOString if available
        }

        createJournal(journalData) // Call createJournal mutation
            .unwrap() // Unwrap the promise
            .then(() => {
                // Reset form after successful save
                setTitle('');
                setCategory('');
                setContent('');
                setDueDate(undefined);
            })
            .catch((error) => {
                console.error('Failed to create journal entry:', error); // Handle error if creation fails
            });
    };

    // Handler for canceling journal entry creation
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
                {/* Input for journal title */}
                <TextInput
                    placeholder='Title'
                    multiline
                    style={{ ...styles.inputStyle, fontSize: 24 }}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
                {/* Component for selecting category */}
                <CategoryList
                    onSelectCategory={(selectedCategory) => setCategory(selectedCategory)}
                />
                {/* Container for displaying selected due date or date picker */}
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                        {dueDate ? dueDate.toDateString() : 'Select due date'}
                    </Text>
                    {/* Button to show date picker */}
                    <Pressable style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.datePickerButtonText}>Select Date</Text>
                    </Pressable>
                </View>
                {/* Render date picker if showDatePicker is true */}
                {showDatePicker && (
                    <DateTimePicker
                        style={{ width: '100%' }}
                        value={dueDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
                {/* Input for journal content */}
                <TextInput
                    placeholder='Content...'
                    multiline
                    style={styles.inputStyle}
                    value={content}
                    onChangeText={(text) => setContent(text)}
                />
            </ScrollView>
            {/* Section for save and cancel buttons */}
            <View style={styles.buttonSectionStyle}>
                {/* Save button */}
                <Pressable style={styles.buttonStyle} onPress={handleSave}>
                    <Text style={styles.buttonTextStyle}>{isLoading ? "Saving..." : "Save"}</Text>
                </Pressable>
                {/* Cancel button */}
                <Pressable style={styles.buttonStyle} onPress={handleCancel}>
                    <Text style={styles.buttonTextStyle}>Cancel</Text>
                </Pressable>
            </View>
        </View>
    );
}

// Styles for New component
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
        fontWeight: '700'
    },
});
