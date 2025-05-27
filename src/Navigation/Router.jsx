import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home,EditProfile,Profile,Restoran,TambahUlasan,Ulasan,Notification,} from '../Screen';
import colors from '../Color';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const icons = {
  home: require('../assets/icon/Home.png'),
  notification: require('../assets/icon/notif.jpg'),
  profile: require('../assets/icon/User.png'),
};

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.greenMint(),
        tabBarInactiveTintColor: colors.black(),
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
        },
        tabBarLabelStyle: {
          marginTop: 5,
          fontSize: 10,
        },
      }}
    >
      {/* Tab Notifikasi */}
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color }) => (
            <Image
              source={icons.notification}
              style={{ width: 24, height: 24, tintColor: color }}
              resizeMode="contain"
            />
          ),
          headerShown: false,
        }}
      />

      {/* Tab Home */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
              source={icons.home}
              style={{ width: 24, height: 24, tintColor: color }}
              resizeMode="contain"
            />
          ),
          headerShown: false,
        }}
      />

      {/* Tab Profile */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Image
              source={icons.profile}
              style={{ width: 24, height: 24, tintColor: color }}
              resizeMode="contain"
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MainApp} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
      <Stack.Screen name="TambahUlasan" component={TambahUlasan} options={{ headerShown: false }} />
      <Stack.Screen name="Ulasan" component={Ulasan} options={{ headerShown: false }} />
      <Stack.Screen name="Restoran" component={Restoran} options={{ headerShown: false }} />
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Router;
