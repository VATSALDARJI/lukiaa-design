import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Toast} from 'react-native-alert-notification';
import {ALERT_TYPE} from 'react-native-alert-notification';
import {Fonts} from '../../assets/fonts/Customfont';
import {colors} from '../../constants/colors';

interface CustomToastProps {
  type: ALERT_TYPE;
  message: string;
  title?: string;
}

export const CustomToaster = ({type, message, title}: CustomToastProps) => {
  Toast.show({
    type,
    title: title,
    textBody: message,
    autoClose: true,
  });
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: Fonts.inter400,
    color: colors.white,
  },
  message: {
    fontSize: 14,
    color: colors.gradientstartColor,
  },
});
