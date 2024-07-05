import Colors from "@/constants/Colors";
import { Category } from "@/utils/types";
import { MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated, TextInput } from "react-native";

interface CategoryListProps {
    categories: Category[];
    onSelectCategory: (selectedCategory: string) => void;
}

const CategoryList = ({ categories, onSelectCategory }: CategoryListProps) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const animation = useRef(new Animated.Value(0)).current;

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
                    placeholder="category"
                    style={{ ...styles.inputStyle, color: Colors.light.text }}
                    value={selectedCategory}
                    editable={false}
                />
                <MaterialIcons name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={30} />
            </Pressable>
            <Animated.View style={[styles.subContainer, heightStyle]}>
                <View style={styles.categoryContentStyle}>
                    {categories.map((item: Category, index: number) => (
                        <Pressable
                            style={styles.categoryButtonStyle}
                            key={index}
                            onPress={() => {
                                setSelectedCategory(item.name);
                                onSelectCategory(item.name); // Pass selected category back to parent
                                toggleExpanded();
                            }}
                        >
                            <Text style={styles.contentTextStyle}>{item.name}</Text>
                        </Pressable>
                    ))}
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
        width: '80%'
    },
    contentTextStyle: {
        fontSize: 16,
        fontWeight: "700",
    },
});
