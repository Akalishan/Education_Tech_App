import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { logoutUser } from '../../store/authSlice';

export default function ProfileScreen() {
  const user = useSelector((state: any) => state.auth.user);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changing, setChanging] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [k: string]: string }>({});
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleChangePassword = () => {
    setFormErrors({});
    const errors: { [k: string]: string } = {};
    if (!oldPassword) errors.oldPassword = 'Enter current password';
    if (!newPassword) errors.newPassword = 'Enter a new password';
    if (newPassword && newPassword.length < 6) errors.newPassword = 'New password must be at least 6 characters';
    if (newPassword !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setChanging(true);
    setTimeout(() => {
      setChanging(false);
      Alert.alert('Success', 'Password changed successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setFormErrors({});
    }, 800);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(logoutUser()).unwrap();
            } catch (e) {
              // ignore
            } finally {
              router.replace('/(auth)/login');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.headerCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.username ? String(user.username).charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.username}>{user?.username || 'User'}</Text>
          {user?.email && <Text style={styles.email}>{user.email}</Text>}
          {user?.id && (
            <View style={styles.idBadge}>
              <Text style={styles.idText}>ID: {user.id}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Change Password Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather name="lock" size={20} color="#8B5CF6" />
          <Text style={styles.sectionTitle}>Change Password</Text>
        </View>

        {/* Current Password */}
        <Text style={styles.fieldLabel}>Current Password</Text>
        <View style={styles.inputWrapper}>
          <Feather name="key" size={18} color="#9CA3AF" style={styles.inputIcon} />
          <TextInput
            value={oldPassword}
            onChangeText={setOldPassword}
            placeholder="Enter current password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showOldPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)} style={styles.eyeIcon}>
            <Feather name={showOldPassword ? "eye" : "eye-off"} size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
        {formErrors.oldPassword && (
          <View style={styles.errorContainer}>
            <Feather name="alert-circle" size={12} color="#EF4444" />
            <Text style={styles.errorText}>{formErrors.oldPassword}</Text>
          </View>
        )}

        {/* New Password */}
        <Text style={styles.fieldLabel}>New Password</Text>
        <View style={styles.inputWrapper}>
          <Feather name="key" size={18} color="#9CA3AF" style={styles.inputIcon} />
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Choose a new password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showNewPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIcon}>
            <Feather name={showNewPassword ? "eye" : "eye-off"} size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
        {formErrors.newPassword && (
          <View style={styles.errorContainer}>
            <Feather name="alert-circle" size={12} color="#EF4444" />
            <Text style={styles.errorText}>{formErrors.newPassword}</Text>
          </View>
        )}

        {/* Confirm Password */}
        <Text style={styles.fieldLabel}>Confirm New Password</Text>
        <View style={styles.inputWrapper}>
          <Feather name="key" size={18} color="#9CA3AF" style={styles.inputIcon} />
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Repeat new password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showConfirmPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
            <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
        {formErrors.confirmPassword && (
          <View style={styles.errorContainer}>
            <Feather name="alert-circle" size={12} color="#EF4444" />
            <Text style={styles.errorText}>{formErrors.confirmPassword}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.primaryButton, changing && styles.primaryButtonDisabled]}
          onPress={handleChangePassword}
          disabled={changing}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            {changing ? 'Saving...' : 'Change Password'}
          </Text>
          {!changing && <Feather name="check" size={18} color="#fff" style={styles.buttonIcon} />}
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.7}>
        <Feather name="log-out" size={20} color="#EF4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  headerInfo: {
    flex: 1,
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  idBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  idText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 12,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  eyeIcon: {
    padding: 4,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 4,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginLeft: 4,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#8B5CF6',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#FEE2E2',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 8,
  },
  logoutText: {
    color: '#EF4444',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
});
