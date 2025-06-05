import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScreenProps} from '../navigation/Stack';
import MultiSelector from '../components/Selector/MultiSelector';
import {CustomImages} from '../assets/images';

const occasions = [
  'College Daily Life',
  'Day-to-day Office',
  'Night Out',
  'Brunch Outing',
  'Wedding',
  'Parties',
  'Date',
  'Gym',
  'Own Birthday',
];

const OccasionScreen: React.FC<ScreenProps<'OccasionScreen'>> = ({
  navigation,
}) => {
  // Get safe area insets for proper padding
  const {bottom} = useSafeAreaInsets();

  const [selectedOccasion, setSelectedOccasion] = useState('');

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: bottom + 20},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header Section */}
          <MultiSelector
            data={occasions}
            value={selectedOccasion}
            onSelect={setSelectedOccasion}
            icon={CustomImages.target} // Use your icon asset here
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default OccasionScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light background for better contrast
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20, // Extra padding for scroll content
  },
});
