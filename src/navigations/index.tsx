import React from 'react';

import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';

import HomeScreen from 'src/screens/Home';
import AboutScreen from 'src/screens/About';
import SimpleFormScreen from 'src/screens/SimpleForm';
import DynamicFormScreen from 'src/screens/DynamicForm';

const Tab = createBottomTabNavigator();

const Navigation: React.FC = () => {
  const theme = useTheme();

  const navigatorConfig = ({
    route,
  }: {
    route: RouteProp<ParamListBase, string>;
  }): BottomTabNavigationOptions => ({
    tabBarIcon: ({focused, color, size}) => {
      let iconName = '';
      if (route.name === 'Home') {
        iconName = focused
          ? 'ios-information-circle'
          : 'ios-information-circle-outline';
      } else if (route.name === 'Settings') {
        iconName = focused ? 'ios-list' : 'ios-list-outline';
      } else {
        iconName = 'ios-folder';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '500',
    },
  });

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={navigatorConfig}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Simple Form" component={SimpleFormScreen} />
        <Tab.Screen name="Dynamic Form" component={DynamicFormScreen} />
        <Tab.Screen name="Settings" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
