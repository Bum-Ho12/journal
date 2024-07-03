import Colors from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import { Pressable, Text, StyleSheet } from "react-native"

const NewNoteButton=()=>{
    return(
        <Pressable style={styles.container}>
            <Ionicons name="add-outline" size={30} color={'white'}/>
            <Text style={styles.textContainerStyle}>new journal note</Text>
        </Pressable>
    )
}


export default NewNoteButton

const styles = StyleSheet.create({
    container:{
        paddingVertical: 10,
        justifyContent:'center',
        flexDirection:'row',
        gap: 10, borderRadius: 10, backgroundColor:Colors.light.tabIconSelected,
        alignItems:'center', paddingHorizontal: 10,
    },
    textContainerStyle:{
        fontSize: 18,
        color:'white',
        fontWeight:'700'
    }
})