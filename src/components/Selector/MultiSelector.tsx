import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ViewStyle } from 'react-native';
import { CustomImages } from '../../assets/images';

interface MultiSelectorProps {
  data: string[];
  value?: string;
  onSelect: (item: string) => void;
  label?: string;
  icon?: any;
  style?: ViewStyle;
}

const MultiSelector: React.FC<MultiSelectorProps> = ({
  data,
  value,
  onSelect,
  label = "What's the Occasion?",
  icon,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelRow}>
        {icon && <Image source={icon} style={styles.icon} />}
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.chipsContainer}>
        {data.map(item => {
          const isSelected = value === item;
          return (
            <TouchableOpacity
              key={item}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
                isSelected && { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }
              ]}
              onPress={() => onSelect(item)}
              activeOpacity={0.75}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {item}
              </Text>
              {isSelected && (
                <Image
                  source={CustomImages.check} // Replace with your success/check icon
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default MultiSelector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    margin: 8,
    elevation: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 7,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10, // works on React Native 0.71+, otherwise use marginRight/marginBottom
  },
  chip: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  chipSelected: {
    borderWidth: 0,
    backgroundColor: 'linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)', // fallback for iOS, use gradient library for RN
    // backgroundColor: '#a18cd1', // fallback for RN
    // To get the real gradient, use react-native-linear-gradient as a wrapper
  },
  chipText: {
    color: '#5c5c5c',
    fontSize: 16,
  },
  chipTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkIcon: {
    width: 18,
    height: 18,
    marginLeft: 6,
    tintColor: '#fff',
  },
});