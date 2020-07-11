import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Homescreen from '../views/Homescreen';
import InfiniteList from '../views/InfiniteList';
import SearchScreen from '../views/SearchScreen';

const Stack = createStackNavigator();

export default class AppNavigator extends React.PureComponent {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Homescreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="infinite"
            component={InfiniteList}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="search"
            component={SearchScreen}
            options={{
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
