import React,{useState} from 'react';
import {View,Text,Button,StyleSheet} from 'react-native';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';


const OrderItem = (props) => {

const [showDetails, setShowDetails] = useState(false)    
    return(
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalamount}>{props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title='Show Details' onPress={() => {setShowDetails(!showDetails)}}/>
            {showDetails && <View> 
                {props.items.map(cartItem => <CartItem key={cartItem.productId} quantity={cartItem.quantity} amount={cartItem.sum} title={cartItem.productTitle}/>)}
                </View>}
        </View>

    )
};

const styles=StyleSheet.create({
    orderItem:{
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent:'flex-start',
    paddingTop:50,
    },
    totalamount:{
        fontSize:16
    },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%'
    },
    date:{
        fontSize:16,
        color:'#888'
    },
});

export default OrderItem;