import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { colors } from '../constants/colors';
import { Fonts } from '../assets/fonts/Customfont';

interface ErrorTextProps {
  message?: string;
  visible?: boolean;
  style?: object;
}

const ErrorText: React.FC<ErrorTextProps> = ({ message, visible = !!message, style }) => {
  if (!visible || !message) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  text: {
    color: colors.errorAlert,
    fontSize: 12,
    lineHeight:14,
    fontFamily: Fonts.inter400,
  },
});

export default ErrorText;
