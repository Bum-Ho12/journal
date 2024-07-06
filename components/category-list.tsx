import { MaterialIcons } from "@expo/vector-icons";
import { useRef, useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Animated, TextInput } from "react-native";
import { useGetCategoriesQuery } from "@/store/api";
import { Category } from "@/utils/types";
import Colors from "@/constants/Colors";

interface CategoryListProps {
    onSelectCategory: (selectedCategory: string) => void;
    selectedCategory?: string;
}

const CategoryList = ({ onSelectCategory, selectedCategory }: CategoryListProps) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [currentCategory, setCurrentCategory] = useState<string | undefined>(selectedCategory);
    const animation = useRef(new Animated.Value(0)).current;

    const { data: categories = [], isLoading, isError } = useGetCategoriesQuery({}); // Fetch categories

    useEffect(() => {
        setCurrentCategory(selectedCategory);
    }, [selectedCategory]);

    const toggleExpanded = () => {
        if (categories.length > 0) {
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
            outputRange: [0, categories.length * 70],
        }),
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.categoryPressStyle} onPress={toggleExpanded}>
                <TextInput
                    placeholder="Category"
                    style={{ ...styles.inputStyle, color: Colors.light.text }}
                    value={currentCategory}
                    editable={false}
                />
                <MaterialIcons name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={30} />
            </Pressable>
            <Animated.View style={[styles.subContainer, heightStyle]}>
                <View style={styles.categoryContentStyle}>
                    {isLoading ? (
                        <Text>Loading categories...</Text>
                    ) : isError ? (
                        <Text>Error fetching categories</Text>
                    ) : (
                        categories.map((item: Category, index: number) => (
                            <Pressable
                                style={styles.categoryButtonStyle}
                                key={index}
                                onPress={() => {
                                    setCurrentCategory(item.name);
                                    onSelectCategory(item.name);
                                    toggleExpanded();
                                }}
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

export default CategoryList;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        gap: 10,
    },
    subContainer: {
        overflow: "hidden",
    },
    categoryPressStyle: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: 10,
    },
    categoryContentStyle: {
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
        flexWrap: "wrap",
        gap: 5,
        backgroundColor: "white",
        padding: 10,
    },
    categoryButtonStyle: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.light.text,
    },
    inputStyle: {
        fontSize: 16,
        fontWeight: "600",
        width: '80%',
    },
    contentTextStyle: {
        fontSize: 16,
        fontWeight: "700",
    },
});
