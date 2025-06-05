import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../constants/colors';
import {Fonts} from '../../assets/fonts/Customfont';

// Replace this with your actual shirt icon asset
// import ShirtIcon from '../assets/shirt.png'; // Example

interface BreezyLinenCardProps {
  onPress?: () => void;
  iconSource: any; // Should be an image source (require or { uri: ... })
}

const BreezyLinenCard: React.FC<BreezyLinenCardProps> = ({
  onPress,
  iconSource,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.row}>
        <LinearGradient
          colors={['#7D5FFF', '#FC5C7D']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.iconGradient}>
          <Image source={iconSource} style={styles.icon} resizeMode="contain" />
        </LinearGradient>
        <View style={styles.textSection}>
          <Text style={styles.title}>Breezy Linen Combo</Text>
          <Text style={styles.subtitle}>Perfect for today's weather</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonWrapper}
        activeOpacity={0.85}
        onPress={onPress}>
        <LinearGradient
          colors={['#7D5FFF', '#FC5C7D']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.buttonGradient}>
          <Text style={styles.buttonText}>View Look</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    margin: 16,
    shadowColor: colors.gradientstartColor,
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 16,
    elevation: 8,
    width: '90%',
    alignSelf: 'center',
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: colors.gradientstartColor,
        shadowOpacity: 0.08,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 16,
      },
    }),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconGradient: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    width: 32,
    height: 32,
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: colors.textPrimary,
    fontFamily: Fonts.DMSans700,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: Fonts.inter400,
    marginTop: 2,
  },
  buttonWrapper: {
    alignSelf: 'center',
  },
  buttonGradient: {
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FC5C7D',
    shadowOpacity: 0.12,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default BreezyLinenCard;
