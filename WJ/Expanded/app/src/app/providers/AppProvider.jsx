import { createContext, useContext, useState, useEffect } from 'react'
import { loadJSON, saveJSON } from '../../utils/storage'
import { AccessibilityProvider } from '../../context/AccessibilityContext'

const FILTERS_SORT_STORAGE_KEY = 'sustainability-app-filters-sort'

const defaultFilters = {
  minSustainability: 0,
  maxCarbonFootprint: null,
  priceMin: null,
  priceMax: null,
  packagingType: [],
  brand: [],
  nutritionTags: [],
}

const defaultSortOption = 'sustainable'

const AppStateContext = createContext(null)

export function AppProvider({ children }) {
  const [state, setState] = useState(() => {
    const stored = loadJSON(FILTERS_SORT_STORAGE_KEY, null)
    return {
      filters: stored?.filters ?? defaultFilters,
      sortOption: stored?.sortOption ?? defaultSortOption,
    }
  })

  useEffect(() => {
    saveJSON(FILTERS_SORT_STORAGE_KEY, {
      filters: state.filters,
      sortOption: state.sortOption,
    })
  }, [state.filters, state.sortOption])

  const setFilters = (updater) => {
    setState((prev) => ({
      ...prev,
      filters: typeof updater === 'function' ? updater(prev.filters) : updater,
    }))
  }

  const setSortOption = (option) => {
    setState((prev) => ({ ...prev, sortOption: option }))
  }

  const value = {
    filters: state.filters,
    sortOption: state.sortOption,
    setFilters,
    setSortOption,
  }

  return (
    <AppStateContext.Provider value={value}>
      <AccessibilityProvider>{children}</AccessibilityProvider>
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) {
    throw new Error('useAppState must be used within AppProvider')
  }
  return ctx
}
