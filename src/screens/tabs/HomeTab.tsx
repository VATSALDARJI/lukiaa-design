import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import PerfectOutfitCard from '../../components/card/PerfectOutfitCard';
import BreezyLinenCard from '../../components/card/BreezyLinenCard';
import {ScreenProps} from '../../navigation/Stack';
import SelectableCardGrid from '../../common/SelectableCardGrid';
import {CustomImages} from '../../assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Fonts} from '../../assets/fonts/Customfont';
import DealsCard from '../../components/card/productList';

// Define the outfit struggle options with unique IDs, labels, and corresponding emojis
const OutfitStruggleOptions = [
  {
    id: 'collegeDailyLife',
    label: 'College Daily Life',
    emoji: CustomImages.college,
  },
  {
    id: 'dayTodayOffice',
    label: 'Day-to-Day Office',
    emoji: CustomImages.office,
  },
  {id: 'nightOut', label: 'Night Out', emoji: CustomImages.moon},
  {id: 'brunchOuting', label: 'Brunch Outing', emoji: CustomImages.brunch},
  {id: 'wedding', label: 'Wedding', emoji: CustomImages.wedding},
  {id: 'parties', label: 'Parties', emoji: CustomImages.party},
  {id: 'date', label: 'Date', emoji: CustomImages.date},
  {id: 'gym', label: 'Gym', emoji: CustomImages.gym},
  {id: 'birthday', label: 'Birthday', emoji: CustomImages.birthday},
];

const HomeTab: React.FC<ScreenProps<'Home'>> = ({navigation}) => {
  // State to track selected outfit struggle options
  const [mostlyStrugglesWith, setMostlyStrugglesWith] = useState<string[]>([]);

  // Handle navigation to the next screen
  const handleNextNav = useCallback(() => {
    // Add navigation logic here, e.g., navigate to a details screen
    navigation.navigate('OccasionScreen');
  }, [navigation, mostlyStrugglesWith]);

  // Handle selection changes in the SelectableCardGrid
  const handleSelectionChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
      (selectedIds: string[]) => {
        setter(selectedIds);
        console.log(`Selected:`, selectedIds);
      },
    [],
  );

  // Get safe area insets for proper padding
  const {bottom} = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, {paddingBottom: bottom+20}]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Perfect Outfit Card */}
          <View style={styles.section}>
            <PerfectOutfitCard onPress={handleNextNav} />
          </View>

          {/* Shopping Preference Selection */}
          <View style={styles.section}>
            <SelectableCardGrid
              title="Occasions"
              customTitleStyle={styles.selectTitle}
              data={OutfitStruggleOptions}
              isMultiSelect={false}
              onSelectionChange={
                handleSelectionChange(setMostlyStrugglesWith) as any
              }
            />
          </View>

          {/* Breezy Linen Card */}
          <View style={styles.section}>
            <BreezyLinenCard
              iconSource={CustomImages.clothes}
              onPress={handleNextNav}
            />
          </View>
          <DealsCard/>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  selectTitle: {
    fontFamily: Fonts.poppins700,
  },
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
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    marginBottom: 16, // Consistent spacing between sections
  },
});
