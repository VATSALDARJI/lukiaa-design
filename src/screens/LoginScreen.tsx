import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import CustomInput from '../common/CustomInput';
import {Fonts} from '../assets/fonts/Customfont';
import CardWrapper from '../common/CardWrapper';
import {colors} from '../constants/colors';
import CustomButton from '../common/CustumButton';
import {CustomImages} from '../assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useCommonStyles} from '../common/CommonStyle';

const LoginScreen = ({navigation}) => {
  const [form, setForm] = useState({email: '', password: ''});
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const [isActiveInput, setIsActiveInput] = useState('');
  const {title} = useCommonStyles();

  const handleChange = useCallback((field, value) => {
    setForm(prev => ({...prev, [field]: value}));
  }, []);

  const handleLogin = useCallback(() => {
    navigation.navigate('AccountVerify');
    console.log('Login payload:', form);
    // You can add your API call here
  }, [form, navigation]);

  const handleFocus = useCallback((name = '') => {
    setIsActiveInput(name);
  }, []);

  const {top, bottom} = useSafeAreaInsets();

  return (
    // <SafeAreaView style={{flex: 1}}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        style={[styles.scrollView, {marginTop: top, marginBottom: bottom}]}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps="handled">
        <View style={styles.innerContent}>
          <View style={styles.header}>
            <View style={styles.logoBox}>
              <Image source={CustomImages.logo} style={styles.logo} />
            </View>
            <Text style={styles.subtitle}>AI Stylish</Text>
            <Text style={styles.subtext}>
              Fast forward fastion, powered by AI
            </Text>
          </View>
          <CardWrapper>
            <View style={[styles.container]}>
              <CustomInput
                label="Email/Phone"
                value={form.email}
                onChange={val => handleChange('email', val)}
                ref={emailRef}
                isFocus={isActiveInput === 'email'}
                isValue={form.email.length > 0}
                onFocusChange={() => handleFocus('email')}
                onBlurChange={() => handleFocus()}
                showIcon
                iconSource={CustomImages.contact}
              />

              <CustomInput
                label="Password"
                value={form.password}
                onChange={val => handleChange('password', val)}
                isPassword
                ref={passwordRef}
                isFocus={isActiveInput === 'password'}
                onFocusChange={() => handleFocus('password')}
                onBlurChange={() => handleFocus()}
                iconStyle={{width: 24, height: 24}}
                isValue={form.password.length > 0}
              />

              <CustomButton
                title="Login"
                btnStyle={styles.button}
                onPress={handleLogin}
                showIcon
              />

              <View style={styles.signupContainer}>
                <Text style={styles.note}>
                  Don’t have an account?{' '}
                  <Text
                    style={styles.textbtn}
                    onPress={() => navigation.navigate('Signup')}>
                    Sign up
                  </Text>
                </Text>
              </View>
            </View>
          </CardWrapper>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContent: {
    justifyContent: 'center',
    marginTop: 70,
  },
  subtext: {
    fontFamily: Fonts.inter400,
    color: colors.textSecondary,
  },
  subtitle: {
    fontFamily: Fonts.poppins600,
    fontSize: 18,
    lineHeight: 20,
    color: colors.gradientstartColor,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
  },
  logoBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
  logo: {
    width: 70,
    height: 70,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  button: {
    marginTop: 16,
  },
  textbtn: {
    fontFamily: Fonts.inter500,
    color: colors.gradientendColor,
  },
  note: {
    fontFamily: Fonts.inter400,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  signupContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default React.memo(LoginScreen);
