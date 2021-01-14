import React,{useEffect,useState,useCallback} from 'react';
import {View,Text,FlatList,Button,TouchableOpacity,ActivityIndicator,StyleSheet} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import { Feather } from '@expo/vector-icons'; 
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';


function ProductsOverviewScreen ({navigation,props}) {
const [isRefreshing, setIsRefreshing] = useState(false);
const [error, setError] = useState();
const [isLoading, setIsLoading] = useState(false);
const products = useSelector(state => state.products.availableProducts)
const dispatch = useDispatch();

const loadProducts = useCallback(async () => {
  setError(null);
  setIsRefreshing(true);
  try{
  await dispatch(productsActions.fetchProducts()); 
  } catch(err){
    setError(err.message)
  }
  setIsRefreshing(false);
},[dispatch,setIsLoading,setError]);

useEffect(() => {
  const willFocusSub = navigation.addListener(
    'willFocus',
    loadProducts
  );

  return () => {
    willFocusSub.remove();
  };
}, [loadProducts]);

useEffect(() => {
  loadProducts().then(()=> {
    setIsLoading(false);
  });
}, [dispatch, loadProducts]);


const selectItemHandler = (id ,title) => {
    navigation.navigate('ProductDetailScreen',{
        productId:id,
        productTitle:title
    });
};

if(error){
  return(
    <View style={styles.centered}>
      <Text>
        An error occured!
      </Text>
      <Button  title='Try Again'  onPress={loadProducts} color={Colors.primary}/>
    </View>
  )
}


if (isLoading) {
  return (
    <View style={styles.centered}>
      <ActivityIndicator  size='large' color={Colors.primary}/>
    </View>
  );
};

if(!isLoading && products.length === 0){
  return(
    <View style={styles.centered}>
      <Text> No Products found . Maybe  start adding some !</Text>
    </View>
  );
};



    return(
        <FlatList 
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData =>
        <ProductItem 
        image={itemData.item.imageUrl} 
        title={itemData.item.title} 
        price={itemData.item.price} 
        onSelect={() => {selectItemHandler(itemData.item.id,itemData.item.title)}}
        >
        <Button
        color={Colors.primary}
        title="View Details"
        onPress={() => {selectItemHandler(itemData.item.id,itemData.item.title)}}
        />
        <Button
        color={Colors.primary}
        title="To Cart"
        onPress={() => {dispatch(cartActions.addToCart(itemData.item))}}
        />  
        </ProductItem>
        }
        />
    )
};

export const screenOptions = ({navigation}) => {
    return {
      headerTitle: 'All Products',
      headerLeft: () => (
        <TouchableOpacity onPress={() => {navigation.toggleDrawer()}} >
        <Feather name="menu" size={24} color="white" />
         </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => {
          navigation.navigate('CartScreen')}}>
          <Feather name="shopping-cart" size={24} color="white" />
        </TouchableOpacity>
      )
    };
  };

const styles=StyleSheet.create({
    centered:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }
})  

export default ProductsOverviewScreen;



