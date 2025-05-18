import { useState, useMemo } from 'react';

export const useFilters = (filter) => {
  const [activeFilters, setActiveFilters] = useState({});


  // Generate filter groups from products
  const filters = useMemo(() => {
    return filter.map(filter => {
      // Sort COLOR options alphabetically
      if (filter.name.toLowerCase() === 'color') {
        return {
          ...filter,
          options: [...filter.options].sort((a, b) => 
            a.value.localeCompare(b.value)
          )
        };
      }
      return filter;
    });
  }, [filter]);

  // Toggle a filter on/off
  const toggleFilter = (group, value) => {
    setActiveFilters(prev => {
      const currentGroupFilters = prev[group] || [];
      const updatedGroupFilters = currentGroupFilters.includes(value)
        ? currentGroupFilters.filter(v => v !== value)
        : [...currentGroupFilters, value];

      if (updatedGroupFilters.length === 0) {
        const { [group]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [group]: updatedGroupFilters
      };
    });
  };

  // Clear All Filters
  const clearAllFilters = () => {
    setActiveFilters({});
  };

  return {
    filters,
    activeFilters,
    toggleFilter,
    clearAllFilters
  };
};