import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
      <StatusBar style='auto' />
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='SignUp' component={SignUpScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name='Restaurant' component={RestaurantScreen} />
        <Stack.Screen 
          name='Basket' 
          component={BasketScreen} 
          options={{
            presentation: 'modal',
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='PreparingOrder' 
          component={PreparingOrderScreen} 
          options={{
            headerShown: false,
            presentation: 'fullScreenModal'
          }}
        />

        <Stack.Screen 
          name='Delivery' 
          component={DeliveryScreen} 
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}