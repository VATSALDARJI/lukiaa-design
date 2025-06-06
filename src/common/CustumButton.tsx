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
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonType> = ({
  title,
  onPress,
  btnStyle,
  showIcon,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, btnStyle, disabled && {opacity: 0.3}]}>
      <LinearGradient
        colors={[colors.gradientstartColor, colors.gradientendColor]} // Gradient from purple to pink
        start={{x: 0, y: 0}} // Gradient starts from the left
        end={{x: 1, y: 0}} // Gradient ends on the right
        style={styles.gradient}
      />
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 15, // Rounded corners
    overflow: 'hidden', // Ensure the gradient respects the rounded corners
    height: 50, // Fixed height for the button
  },
  gradient: {
    ...StyleSheet.absoluteFillObject, // Fill the button container
  },
  content: {
    flex: 1, // Allow content to fill the button
    flexDirection: 'row', // Align text and icon in a row
    alignItems: 'center', // Vertically center the content
    justifyContent: 'center', // Center the content horizontally
    gap: 10, // Space between text and icon
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontSize: 17,
    fontWeight: '600',
  },
  icon: {
    // Optional: Add margin or padding if needed
  },
});

export default CustomButton;
