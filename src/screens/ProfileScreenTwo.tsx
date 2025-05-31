import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import CustomSelect from '../common/CustomSelect';
import SelectableCardGrid from '../common/SelectableCardGrid';
import { CustomImages } from '../assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenProps } from '../navigation/Stack';
import CustomButton from '../common/CustumButton';

const ShoppingOptions = [
  { id: 'affordable', label: 'Affordable', emoji: CustomImages.money },
  { id: 'premium', label: 'Premium', emoji: CustomImages.premium }, // Fixed typo 'premiun'
  { id: 'luxury', label: 'Luxury', emoji: CustomImages.luxury },
];

const OutfitStruggleOptions = [
  { id: 'collegeDailyLife', label: 'College Daily Life', emoji: CustomImages.college },
  { id: 'dayTodayOffice', label: 'Day-to-Day Office', emoji: CustomImages.office },
  { id: 'nightOut', label: 'Night Out', emoji: CustomImages.moon },
  { id: 'brunchOuting', label: 'Brunch Outing', emoji: CustomImages.burnch }, // Fixed typo 'Outine'
  { id: 'wedding', label: 'Wedding', emoji: CustomImages.wedding },
  { id: 'parties', label: 'Parties', emoji: CustomImages.party },
  { id: 'date', label: 'Date', emoji: CustomImages.date },
  { id: 'gym', label: 'Gym', emoji: CustomImages.gym },
  { id: 'birthday', label: 'Birthday', emoji: CustomImages.birthday },
];

const ProfileScreenTwo: React.FC<ScreenProps<'ProfileScreenTwo'>> = () => {
  const [skinTone, setSkinTone] = useState<string>('');
  const [skinUndertone, setSkinUndertone] = useState<string>('');
  const [profession, setProfession] = useState<string>('');
  const [shoppingPreference, setShoppingPreference] = useState<string[]>([]);
  const [outfitStruggles, setOutfitStruggles] = useState<string[]>([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  // Validate if all required fields are filled
  useEffect(() => {
    const isValid =
      skinTone !== '' &&
      skinUndertone !== '' &&
      profession !== '' &&
      shoppingPreference.length > 0 &&
      outfitStruggles.length > 0;
    setIsButtonEnabled(isValid);
  }, [skinTone, skinUndertone, profession, shoppingPreference, outfitStruggles]);

  const handleSelectionChange =
    (type: 'shoppingPreference' | 'outfitStruggles') => (selectedIds: string[]) => {
      if (type === 'shoppingPreference') {
        setShoppingPreference(selectedIds);
      } else {
        setOutfitStruggles(selectedIds);
      }
      console.log(`Selected ${type}:`, selectedIds);
    };

  const handleNextNav = useCallback(() => {
    if (isButtonEnabled) {
      console.log('Navigating to Step 2', {
        skinTone,
        skinUndertone,
        profession,
        shoppingPreference,
        outfitStruggles,
      });
      // Add navigation logic here
    }
  }, [isButtonEnabled, skinTone, skinUndertone, profession, shoppingPreference, outfitStruggles]);

  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginBottom: bottom }]}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent]}
        showsVerticalScrollIndicator={false}>
        {/* Skin Tone, Skin Undertone, and Profession Select */}
        <View style={styles.section}>
          <CustomSelect
            label="Skin Tone"
            data={['Very Fair', 'Fair', 'Light', 'Medium', 'Olive', 'Tan', 'Dark', 'Deep']}
            placeholder="Select your skin tone"
            onSelect={value => setSkinTone(value)}
          />
          <CustomSelect
            label="Skin Undertone"
            data={[
              'Cool (Pink, Red, Blue)',
              'Warm (Yellow, Golden, Peach)',
              'Neutral (Mix of Cool & Warm)',
              'Not Sure',
            ]}
            placeholder="Select your skin undertone"
            onSelect={value => setSkinUndertone(value)}
          />
          <CustomSelect
            label="Profession"
            data={[
              'Student',
              'Corporate/Office Worker',
              'Creative Professional',
              'Healthcare',
              'Education',
              'Entrepreneur',
              'Retail/Service',
              'Freelancer',
              'Other',
            ]}
            placeholder="Select your profession"
            onSelect={value => setProfession(value)}
          />
        </View>

        {/* Shopping Preference */}
        <View style={styles.section}>
          <SelectableCardGrid
            title="Shopping Preference"
            description="Which price range do you usually shop in?"
            data={ShoppingOptions}
            isMultiSelect={false}
            onSelectionChange={handleSelectionChange('shoppingPreference')}
          />
        </View>

        {/* Outfit Struggles */}
        <View style={styles.section}>
          <SelectableCardGrid
            title="Outfit Struggles"
            description="Which outfits do you struggle with the most? (Select multiple)"
            data={OutfitStruggleOptions}
            isMultiSelect={true}
            onSelectionChange={handleSelectionChange('outfitStruggles')}
          />
        </View>
      </ScrollView>
      <CustomButton
        title="Complete Profile"
        onPress={handleNextNav}
        disabled={!isButtonEnabled}
        style={[styles.button, !isButtonEnabled && { opacity: 0.3 }]}
      />
    </View>
  );
};

export default ProfileScreenTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  heightValueContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  heightValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    // Add any default button styles here if needed
  },
});