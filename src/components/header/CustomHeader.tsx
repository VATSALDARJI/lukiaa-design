import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../constants/colors';

interface CustomHeaderInterface {
  title?: string;
}

const CustomHeader: React.FC<CustomHeaderInterface> = ({title = 'Header'}) => {
  return (
    <LinearGradient
      colors={[colors.gradientstartColor, colors.gradientendColor]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </LinearGradient>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  gradient: {
    height: 60,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
