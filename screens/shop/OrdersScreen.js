import React,{useEffect,useState} from 'react';
import {FlatList,Text, View,TouchableOpacity,ActivityIndicator,StyleSheet} from 'react-native';
import OrderItem from '../../components/shop/OrderItem';
import {useSelector,useDispatch} from 'react-redux';
import { Feather } from '@expo/vector-icons'; 
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';



function OrdersScreen (props) {
  const [isLoading, setIsLoading] = useState(false)
    const orders = useSelector(state => state.orders.orders);
    const dispatch=useDispatch();

    useEffect(() => {
      setIsLoading(true);
      dispatch(ordersActions.fetchOrders()).then(()=>{
        setIsLoading(false);
      });
    }, [dispatch]);

    if (isLoading){
      return(
        <View style={styles.centered}>
          <ActivityIndicator size='large'color={Colors.primary} />
        </View>
      )
    }


    return(
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate} items={itemData.item.items}/>}
    />)
};

export const screenOptions = ({navigation})=> {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <TouchableOpacity onPress={() => {navigation.toggleDrawer()}} >
      <Feather name="menu" size={24} color="white" />
       </TouchableOpacity>
    ),
}};

const styles = StyleSheet.create({
  centered:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})
    

export default OrdersScreen;