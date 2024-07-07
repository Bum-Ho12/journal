import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated, TextInput } from "react-native";
import { useGetCategoriesQuery } from "@/store/api";
import { Category } from "@/utils/types";
import Colors from "@/constants/Colors";

interface FilterCategoryProps {
    onFilterChange: (searchTerm: string, selectedCategory: string) => void;
}

const FilterCategory = ({ onFilterChange }: FilterCategoryProps) => {
    const [expanded, setExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const animation = useRef(new Animated.Value(0)).current;

    const { data: fetchedCategories = [], isLoading, isError } = useGetCategoriesQuery({}); // Fetch categories

    const toggleExpanded = () => {
        if (fetchedCategories.length > 0) {
            Animated.timing(animation, {
                toValue: expanded ? 0 : 1,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setExpanded(!expanded));
        }
    };

    const heightStyle = {
        maxHeight: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, fetchedCategories.length * 70],
        }),
    };

    const handleSearch = (text: string) => {
        setSearchTerm(text);
        onFilterChange(text, selectedCategory);
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        onFilterChange(searchTerm, category);
        toggleExpanded();
    };

    return (
        <View style={styles.container}>
            <View style={styles.categoryPressStyle}>
                <Ionicons name="search" size={30} />
                <TextInput
                    placeholder="search..."
                    style={styles.inputStyle}
                    value={searchTerm}
                    onChangeText={handleSearch}
                />
                <Pressable onPress={toggleExpanded}>
                    <Ionicons
                        name={expanded ? "close-circle-outline" : "filter"}
                        size={30}
                        color={Colors.light.tint}
                    />
                </Pressable>
            </View>
            <Animated.View style={[styles.subContainer, heightStyle]}>
                <Text style={styles.titleStyle}>Categories</Text>
                <View style={styles.categoryContentStyle}>
                    <Pressable
                        style={styles.categoryButtonStyle}
                        onPress={() => handleCategorySelect('')}
                    >
                        <Text style={styles.contentTextStyle}>All</Text>
                    </Pressable>
                    {isLoading ? (
                        <Text>Loading categories...</Text>
                    ) : isError ? (
                        <Text>Error fetching categories</Text>
                    ) : (
                        fetchedCategories.map((item: Category, index: number) => (
                            <Pressable
                                style={styles.categoryButtonStyle}
                                key={index}
                                onPress={() => handleCategorySelect(item.name)}
                            >
                                <Text style={styles.contentTextStyle}>{item.name}</Text>
                            </Pressable>
                        ))
                    )}
                </View>
            </Animated.View>
        </View>
    );
};

export default FilterCategory;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: 10,
        gap: 10,
    },
    subContainer: {
        overflow: 'hidden',
        gap: 10,
    },
    inputStyle: {
        width: '80%',
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        fontSize: 18,
    },
    categoryPressStyle: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: Colors.light.background,
        alignItems: 'center',
        borderRadius: 10,
    },
    categoryContentStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        flexWrap: 'wrap',
        gap: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    categoryButtonStyle: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.light.text,
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: '600',
    },
    contentTextStyle: {
        fontSize: 16,
        fontWeight: '700',
    },
});
