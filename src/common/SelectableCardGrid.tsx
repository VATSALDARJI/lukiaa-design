import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../constants/colors';
import {Fonts} from '../assets/fonts/Customfont';

// Interface for props
interface SelectableCardGridProps {
  data: {id: string; emoji: ImageSourcePropType; label: string}[];
  isMultiSelect?: boolean;
  onSelectionChange?: (selected: string[] | string) => void;
  columns?: number;
  title?: string;
  description?: string;
}

const SelectableCardGrid = ({
  data = [],
  isMultiSelect = true,
  onSelectionChange = () => {},
  columns = 3,
  title = '',
  description = '',
}: SelectableCardGridProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    let updated: string[] = [];

    if (isMultiSelect) {
      updated = selected.includes(id)
        ? selected.filter(item => item !== id)
        : [...selected, id];
      setSelected(updated);
      onSelectionChange(updated);
    } else {
      updated = [id];
      setSelected(updated);
      onSelectionChange(id); // single selection returns string
    }
  };

  const renderItem = ({
    item,
  }: {
    item: {id: string; emoji: ImageSourcePropType; label: string};
  }) => {
    const isSelected = selected.includes(item.id);
    const isHovered = hoveredId === item.id;

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => toggleSelect(item.id)}
          onPressIn={() => setHoveredId(item.id)}
          onPressOut={() => setHoveredId(null)}
          activeOpacity={0.8}>
          <View
            style={[
              styles.card,
              isSelected && styles.cardSelected,
              isHovered && styles.cardHovered,
            ]}>
            {isSelected ? (
              <LinearGradient
                colors={[colors.gradientstartColor, colors.gradientendColor]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.gradient}>
                <View style={styles.content}>
                  <Image source={item.emoji} style={styles.emoji} />
                </View>
              </LinearGradient>
            ) : (
              <View style={styles.content}>
                <Image source={item.emoji} style={styles.emoji} />
              </View>
            )}
          </View>
        </TouchableOpacity>
        <Text
          style={[styles.label, isSelected && styles.labelSelected]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <View>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {description ? <Text style={styles.subTitle}>{description}</Text> : null}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={columns}
        style={styles.flatListStyle}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

export default SelectableCardGrid;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: Fonts.inter500,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subTitle: {
    fontFamily: Fonts.inter400,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  flatListStyle: {
    paddingTop: 8,
  },
  gridContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  itemContainer: {
    width: `${100 / 3}%`,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  touchable: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.trustBase,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    overflow: 'hidden',
    width: '100%',
    height: 80,
  },
  cardSelected: {
    backgroundColor: 'transparent',
  },
  cardHovered: {
    transform: [{translateY: -4}],
    borderColor: colors.gradientstartColor,
    // Removed backgroundColor: colors.white to prevent white flash
  },
  gradient: {
    borderRadius: 16,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  emoji: {
    width: 40,
    height: 40,
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.inter500,
    textAlign: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  labelSelected: {
    color: colors.gradientstartColor,
  },
});
