import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type DoubleIconHeaderProps = {
  leftIcon?: boolean;
  rightIcon?: boolean;
  title: string;
  description?: string;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
};

const DoubleIconHeader: React.FC<DoubleIconHeaderProps> = ({
  leftIcon = false,
  rightIcon = false,
  title,
  description,
  onLeftIconClick = () => {},
  onRightIconClick = () => {},
}) => {
  const {top} = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[colors.gradientstartColor, colors.gradientendColor]} // Gradient from purple to pink
      start={{x: 0, y: 0}} // Gradient starts from the left
      end={{x: 1, y: 0}} // Gradient ends on the right
      style={styles.gradient}>
      <View style={[styles.header, {paddingTop: top + 10}]}>
        <View style={styles.iconContainer}>
          {leftIcon && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onLeftIconClick}
              accessibilityLabel="Left action">
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {description ? (
            <Text style={styles.description}>{description}</Text>
          ) : null}
        </View>
        <View style={styles.iconContainer}>
          {rightIcon && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onRightIconClick}
              accessibilityLabel="Right action">
              <Icon name="arrow-right" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    width: '100%',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconButton: {
    padding: 12,
    borderRadius: 50,
  },
  textContainer: {
    flex: 2,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#D1D5DB',
    marginTop: 4,
  },
});

export default DoubleIconHeader;
