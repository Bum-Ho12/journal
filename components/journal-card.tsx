import Colors from "@/constants/Colors";
import { Journal } from "@/utils/types";
import { View, Text, StyleSheet } from "react-native";

const JournalCard = ({ journal }:{journal:Journal}) => {
    return(
        <View style={styles.container}>
            <Text  style={styles.titleStyle}>{journal.title}</Text>
            <Text style={styles.contentTextStyle}>{journal.content}</Text>
            <View style={styles.secondaryContainer}>
                <Text style={styles.secondaryTextStyle}>{journal.category}</Text>
                <Text style={styles.secondaryTextStyle}>{journal.date}</Text>
            </View>
        </View>
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
        gap: 8,width:160,
        marginLeft: 10, justifyContent:'space-between'
    },
    secondaryContainer:{
        flexDirection: 'row',
        justifyContent:'flex-end',
        width:'100%',paddingHorizontal:5,
        flexWrap:'wrap',gap:5
    },
    titleStyle:{
        fontSize: 18,
        fontWeight:'bold',
    },
    contentTextStyle:{
        fontSize: 16,
    },
    secondaryTextStyle:{
        fontSize:14,
        fontWeight:'700',
        fontStyle:'italic',
        textAlign:'right',
        width: '100%',color: Colors.light.tint
    }
})