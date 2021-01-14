import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 


const CartItem =(props) => {
    return(
        <View style={styles.cartItem}>
        <View style={styles.itemData}>
        <Text style={styles.quantitity}>{props.quantity}</Text>
        <View style={styles.titleview}>
        <Text style={styles.maintext}>{props.title}</Text>
        </View>
            </View>
        <View style={styles.itemData}>
        <Text style={styles.maintext}>{props.amount.toFixed(2)}</Text>
        {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deletebutton}>
            <Ionicons name="trash-outline" size={23} color="red" />
        </TouchableOpacity> }
        </View>
        </View>
    )
};

const styles = StyleSheet.create({
    cartItem:{
        padding:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20
    },
    itemData:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    quantitity:{
        color:'#888',
        fontSize:16
    },
    maintext:{
        fontSize:16
    },
    deletebutton:{
        marginLeft:20,
    },
    titleview:{
        position:'absolute',
        marginLeft:20,
    }
})



export default CartItem;