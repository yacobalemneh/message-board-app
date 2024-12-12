/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
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
import {loginUser} from '../services/authService';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthContext} from '../../../state/AuthContext'; // Ensure correct path
import {ActivityIndicator} from 'react-native';

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  MessageBoard: undefined;
};

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const auth = useContext(AuthContext);

  const {login, isLoading} = auth;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    try {
      const {user, access} = await loginUser({email, password});

      if (!login) {
        throw new Error('Login function not available');
      }
      await login(user, access, rememberMe);
    } catch (e: any) {
      setError(e.message || 'Login failed');
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
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            You can login with your registered account using your email and
            password.
          </Text>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

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

          <TouchableOpacity
            style={[
              styles.loginButton,
              isLoading && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.linkText}>Create one!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Same as before, just replaced emojis in handle for password visibility
  safeArea: {flex: 1, backgroundColor: '#202433'},
  scrollContent: {paddingHorizontal: 30, paddingTop: 60, paddingBottom: 40},
  title: {fontSize: 32, color: '#FFFFFF', marginBottom: 8, fontWeight: '600'},
  subtitle: {fontSize: 16, color: '#FFFFFF', marginBottom: 32},
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerLine: {flex: 1, height: 1, backgroundColor: '#33394F'},
  dividerText: {color: '#FFFFFF', marginHorizontal: 10, fontSize: 14},
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
  passwordRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 20},
  eyeButton: {marginLeft: 10},
  rememberRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 32},
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxChecked: {backgroundColor: '#FF6934', borderColor: '#FF6934'},
  rememberText: {color: '#FFFFFF', fontSize: 14},
  errorText: {color: 'red', marginBottom: 8, fontSize: 14},
  loginButton: {
    backgroundColor: '#FF6934',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {color: '#FFFFFF', fontSize: 16, fontWeight: '500'},
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {color: '#FFFFFF', fontSize: 14},
  linkText: {color: '#FF6934', fontSize: 14, fontWeight: '500'},
});

export default LoginScreen;
