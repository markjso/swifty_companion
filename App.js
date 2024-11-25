import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './views/Home'
import ProfileScreen from './views/Profile';
import SkillsScreen from './views/Skills';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false, unmountOnBlur: true}}
          />
          <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          name="Skills"
          component={SkillsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

