import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType, ImageStyle, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type DoubleIconHeaderProps = {
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  title: string;
  description?: string;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  leftIconStyle?:ImageStyle | ImageStyle[];
  rightIconStyle?:ImageStyle | ImageStyle[];
  // leftI?:ViewStyle | ViewStyle[];
  // ViewStyle?:ViewStyle | ViewStyle[]
};

const DoubleIconHeader: React.FC<DoubleIconHeaderProps> = ({
  leftIcon,
  rightIcon,
  title,
  description,
  onLeftIconClick = () => {},
  onRightIconClick = () => {},
  leftIconStyle,
  rightIconStyle
}) => {
  const { top } = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[colors.gradientstartColor, colors.gradientendColor]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <View style={[styles.header, { paddingTop: top + 10 }]}>
        <View style={styles.iconContainer}>
          {leftIcon && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onLeftIconClick}
              accessibilityLabel="Left action"
            >
              <Image
                source={leftIcon}
                style={[styles.icon,leftIconStyle]}
                // tintColor={colors.}
              />
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
              accessibilityLabel="Right action"
            >
              <Image
                source={rightIcon}
                style={[styles.icon,rightIconStyle]}
                tintColor={colors.white}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
  },
  icon: {
    width: 24,
    height: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    width: '100%',
    minHeight: 100,
    columnGap:5
  },
  iconContainer: {
    alignItems: 'flex-start',
  },
  iconButton: {
    padding: 5,
    borderRadius: 50,
  },
  textContainer: {
    flex: 2,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textTransform:'capitalize'
  },
  description: {
    fontSize: 14,
    color: '#D1D5DB',
    marginTop: 4,
  },
});

export default DoubleIconHeader;