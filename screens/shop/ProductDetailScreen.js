import React from 'react';
import {ScrollView,View,Text,FlatList,StyleSheet,Image,Button,TouchableNativeFeedback,TouchableHighlight,TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import {useSelector,useDispatch} from 'react-redux';
import * as cartActions from '../../store/actions/cart';


function ProductDetailScreen(props) {

const productId = props.route.params.productId;
const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
const dispatch = useDispatch();
    return(
        <ScrollView>
            <Image style={styles.image} source={{uri:selectedProduct.imageUrl}}/>
            <View style={styles.button}>
            <Button 
            color={Colors.primary} 
            title='Add to Cart' 
            onPress={() => {dispatch(cartActions.addToCart(selectedProduct));
            }} 
            />
            </View>
            <Text style={styles.price}>{selectedProduct.price}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
};

export const screenOptions = (navData) => {
    return {
      headerTitle:navData.route.params.productTitle
    };
  };


const styles=StyleSheet.create({
    image:{
        width:'100%',
        height:300
    },
    description:{
        fontSize:14,
        textAlign:'center'
    },
    price:{
        fontSize:20,
        color:'#888',
        textAlign:'center',
        marginVertical:20
    },
    button:{
        alignItems:'center',
        paddingTop:10,
    }
})


export default ProductDetailScreen;