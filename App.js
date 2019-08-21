import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import { Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import store from './store'; //Import the store

import Home from './components/home' //Import the component file
import Cart from './components/cart';
import Details from './components/details';
import About from './components/about';
import SearchResults from './components/searchResults';


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        );
    }
}

const homeStack = createStackNavigator({
  Home: { 
    screen: Home, 
    navigationOptions:{
         title: "Yuyutei Weiss Schwarz",
       headerStyle: {
          backgroundColor: '#4050B5',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          fontWeight: 'bold'
      }
    }
  },
   SearchResults: { 
    screen: SearchResults, 
    navigationOptions:{
         title: "Search Results",
       headerStyle: {
          backgroundColor: '#4050B5',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          fontWeight: 'bold'
      }
    }
  },
   Details: { 
    screen: Details, 
    navigationOptions:{
         title: "Card Details",
       headerStyle: {
          backgroundColor: '#4050B5',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          fontWeight: 'bold'
      }
    }
  }
})

const cartStack = createStackNavigator({
 Cart: {  
    screen: Cart, 
    navigationOptions:{
       title: "Shopping Cart",
     headerStyle: {
        backgroundColor: '#4050B5',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    }
    }
  },
})

const aboutStack = createStackNavigator({
 About: {  
    screen: About, 
    navigationOptions:{
       title: "About This App",
     headerStyle: {
        backgroundColor: '#4050B5',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    }
    }
  },
})

const Root = createBottomTabNavigator({
  Home: homeStack,   
  Cart: cartStack,
  About: aboutStack
},    
{ 
  initialRouteName : "Home", 
},
{
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle`;
        } else if (routeName === 'Cart') {
          iconName = `ios-options`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }
}
);
/*
const Root = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Cart:{
      screen: Cart
    },
    SearchResults:{
      screen: SearchResults
    }
  }, 
  {
    initialRouteName: 'Home',
  }
);
*/
