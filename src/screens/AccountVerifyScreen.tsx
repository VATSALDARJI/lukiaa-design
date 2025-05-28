import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import CardWrapper from '../common/CardWrapper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomButton from '../common/CustumButton';
import {colors} from '../constants/colors';
import {useCommonStyles} from '../common/CommonStyle';
import {Fonts} from '../assets/fonts/Customfont';
import {CustomImages} from '../assets/images';
import {useDispatch} from 'react-redux';
import {login} from '../redux/slice/authSlice';

const AccountVerifyScreen: React.FC = ({navigation}) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputsRef = useRef([]);
  const {title} = useCommonStyles();
  const disptach = useDispatch();

  const handleChange = (text, index) => {
    if (/^[0-9]$/.test(text) || text === '') {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < 5) {
        // Move to next input only if a digit is entered
        inputsRef.current[index + 1].focus();
      } else if (text === '' && index > 0) {
        // Move to previous input if current is cleared
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];
      if (otp[index] !== '') {
        // Clear current input
        newOtp[index] = '';
        setOtp(newOtp);
        if (index > 0) {
          inputsRef.current[index - 1].focus();
        }
      } else if (index > 0) {
        // Clear previous input and move focus
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleFocus = index => {
    // Prevent focusing an input if previous inputs are not filled
    for (let i = 0; i < index; i++) {
      if (otp[i] === '') {
        inputsRef.current[i].focus();
        return;
      }
    }
  };

  const handleSubmit = () => {
    disptach(login({username: 'test', token: 'dummy'}));
    return;
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 6) {
      // Add your verification logic here
    } else {
      Alert.alert('Error', 'Please enter the full 6-digit OTP');
    }
  };

  const {top, bottom} = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        style={[styles.scrollView, {marginTop: top, marginBottom: bottom}]}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps="handled">
        <View style={styles.innerContent}>
          <View style={styles.header}>
            <Text style={title}>Account Verification</Text>
          </View>
          <View style={styles.otpcontent}>
            <Image style={styles.logo} source={CustomImages.verifyLogo} />
            <Text style={styles.title}>Enter verification code</Text>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={el => (inputsRef.current[index] = el)}
                  value={digit}
                  onChangeText={text => handleChange(text, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  onFocus={() => handleFocus(index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={styles.inputBox}
                />
              ))}
            </View>
            <CustomButton
              title="Submit"
              btnStyle={styles.button}
              onPress={handleSubmit}
              showIcon
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    marginHorizontal: 'auto',
  },
  otpcontent: {
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  header: {},
  button: {},
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  innerContent: {
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: Fonts.inter600,
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 16,
    marginTop: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  inputBox: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.gradientstartColor,
    // marginHorizontal: 5,
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'center',
  },
});

export default AccountVerifyScreen;
