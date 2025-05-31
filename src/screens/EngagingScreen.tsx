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
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomButton from '../common/CustumButton';
import {colors} from '../constants/colors';
import {useCommonStyles} from '../common/CommonStyle';
import {Fonts} from '../assets/fonts/Customfont';
import LinearGradient from 'react-native-linear-gradient';
import {CustomImages} from '../assets/images';

const EngagingScreen: React.FC = ({navigation}) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputsRef = useRef([]);
  const {title, subText} = useCommonStyles();

  const handleNextNav = () => {
    navigation.navigate('ProfileScreen');
  };

  const {top, bottom} = useSafeAreaInsets();

  console.log(bottom, 'bottom');

  return (
    <LinearGradient
      colors={['#d8e7fe', colors.white]}
      start={{x: 1, y: 1}} // Start at bottom-right
      end={{x: 0, y: 0}} // End at top-left
      style={styles.gradient}>
      <ScrollView
        style={[styles.scrollView, {marginTop: top, marginBottom: bottom}]}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={[styles.innerContent, {marginBottom: bottom}]}>
          <View style={styles.topPart}>
            <View style={styles.header}>
              <Text style={[title, styles.title]}>Lukiaa</Text>
            </View>
            <View style={styles.commonContainer}>
              <View style={[styles.otpcontent]}>
                <View style={styles.secTitleBox}>
                  <Text style={[title, styles.title, styles.secTitle]}>
                    Hey there, I'm Lukiaa...
                  </Text>
                  <Image source={CustomImages.wave} style={styles.waveStyle} />
                </View>

                <Text style={styles.subtitle}>
                  <Text style={{fontSize: 25}}>Y</Text>our personal AI stylist -
                  I'm here to help you look and feel your best every day.{' '}
                </Text>
              </View>
              <Image
                source={CustomImages.logo}
                style={styles.sideChar}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.thirdTitle}>
              To style you best, I just need a few quicks details about your
              look and perfrences.
            </Text>
            <View style={styles.whiteBox}>
              <Image source={CustomImages.flash} style={styles.icon} />
              <Text style={[subText, styles.whiteBoxText]}>
                It takes less then a minute - and your style journey begins!
              </Text>
            </View>
            <View style={styles.whiteBox}>
              <Image source={CustomImages.target} style={styles.icon} />
              <Text style={[subText, styles.whiteBoxText]}>
                To style you best, I just need a few quicks details about your
                look and perfrences.
              </Text>
            </View>
          </View>
          <CustomButton
            title="Start Your Style Journey"
            btnStyle={styles.button}
            onPress={handleNextNav}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  commonContainer: {
    flexDirection: 'row',
  },
  sideChar: {
    height: 300,
    width: 150,
  },
  thirdTitle: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.textSecondary,
    fontFamily: Fonts.inter500,
    marginVertical: 16,
  },
  secTitleBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  waveStyle: {
    width: 30,
    height: 30,
  },
  secTitle: {
    color: colors.black,
    marginBottom: 10,
    marginTop: 16,
  },
  whiteBoxText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 16,
    color: colors.textSecondary,
    fontFamily: Fonts.inter400,
  },
  icon: {
    width: 25,
    height: 25,
  },
  whiteBox: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginVertical: 12,
  },
  gradient: {
    flex: 1,
  },
  topPart: {
    flex: 1,
  },
  subtitle: {
    fontFamily: Fonts.inter700,
    fontSize: 20,
    marginVertical: 16,
    marginTop: 20,
    color: colors.gradientendColor,
  },
  otpcontent: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    marginTop: 40,
  },
  button: {
    marginTop: 16,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  innerContent: {
    justifyContent: 'center',
    paddingHorizontal: 24,
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: colors.gradientstartColor,
    fontSize: 30,
    lineHeight: 34,
    textAlign: 'left',
    marginBottom: 0,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    height: 70,
  },
  inputBox: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.gradientstartColor,
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'center',
  },
});

export default EngagingScreen;
