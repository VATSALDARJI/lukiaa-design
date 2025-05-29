import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomSelect from '../common/CustomSelect';
import SelectableCardGrid from '../common/SelectableCardGrid';
import HeightSlider from '../components/slider/HeightSlider';

const outfitOptions = [
  {id: 'college', label: 'College Daily Life', emoji: '🎓'},
  {id: 'office', label: 'Day-to-day Office', emoji: '💼'},
  {id: 'nightout', label: 'Night Out', emoji: '🌙'},
  {id: 'brunch', label: 'Brunch Outing', emoji: '🥐'},
  {id: 'wedding', label: 'Wedding', emoji: '💒'},
  {id: 'parties', label: 'Parties', emoji: '🥳'},
  {id: 'datenight', label: 'Date Nights', emoji: '💖'},
  {id: 'gym', label: 'Gym', emoji: '🏆'},
  {id: 'birthday', label: 'Own Birthdays', emoji: '🎂'},
];

const ProfileScreen = () => {
  const [selectedHeight, setSelectedHeight] = useState<number>(70);
  const handleSelectionChange = selectedIds => {
    console.log('Selected:', selectedIds);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Height Section */}
        <View style={styles.section}>
          <HeightSlider onHeightChange={height => setSelectedHeight(height)} />
        </View>

        {/* Gender and Age Select */}
        <View style={styles.section}>
          <CustomSelect
            label="Gender"
            data={['Male', 'Female', 'Other']}
            placeholder="Select your gender"
            onSelect={value => console.log('Selected:', value)}
          />
          <CustomSelect
            label="Age"
            data={['18-24', '25-34', '35-44', '45-54', '55+']}
            placeholder="Select your age"
            onSelect={value => console.log('Selected:', value)}
          />
        </View>

        {/* Body Shape */}
        <View style={styles.section}>
          <SelectableCardGrid
            title="Body Shape"
            description="Choose the shape that best describes your body type"
            data={outfitOptions}
            isMultiSelect={true}
            onSelectionChange={handleSelectionChange}
          />
        </View>

        {/* Body Size */}
        <View style={styles.section}>
          <SelectableCardGrid
            title="Body Size"
            description="Select your overall build and physique"
            data={outfitOptions}
            isMultiSelect={true}
            onSelectionChange={handleSelectionChange}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
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
});
