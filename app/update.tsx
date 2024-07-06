import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Pressable, Text, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useUpdateJournalMutation, useDeleteJournalMutation } from '@/store/api';
import { Journal } from '@/utils/types';
import { store } from '@/store';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CategoryList from '@/components/category-list';
import Colors from '@/constants/Colors';
import { categories } from '@/data/test-data';

export default function Update() {
    const router = useRouter()
    const { id } = useLocalSearchParams();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const journals = store.getState().journals.journals;

    const [updateJournal, { isLoading: isUpdating }] = useUpdateJournalMutation();
    const [deleteJournal, { isLoading: isDeleting }] = useDeleteJournalMutation();

    useEffect(() => {
        if (journals.length > 0 && id ) {
            const journal = journals.find((item: Journal) => item.id === parseInt(id.toString() as string));
            if (journal) {
                setTitle(journal.title);
                setContent(journal.content);
                setCategory(journal.category);
                setDueDate(new Date(journal.due_date));
            } else {
                Alert.alert(`Journal not found`);
            }
        }
    }, [id]);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false); // Hide date picker
        if (selectedDate) {
            setDueDate(selectedDate);
        }
    };

    const handleUpdate = async () => {
        try {
            await updateJournal({ id, title, content, category, due_date: dueDate?.toISOString() }).unwrap();
            Alert.alert('Success', 'Journal updated successfully');
            router.back()
        } catch (error) {
            Alert.alert('Error', 'Failed to update journal');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteJournal(id).unwrap();
            Alert.alert('Success', 'Journal deleted successfully');
            router.back()
        } catch (error) {
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
                    onChangeText={(text) => setTitle(text)}
                    style={{ ...styles.inputStyle, fontSize: 24 }}
                />
                <CategoryList categories={categories} selectedCategory={category} onSelectCategory={setCategory} />
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
                    placeholder="Content..."
                    multiline
                    value={content}
                    onChangeText={(text) => setContent(text)}
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
                {isDeleting?<Pressable style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>Deleting...</Text>
                </Pressable>:
                <Pressable style={styles.buttonStyle} onPress={handleDelete}>
                    <MaterialCommunityIcons name="trash-can-outline" size={36} color={Colors.light.tint} />
                </Pressable>}
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
    },
});
