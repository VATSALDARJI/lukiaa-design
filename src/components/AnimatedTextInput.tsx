import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  ViewStyle,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputProps,
  ColorValue,
  TextStyle,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { isAndroid } from '../utils/helperFunctions';
import { colors } from '../constants/colors';
// import {colors} from '../../assets/colors';
 
export interface AnimatedInputProps extends TextInputProps {
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
  deleteIconColor?: ColorValue;
  placeholderTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
  right?: React.ReactNode;
  inputHeight?: number;
  onFocusPress: () => void;
}
 
export interface PlaceholderProps
  extends Pick<TextInputProps, 'placeholder' | 'placeholderTextColor'>,
    Pick<AnimatedInputProps, 'backgroundColor' | 'placeholderTextStyle'> {
  placeholderAnimationProgress: Animated.SharedValue<number>;
}
 
const AnimatedTextInput = React.forwardRef<TextInput, AnimatedInputProps>(
  (
    {
      placeholder,
      placeholderTextColor,
      backgroundColor,
      borderColor,
      deleteIconColor,
      style,
      containerStyle,
      placeholderTextStyle,
      defaultValue,
      onChangeText,
      onFocus,
      onBlur,
      right,
      multiline,
      inputHeight,
      onFocusPress,
      ...rest
    }: AnimatedInputProps,
    ref,
  ) => {
    const [text, setText] = useState(defaultValue ?? '');
    const [isFocused, setIsFocused] = useState(false);
 
    const inputRef = ref ?? useRef<TextInput>(null);
 
    const styles = {
      container: {
        borderColor: 'green',
        paddingVertical: !isAndroid && multiline ? 12 : undefined,
        borderWidth: 2,
        height: inputHeight ? inputHeight : multiline ? 90 : 48,
        fontSize: 16,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: multiline ? 'flex-start' : 'center',
        ...containerStyle,
      } as ViewStyle,
      textInput: {
        fontSize: 16,
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 0,
        margin: 0,
        height: '100%',
      },
 
      textInput2: {
        textAlignVertical: 'top',
        marginVertical: 12,
        height: (inputHeight || 90) - 18,
      } as TextInputProps['style'],
    };
 
    // ---> Animations
    const deleteButtonAnimationProgress = useSharedValue(text === '' ? 0 : 1);
    const placeholderAnimationProgress = useSharedValue(text === '' ? 0 : 1);
 
    useEffect(() => {
      deleteButtonAnimationProgress.value = withTiming(text === '' ? 0 : 1);
      placeholderAnimationProgress.value = withDelay(
        20,
        withTiming(text === '' && !isFocused ? 0 : 1, {duration: 350}),
      );
    }, [isFocused, text]);
 
    // ---> Functions
    const focusInput = () => {
      // @ts-ignore
      inputRef?.current?.focus();
    };
 
    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      onFocus?.(e);
    };
    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      onBlur?.(e);
    };
    const handleChangeText = (text: string) => {
      setText(text);
      onChangeText?.(text);
    };
 
    return (
      <TouchableWithoutFeedback onPress={onFocusPress}>
        <View
          style={{
            borderWidth: 2,
            borderColor: isFocused ? 'pink' : 'transparent',
            borderRadius: 17,
          }}>
          <View style={[styles.container]}>
            <Placeholder
              {...{
                placeholder,
                placeholderTextColor,
                placeholderTextStyle,
                placeholderAnimationProgress,
                backgroundColor,
                multiline,
                inputHeight,
              }}
            />
 
            <TextInput
              {...rest}
              multiline={multiline}
              placeholder="" // force native placeholder to be empty string
              style={[
                styles.textInput,
                style,
                multiline && isAndroid
                  ? styles.textInput2
                  : undefined,
              ]}
              ref={inputRef}
              value={text}
              onChangeText={handleChangeText}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
 
            {right}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  },
);
const Placeholder = ({
  placeholder,
  placeholderTextColor,
  placeholderTextStyle,
  placeholderAnimationProgress,
  backgroundColor,
  multiline,
  inputHeight,
}: PlaceholderProps & {multiline?: boolean; inputHeight?: number}) => {
  const styles = {
    placeholderContainerStyle: useAnimatedStyle(() => ({
      marginTop: multiline ? 12 : undefined,
      position: 'absolute',
      backgroundColor: backgroundColor ?? colors.white,
      paddingHorizontal: interpolate(
        placeholderAnimationProgress.value,
        [0.6, 1],
        [0, 5],
        Extrapolation.CLAMP,
      ),
      marginHorizontal: interpolate(
        placeholderAnimationProgress.value,
        [0.6, 1],
        [5, 0],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            placeholderAnimationProgress.value,
            [0, 1],
            [0.765, multiline ? -22 : -24],
          ),
        },
        {translateX: 20},
      ],
    })),
    placeholderStyle: useAnimatedStyle(() => ({
      color: placeholderTextColor || colors.accent,
      fontSize: interpolate(
        placeholderAnimationProgress.value,
        [0, 1],
        [16, 14],
      ),
      backgroundColor: colors.white,
      ...placeholderTextStyle,
    })),
  };
 
  return (
    <>
      {placeholder && placeholder !== '' ? (
        <Animated.View style={styles.placeholderContainerStyle}>
          <Animated.Text style={styles.placeholderStyle}>
            {placeholder}
          </Animated.Text>
        </Animated.View>
      ) : (
        <></>
      )}
    </>
  );
};
 
export default AnimatedTextInput;
 
const styles = StyleSheet.create({
  input: {
    paddingVertical: 0,
    margin: 0,
    height: '100%',
  },
});
 