import Colors from "@/constants/Colors";
import { formatDateTime, getFirstParagraph } from "@/utils/handlers";
import { Journal } from "@/utils/types";
import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

const JournalCard = ({ journal,fill }:{journal:Journal,fill?:boolean}) => {
    const content = getFirstParagraph(journal.content)
    const due_date =  formatDateTime(journal.due_date)
    return(
        <Link href={{
            pathname: '/update',
            params: {id: journal.id}
        }} asChild>
            <Pressable style={{...styles.container,width:fill?'95%':160}}>
                <Text  style={styles.titleStyle}>{journal.title}</Text>
                <Text style={styles.contentTextStyle}>{content}</Text>
                <View style={styles.secondaryContainer}>
                    <Text style={styles.secondaryTextStyle}>{journal.category}</Text>
                </View>
                {journal.due_date && <View style={styles.secondaryContainer}>
                    <Text style={styles.dateStyle}>{due_date.formattedTime}</Text>
                    <Text style={styles.dateStyle}>{due_date.formattedDate}</Text>
                </View>}
            </Pressable>
        </Link>
    )
}

export default JournalCard;

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: .3,
        borderColor: Colors.light.text,
        padding: 10,
        gap: 5,
        marginLeft: 10,
        justifyContent:'space-between'
    },
    secondaryContainer:{
        flexDirection: 'row',
        justifyContent:'flex-end',
        width:'100%',
        flexWrap:'wrap',gap:5
    },
    titleStyle:{
        fontSize: 18,
        fontWeight:'bold',
    },
    contentTextStyle:{
        fontSize: 16,
    },
    dateStyle:{
        fontSize: 14,
        fontWeight:'bold',
    },
    secondaryTextStyle:{
        fontSize:14,
        fontWeight:'700',
        fontStyle:'italic',
        textAlign:'right',
        width: '100%',color: Colors.light.tint,
    }
})