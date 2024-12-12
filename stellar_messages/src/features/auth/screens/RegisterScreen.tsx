/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {registerUser} from '../services/authService';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  MessageBoard: undefined;
};

const RegisterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleUsernameChange = (value: string) => {
    const formatted = value.toLowerCase().replace(/\s+/g, '-');
    setUsername(formatted);
  };

  // RegisterScreen.tsx
  const handleSignUp = async () => {
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setError('');
    try {
      await registerUser({username, email, password});
      navigation.navigate('Login');
    } catch (e: any) {
      setError(e.message || 'Registration failed');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>Enter your user details below.</Text>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="ebayyou"
            placeholderTextColor="#33394F"
            value={username}
            onChangeText={handleUsernameChange}
          />

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="ebayyou@gmail.com"
            placeholderTextColor="#33394F"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, {flex: 1, marginBottom: 0}]}
              placeholder="••••••••••"
              placeholderTextColor="#33394F"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeButton}>
              <Text style={{color: '#FFFFFF', fontSize: 16}}>
                {passwordVisible ? '👁️' : '🙈'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.rememberRow}
            onPress={() => setRememberMe(!rememberMe)}>
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
            />
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Login!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#202433',
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 32,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#33394F',
  },
  dividerText: {
    color: '#FFFFFF',
    marginHorizontal: 10,
    fontSize: 14,
  },
  inputLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#33394F',
    color: '#FFFFFF',
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
    fontSize: 16,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  eyeButton: {
    marginLeft: 10,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#FF6934',
    borderColor: '#FF6934',
  },
  rememberText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    fontSize: 14,
  },
  signUpButton: {
    backgroundColor: '#FF6934',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  linkText: {
    color: '#FF6934',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default RegisterScreen;
