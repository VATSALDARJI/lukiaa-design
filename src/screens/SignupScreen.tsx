// SignupScreen.js

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustumButton';
import {Fonts} from '../assets/fonts/Customfont';
import CardWrapper from '../common/CardWrapper';
import {useCommonStyles} from '../common/CommonStyle';
import {colors} from '../constants/colors';
import {CustomImages} from '../assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ErrorText from '../common/ErrorText';
import {useMutation} from '@tanstack/react-query';
import {SignupApi} from '../axios/PostApis';
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from '../utils/validation';
import CustomLoader from '../common/CustomLoader';
import {AppLoaderRef} from '../navigation/RootScreen';
import {CustomToaster} from '../components/toaster/CustomToaster';
import {ALERT_TYPE} from 'react-native-alert-notification';

// ✅ Import validation rules
const SignupScreen = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const {title} = useCommonStyles();
  const {top, bottom} = useSafeAreaInsets();

  // ✅ Signup mutation
  const {mutate} = useMutation({
    mutationFn: SignupApi,
    onMutate: () => {
      AppLoaderRef.current?.start(); // Show loader
    },
    onSuccess: data => {
      console.log('Signup Success:', data);
      CustomToaster({
        message: 'Signup Successfully!!!',
        type: ALERT_TYPE.SUCCESS,
      });
      // Navigate or show success toast here
      navigation.navigate('Login');
    },
    onError: error => {
      console.error('Signup Error:', error);
      CustomToaster({
        message: error.message ?? 'Something went wrong',
        type: ALERT_TYPE.DANGER,
      });
      // Show error toast here
    },
    onSettled: () => {
      AppLoaderRef.current?.stop(); // Hide loader
    },
  });

  const onSubmit = data => {
    const payload = {
      nickName: data.name,
      email: data.email,
      password: data.password,
    };

    mutate(payload); // ✅ Call API mutation
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={[styles.scrollView, {marginTop: top, marginBottom: bottom}]}
          contentContainerStyle={[styles.contentStyle]}
          keyboardShouldPersistTaps="handled">
          <View style={styles.innerContent}>
            <View style={styles.header}>
              <Text style={title}>Registered In Lukiaa</Text>
              <View style={styles.logoBox}>
                <Image source={CustomImages.logo} style={styles.logo} />
              </View>
              <Text style={styles.subtitle}>AI Stylish</Text>
              <Text style={styles.subtext}>
                Fast forward fashion, powered by AI
              </Text>
            </View>
            <CardWrapper>
              <View style={[styles.container]}>
                <Controller
                  control={control}
                  name="name"
                  rules={nameValidation}
                  render={({
                    field: {onChange, value},
                    fieldState: {isTouched},
                  }) => (
                    <CustomInput
                      label="Full Name"
                      value={value}
                      onChange={onChange}
                      showIcon
                      iconSource={CustomImages.contact}
                      iconStyle={{tintColor: colors.textSecondary}}
                      isFocus={isTouched}
                      isValue={value.length > 0}
                    />
                  )}
                />
                <ErrorText
                  visible={errors.name?.message}
                  message={errors.name?.message}
                />

                <Controller
                  control={control}
                  name="email"
                  rules={emailValidation}
                  render={({
                    field: {onChange, value},
                    fieldState: {isTouched},
                  }) => (
                    <CustomInput
                      label="Email/Phone"
                      value={value}
                      onChange={onChange}
                      showIcon
                      iconSource={CustomImages.mail}
                      isFocus={isTouched}
                      isValue={value.length > 0}
                    />
                  )}
                />
                <ErrorText
                  visible={errors.email?.message}
                  message={errors.email?.message}
                />

                <Controller
                  control={control}
                  name="password"
                  rules={passwordValidation}
                  render={({
                    field: {onChange, value},
                    fieldState: {isTouched},
                  }) => (
                    <CustomInput
                      label="Password"
                      value={value}
                      onChange={onChange}
                      isPassword
                      iconStyle={{width: 24, height: 24}}
                      isFocus={isTouched}
                      isValue={value.length > 0}
                    />
                  )}
                />
                <ErrorText
                  visible={errors.password?.message}
                  message={errors.password?.message}
                />

                <CustomButton
                  title="Sign Up"
                  btnStyle={styles.button}
                  onPress={handleSubmit(onSubmit)}
                />

                <View style={styles.signupContainer}>
                  <Text style={styles.note}>
                    Already have an account?{' '}
                    <Text
                      style={styles.textbtn}
                      onPress={() => navigation.navigate('Login')}>
                      Log In
                    </Text>
                  </Text>
                </View>
              </View>
            </CardWrapper>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  innerContent: {},
  logoBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingTop: 10,
  },
  logo: {
    width: 70,
    height: 70,
  },
  contentStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 10,
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
  signupContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default SignupScreen;
