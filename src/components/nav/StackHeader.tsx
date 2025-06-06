import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../constants/colors';
import {CustomImages} from '../../assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title?: string;
  subtitle?: string;
  rightIcon?: Image['props']['source'];
  onRightIconPress?: () => void;
}

const StackHeader = ({subtitle, title, onRightIconPress, rightIcon}: Props) => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={[styles.header, {paddingTop: top}]}>
      <LinearGradient
        colors={[colors.gradientstartColor, colors.gradientendColor]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradient}
      />
      <Pressable hitSlop={15} onPress={navigation.goBack}>
        <Image source={CustomImages.leftArrow} style={styles.icon} />
      </Pressable>
      <View style={styles.titleCont}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {rightIcon ? (
        <View>
          <Pressable onPress={onRightIconPress} hitSlop={15}>
            <Image source={rightIcon} style={styles.icon} />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
  titleCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  subtitle: {
    fontSize: 14,
    color: colors.white,
  },
});

export default StackHeader;
