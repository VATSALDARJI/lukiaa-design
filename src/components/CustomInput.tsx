// import React, {memo, useCallback} from 'react';
// import {StyleSheet, TextInputProps, View, ViewProps} from 'react-native';
// import {Controller, ControllerProps, FieldError} from 'react-hook-form';
// import AnimatedTextInput from './AnimatedTextInput';
// import {fontSize} from '../../constants';
// import {colors} from '../../assets/colors';
// import {fonts} from '../../assets';
// import {Urb400} from '../fonts';

// type Props = {
//   control: ControllerProps<any>['control'];
//   name: ControllerProps<any>['name'];
//   error?: FieldError;
//   inputProps?: {
//     placeholder: TextInputProps['placeholder'];
//     style?: TextInputProps['style'];
//     keyboardType?: TextInputProps['keyboardType'];
//     multiline?: TextInputProps['multiline'];
//     focusable?: TextInputProps['focusable'];
//     submitBehavior?: TextInputProps['submitBehavior'];
//     enterKeyHint?: TextInputProps['enterKeyHint'];
//     onSubmitEditing?: TextInputProps['onSubmitEditing'];
//   };
//   style?: ViewProps['style'];
//   validation?: any;
//   inputHeight?: number;
// };

// const Input: React.FC<Props> = ({
//   control,
//   name,
//   error,
//   inputProps,
//   style,
//   validation,
//   inputHeight,
// }) => {
//   const inputRender: ControllerProps<any>['render'] = useCallback(
//     ({field: {value, onChange, ref}}) => {
//       return (
//         <AnimatedTextInput
//           ref={ref}
//           value={value}
//           onChangeText={onChange}
//           placeholderTextStyle={styles.placeholder}
//           onFocusPress={() => {
//             control?._options?.formControl?.setFocus(name);
//           }}
//           {...inputProps}
//           style={[styles.input, inputProps?.style]}
//           defaultValue={value}
//           inputHeight={inputHeight}
//         />
//       );
//     },
//     [inputProps, inputHeight, control?._options?.formControl, name],
//   );

//   return (
//     <View style={[styles.root, style]}>
//       <Controller
//         control={control}
//         name={name}
//         render={inputRender}
//         rules={validation}
//       />
//       <Urb400 style={styles.er}>{error?.message || ''}</Urb400>
//     </View>
//   );
// };

// export default memo(Input);

// const styles = StyleSheet.create({
//   root: {
//     marginVertical: 4,
//   },

//   input: {
//     fontSize: fontSize(16),
//     color: colors.darkGrey,
//     fontFamily: fonts.Urb400,
//   },

//   placeholder: {
//     fontFamily: fonts.Urb400,
//   },

//   er: {
//     fontSize: fontSize(12),
//     color: 'red',
//     marginLeft: 12,
//     marginTop: 4,
//   },

//   rightIconCont: {
//     paddingHorizontal: 12,
//   },

//   rightIcon: {
//     height: 24,
//     width: 24,
//   },
// });