import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

export const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
    }

    const authStatus = await messaging().requestPermission({
      alert: true,
      badge: true,
      sound: true,
      provisional: false,
    });

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log('Notification permission:', enabled);

    return enabled;
  } catch (error) {
    console.log('Notification permission error:', error);
    return false;
  }
};

export const getFcmToken = async () => {
  try {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
    }

    const token = await messaging().getToken();

    console.log('FCM TOKEN:', token);

    return token;
  } catch (error) {
    console.log('FCM token error:', error);
    return null;
  }
};

export const listenForTokenRefresh = callback => {
  return messaging().onTokenRefresh(token => {
    console.log('FCM token refreshed:', token);

    if (callback) {
      callback(token);
    }
  });
};