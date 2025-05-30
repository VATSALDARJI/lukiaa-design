import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../common/CustomInput';
import { Fonts } from '../assets/fonts/Customfont';
import CardWrapper from '../common/CardWrapper';
import { colors } from '../constants/colors';
import CustomButton from '../common/CustumButton';
import { CustomImages } from '../assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoginApi } from '../axios/PostApis';
import { useMutation } from '@tanstack/react-query';
import { AppLoaderRef } from '../navigation/RootScreen';
import { CustomToaster } from '../components/toaster/CustomToaster';
import { ALERT_TYPE } from 'react-native-alert-notification';

// Define type to match LoginApi
type LoginFormData = {
  identifier: string;
  password: string;
};

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    defaultValues: {
      identifier: '',
      password: '',
    },
  });
  const identifierRef = useRef(null);
  const passwordRef = useRef(null);
  const { top, bottom } = useSafeAreaInsets();

  // ✅ Login mutation
  const { mutate } = useMutation({
    mutationFn: LoginApi,
    onMutate: () => {
      AppLoaderRef.current?.start(); // Show loader
    },
    onSuccess: data => {
      console.log('Login Success:', data);
      CustomToaster({
        message: 'Login Successfully!!!',
        type: ALERT_TYPE.SUCCESS,
      });
      navigation.navigate('AccountVerify'); // Moved navigation here for consistency
    },
    onError: error => {
      console.error('Login Error:', error);
      CustomToaster({
        message: error.message ?? 'Something went wrong',
        type: ALERT_TYPE.DANGER,
      });
    },
    onSettled: () => {
      AppLoaderRef.current?.stop(); // Hide loader
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login payload:', data);
    mutate(data); // Call the mutation with form data
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <ScrollView
        style={[styles.scrollView, { marginTop: top, marginBottom: bottom }]}
        contentContainerStyle={{ flexGrow: 1 }}
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
            <View style={styles.container}>
              <Controller
                control={control}
                name="identifier"
                rules={{
                  required: 'Email/Phone is required',
                  pattern: {
                    // Supports email or phone number
                    value: /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[0-9]{10})$/,
                    message: 'Enter a valid email or 10-digit phone number',
                  },
                }}
                render={({ field: { onChange, value }, fieldState: { isTouched } }) => (
                  <CustomInput
                    label="Email/Phone"
                    value={value}
                    onChange={onChange}
                    ref={identifierRef}
                    isFocus={isTouched}
                    isValue={value.length > 0}
                    onFocusChange={() => {}}
                    onBlurChange={() => {}}
                    showIcon
                    iconSource={CustomImages.contact}
                    error={errors.identifier?.message}
                  />
                )}
              />
              {errors.identifier && <Text style={styles.errorText}>{errors.identifier.message}</Text>}

              <Controller
                control={control}
                name="password"
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                }}
                render={({ field: { onChange, value }, fieldState: { isTouched } }) => (
                  <CustomInput
                    label="Password"
                    value={value}
                    onChange={onChange}
                    isPassword
                    ref={passwordRef}
                    isFocus={isTouched}
                    isValue={value.length > 0}
                    onFocusChange={() => {}}
                    onBlurChange={() => {}}
                    iconStyle={{ width: 24, height: 24 }}
                    error={errors.password?.message}
                  />
                )}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

              <CustomButton
                title="Login"
                btnStyle={styles.button}
                onPress={handleSubmit(onSubmit)}
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
  errorText: {
    color: colors.errorAlert,
    fontFamily: Fonts.inter400,
    fontSize: 12,
    marginTop: 4,
  },
});

export default React.memo(LoginScreen);