import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
  ImageSourcePropType,
  TextStyle,
  ImageStyle,
  TextInputProps,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {colors} from '../constants/colors';
import {Fonts} from '../assets/fonts/Customfont';
import {useCommonStyles} from './CommonStyle';
import {CustomImages} from '../assets/images';

interface CustomInputProps {
  value?: string;
  inputConfigurations?: TextInputProps;
  labelStyle?: TextStyle;
  inputBoxStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  label?: string;
  onChange: (text: string) => void;
  isPassword?: boolean;
  isPhoneInput?: boolean;
  placeholderText?: string;
  handleIconAction?: () => void;
  showIcon?: boolean;
  iconSource?: ImageSourcePropType;
  iconStyle?: ImageStyle;
  customPressableStyle?: ViewStyle;
  customInputContentStyle?: ViewStyle;
  isDisabled?: boolean;
  isFocus?: boolean;
  isValue?: boolean;
  onFocusChange?: () => void;
  onBlurChange?: () => void;
}

const CustomInput = forwardRef<any, CustomInputProps>(
  (
    {
      inputConfigurations,
      inputBoxStyle,
      label,
      onChange,
      isPassword,
      handleIconAction,
      showIcon,
      iconSource,
      iconStyle,
      customPressableStyle,
      isDisabled = false,
      value,
      onFocusChange,
      onBlurChange,
      isFocus,
      isValue,
    },
    ref,
  ) => {
    const [isSecure, setIsSecure] = useState(isPassword || false);
    const {inputContent} = useCommonStyles();
    console.log(isFocus || value?.length > 0 ? 'yes' : 'no');

    // const [isFocused, setIsFocused] = useState(false);
    // const inputRef = useRef<any>(null);

    // useImperativeHandle(ref, () => ({
    //   focus: () => {
    //     console.log(`Focusing input: ${label}`);
    //     inputRef.current?.focus?.();
    //   },
    //   blur: () => {
    //     console.log(`Blurring input: ${label}`);
    //     inputRef.current?.blur?.();
    //   },
    // }));

    const toggleSecureEntry = () => {
      console.log(`Toggling secure entry for: ${label}`);
      setIsSecure(prev => !prev);
      if (handleIconAction) handleIconAction();
    };

    console.log(label, value, 'have value');

    return (
      <View style={[styles.container, inputBoxStyle]}>
        <View style={styles.inputContainer}>
          <View
            style={[styles.borderShadow, isFocus && styles.focusBorderShadow]}>
            <TextInput
              // ref={inputRef}
              onFocus={() => {
                console.log(`Input focused: ${label}`);
                // setIsFocused(true);
                if (onFocusChange) onFocusChange();
              }}
              onBlur={() => {
                console.log(`Input blurred: ${label}`);
                // setIsFocused(false);
                if (onBlurChange) onBlurChange();
              }}
              label={label}
              labelStyle={[
                {
                  color:
                    isFocus || value?.length > 0
                      ? colors.gradientendColor
                      : colors.trustBase,
                },
                styles.labelStyle,
              ]}
              cursorColor={colors.textSecondary}
              value={value}
              onChangeText={onChange}
              secureTextEntry={isSecure}
              disabled={isDisabled}
              style={[styles.newInputStyle, isFocus && styles.onFocusInput]}
              contentStyle={[styles.innerContent, inputContent]}
              outlineStyle={[
                styles.outline,
                isFocus && {borderColor: colors.gradientstartColor},
              ]}
              mode="outlined"
              theme={{
                colors: {
                  primary:
                    isFocus || value?.length > 0
                      ? colors.gradientendColor
                      : colors.trustBase,
                },
              }}
              {...inputConfigurations}
            />

            {isPassword && (
              <Pressable
                onPress={toggleSecureEntry}
                style={({pressed}) => [
                  styles.pressableButton,
                  customPressableStyle,
                  pressed && styles.pressed,
                ]}>
                <Image
                  source={
                    isSecure ? CustomImages.eyeClose : CustomImages.eyeOpen
                  }
                  style={[styles.iconEye, iconStyle]}
                  resizeMode="contain"
                  tintColor={colors.textSecondary}
                />
              </Pressable>
            )}
            {showIcon && !isPassword && (
              <Pressable
                onPress={handleIconAction}
                style={({pressed}) => [
                  styles.pressableButton,
                  customPressableStyle,
                  pressed && styles.pressed,
                ]}>
                <Image
                  source={iconSource}
                  style={[styles.iconEye, iconStyle]}
                  resizeMode="contain"
                  tintColor={colors.textSecondary}
                />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    );
  },
);

export default React.memo(CustomInput);

const styles = StyleSheet.create({
  labelStyle:{
    
  },
  onFocusInput: {
    color: colors.errorAlert,
  },
  innerContent: {
    fontSize: 16,
    lineHeight: 21.6,
    color: colors.textSecondary,
    fontFamily: Fonts.inter400,
  },
  outline: {
    borderColor: colors.trustBase,
    borderWidth: 1,
    borderRadius: 12,
  },
  focusBorderShadow: {
    borderColor: '#e6e3fb',
  },
  borderShadow: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: colors.white,
  },
  container: {
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  newInputStyle: {
    backgroundColor: colors.background,
    fontSize: 16,
    fontFamily: Fonts.inter400,
    lineHeight: 16,
    paddingRight: 24,
    alignContent: 'center',
  },
  pressableButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -12}],
  },
  iconEye: {
    width: 22,
    height: 22,
    alignSelf: 'center',
    marginTop: 3,
  },
  pressed: {
    opacity: 0.7,
  },
});
