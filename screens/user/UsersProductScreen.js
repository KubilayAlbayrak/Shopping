import React from 'react';
import {FlatList,Button, View,TouchableOpacity,Alert} from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import {useSelector,useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';
import { FontAwesome,Feather } from '@expo/vector-icons'; 


function UsersProductScreen  (props)  {

const userProducts = useSelector(state => state.products.userProducts)  
const dispatch = useDispatch();
const editProductHandler = (id) => {
    props.navigation.navigate('EditProductScreen', {productId: id});
};

const deleteHandler = (id) => {
  Alert.alert('Emin misin ?' , 'Gerçekten silmek istiyor musun?' ,[
      {text:'Hayır' , style:'default'},
      {text:'Evet' ,style:'destructive' , onPress:() => {dispatch(productsActions.deleteProduct(id))}}
  ]);
};

    return(
        <FlatList 
        data={userProducts}
        keyExtractor={item => item.id}
        renderItem={itemData => 
        <ProductItem
        image={itemData.item.imageUrl}    
        title={itemData.item.title}        
        price={itemData.item.price}       
        onSelect={() => {editProductHandler(itemData.item.id)}}  
        >
        <Button
        color={Colors.primary}
        title="Edit"
        onPress={() => {editProductHandler(itemData.item.id)}}  
        /> 
        <Button
        color={Colors.primary}
        title="Delete"
        onPress={() => {deleteHandler(itemData.item.id)}}  
        />      
        </ProductItem>}
        />

    );
};

export const screenOptions = (navData) => {
    return {
      headerTitle: 'Your Products',
      headerLeft: () => (
        <TouchableOpacity onPress={() => {navData.navigation.toggleDrawer()}} >
        <Feather name="menu" size={24} color="white" />
         </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => {navData.navigation.navigate('EditProductScreen')}}>
          <FontAwesome name="edit" size={24} color="white" />
        </TouchableOpacity>
      )
    };
  };

export default UsersProductScreen;