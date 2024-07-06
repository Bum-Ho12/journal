import Colors from "@/constants/Colors";
import { formatDateTime, getFirstParagraph } from "@/utils/handlers";
import { Journal } from "@/utils/types";
import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

const JournalCard = ({ journal, fill }: { journal: Journal, fill?: boolean }) => {
    // Extracting the first paragraph of content for display
    const content = getFirstParagraph(journal.content);
    // Formatting the due date if available
    const due_date = journal.due_date ? formatDateTime(journal.due_date) : null;

    return (
        // Using Expo Router's Link component to navigate to update screen
        <Link href={{
            pathname: '/update',
            params: { id: journal.id }
        }} asChild>
            {/* Pressable container for the journal card */}
            <Pressable style={{ ...styles.container, width: fill ? '95%' : 160 }}>
                {/* Journal title */}
                <Text style={styles.titleStyle}>{journal.title}</Text>
                {/* Displaying the first paragraph of journal content */}
                <Text style={styles.contentTextStyle}>{content}</Text>
                {/* Container for secondary details (e.g., category and due date) */}
                <View style={styles.secondaryContainer}>
                    {/* Journal category */}
                    <Text style={styles.secondaryTextStyle}>{journal.category}</Text>
                </View>
                {/* Displaying formatted due date if available */}
                {due_date && (
                    <View style={styles.secondaryContainer}>
                        {/* Formatted time of the due date */}
                        <Text style={styles.dateStyle}>{due_date.formattedTime}</Text>
                        {/* Formatted date of the due date */}
                        <Text style={styles.dateStyle}>{due_date.formattedDate}</Text>
                    </View>
                )}
            </Pressable>
        </Link>
    );
}

export default JournalCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: .3,
        borderColor: Colors.light.text,
        padding: 10,
        gap: 5,
        margin: 5,
        justifyContent: 'space-between'
    },
    secondaryContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        flexWrap: 'wrap',
        gap: 5
    },
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentTextStyle: {
        fontSize: 16,
    },
    dateStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        opacity: .5
    },
    secondaryTextStyle: {
        fontSize: 14,
        fontWeight: '700',
        fontStyle: 'italic',
        textAlign: 'right',
        width: '100%',
        color: Colors.light.tint,
    }
});
