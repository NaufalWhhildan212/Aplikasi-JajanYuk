import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/Navigation/Router';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { PermissionsAndroid, Platform } from 'react-native';

export default function App() {
  useEffect(() => {
    async function setupNotifications() {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      } else {
        await notifee.requestPermission();
      }

      // Buat channel notifikasi default
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    }

    setupNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}

