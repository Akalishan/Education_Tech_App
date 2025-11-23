import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { logoutUser } from '../../store/authSlice';

export default function LogoutScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    async function doLogout() {
      // Confirmation alert with modern styling
      Alert.alert(
        'Logout', 
        'Are you sure you want to sign out?', 
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              router.replace('/(tabs)');
            },
          },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: async () => {
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('user');
              dispatch(logoutUser());
              router.replace('/(auth)/login');
            },
          },
        ],
        { cancelable: true }
      );
    }
    doLogout();
  }, [dispatch, router]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Feather name="log-out" size={40} color="#8B5CF6" />
        </View>
        <Text style={styles.title}>Signing Out</Text>
        <Text style={styles.subtitle}>Please wait a moment...</Text>
        <ActivityIndicator size="large" color="#8B5CF6" style={styles.loader} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 40,
    width: '100%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  loader: {
    marginTop: 8,
  },
});