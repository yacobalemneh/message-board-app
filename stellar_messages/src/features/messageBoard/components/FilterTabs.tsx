import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface FilterTabsProps {
  selected: 'newest' | 'popular';
  onSelect: (val: 'newest' | 'popular') => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({selected, onSelect}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, selected === 'newest' && styles.tabActive]}
        onPress={() => onSelect('newest')}>
        <Text
          style={[
            styles.tabText,
            selected === 'newest' && styles.tabTextActive,
          ]}>
          Newest
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selected === 'popular' && styles.tabActive]}
        onPress={() => onSelect('popular')}>
        <Text
          style={[
            styles.tabText,
            selected === 'popular' && styles.tabTextActive,
          ]}>
          Popular
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  tab: {
    backgroundColor: '#33394F',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  tabActive: {
    backgroundColor: '#FF6934',
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
});

export default FilterTabs;
