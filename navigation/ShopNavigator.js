import * as React from 'react';
import {Text,View,SafeAreaView,Button} from 'react-native';
import { NavigationContainer,DrawerActions} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator,DrawerItemList} from '@react-navigation/drawer';
import ProductsOverviewScreen, {
  screenOptions as productsOverviewScreenOptions
} from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions
} from '../screens/shop/ProductDetailScreen';
import CartScreen, {
  screenOptions as cartScreenOptions
} from '../screens/shop/CartScreen';
import OrdersScreen, {
  screenOptions as ordersScreenOptions
} from '../screens/shop/OrdersScreen';
import UsersProductScreen, {
  screenOptions as usersProductScreenOptions
} from '../screens/user/UsersProductScreen';
import EditProductScreen, {
  screenOptions as editProductScreenOptions
} from '../screens/user/EditProductScreen';
import AuthScreen, {
  screenOptions as authScreenOptions
} from '../screens/user/AuthScreen';
import Colors from '../constants/Colors';
import {Platform,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useDispatch} from 'react-redux';  
import * as authActions from '../store/actions/auth';


const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};




const ProductsStack = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStack.Navigator screenOptions={defaultNavOptions}>
      <ProductsStack.Screen
        name="ProductsOverviewScreen"
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStack.Navigator>
  );
};

const OrdersStack = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStack.Navigator screenOptions={defaultNavOptions}>
      <OrdersStack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStack.Navigator>
  );
};

const AdminStack = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStack.Navigator screenOptions={defaultNavOptions}>
      <AdminStack.Screen
        name="UsersProductsScreen"
        component={UsersProductScreen}
        options={usersProductScreenOptions}
      />
      <AdminStack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStack.Navigator>
  );
};

const ShopDrawer = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
      <ShopDrawer.Navigator 
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}
    >
      <ShopDrawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={Colors.primary}
            />
          )
        }}
      />
      <ShopDrawer.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={Colors.primary}
            />
          )
        }}
      />
      <ShopDrawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={Colors.primary}
            />
          )
        }}
      />
    </ShopDrawer.Navigator>
  );
};

export const AuthStack=createStackNavigator();

export const AuthNavigator = () => {
  return(
        <AuthStack.Navigator >
    <AuthStack.Screen name="AuthScreen" component={AuthScreen} options={authScreenOptions} />
    </AuthStack.Navigator>
  )
};
