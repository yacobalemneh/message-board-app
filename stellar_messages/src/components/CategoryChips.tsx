import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface CategoryChipsProps {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (cat: string) => void;
}

const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategories,
  onToggleCategory,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(cat => {
          const selected = selectedCategories.includes(cat);
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, selected && styles.chipSelected]}
              onPress={() => onToggleCategory(cat)}>
              <Text
                style={[styles.chipText, selected && styles.chipTextSelected]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  chip: {
    backgroundColor: '#33394F',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: '#FF6934',
  },
  chipText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  chipTextSelected: {
    fontWeight: '600',
  },
});

export default CategoryChips;
