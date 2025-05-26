import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5 icons

interface CustomButtonType {
  title: string;
  onPress: () => void;
  btnStyle?: ViewStyle | ViewStyle[];
  showIcon?: boolean;
}

const CustomButton: React.FC<CustomButtonType> = ({
  title,
  onPress,
  btnStyle,
  showIcon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, btnStyle]}>
      <LinearGradient
        colors={[colors.gradientstartColor, colors.gradientendColor]} // Gradient from purple to pink
        start={{x: 0, y: 0}} // Gradient starts from the left
        end={{x: 1, y: 0}} // Gradient ends on the right
        style={styles.gradient}>
        <View style={styles.content}>
          <Text style={styles.buttonText}>{title}</Text>
          {showIcon && (
            <Icon
              name="arrow-right"
              size={13}
              color="#FFFFFF"
              style={styles.icon}
            />
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 15, // Rounded corners
    overflow: 'hidden', // Ensure the gradient respects the rounded corners
    width: '100%',
  },
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row', // Align text and icon in a row
    alignItems: 'center', // Vertically center the content
    justifyContent: 'center', // Center the content horizontally
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10, // Space between text and icon
  },
  icon: {
    // Optional: Add margin or padding if needed
  },
});

export default CustomButton;
