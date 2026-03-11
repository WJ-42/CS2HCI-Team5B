import { createContext, useContext, useState, useEffect } from 'react'
import { loadJSON, saveJSON } from '../../utils/storage'
import { AccessibilityProvider } from '../../context/AccessibilityContext'

const FILTERS_SORT_STORAGE_KEY = 'sustainability-app-filters-sort'
const COMPARE_STORAGE_KEY = 'sustainability-app-compare'

const defaultFilters = {
  category: null,
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
    const compareStored = loadJSON(COMPARE_STORAGE_KEY, { ids: [], category: null })
    const compareIds = Array.isArray(compareStored) ? compareStored : (compareStored?.ids ?? [])
    const compareCategory = Array.isArray(compareStored) ? null : (compareStored?.category ?? null)
    return {
      filters: stored?.filters ?? defaultFilters,
      sortOption: stored?.sortOption ?? defaultSortOption,
      compareProductIds: Array.isArray(compareIds) ? compareIds : [],
      compareCategory,
    }
  })

  useEffect(() => {
    saveJSON(FILTERS_SORT_STORAGE_KEY, {
      filters: state.filters,
      sortOption: state.sortOption,
    })
  }, [state.filters, state.sortOption])

  useEffect(() => {
    saveJSON(COMPARE_STORAGE_KEY, {
      ids: state.compareProductIds,
      category: state.compareCategory,
    })
  }, [state.compareProductIds, state.compareCategory])

  const addToCompare = (productId, category) => {
    setState((prev) => {
      const ids = prev.compareProductIds ?? []
      const currentCategory = prev.compareCategory
      // If compare is empty, add and set category
      if (ids.length === 0) {
        return { ...prev, compareProductIds: [productId], compareCategory: category ?? null }
      }
      // If product already in list, no change
      if (ids.includes(productId)) return prev
      // If different category (or category unknown from old data), replace with new product so we only compare same type
      if (category && category !== currentCategory) {
        return { ...prev, compareProductIds: [productId], compareCategory: category }
      }
      // Same category, add (max 4)
      const next = [...ids, productId].slice(-4)
      return { ...prev, compareProductIds: next }
    })
  }

  const removeFromCompare = (productId) => {
    setState((prev) => {
      const ids = (prev.compareProductIds ?? []).filter((id) => id !== productId)
      return {
        ...prev,
        compareProductIds: ids,
        compareCategory: ids.length === 0 ? null : prev.compareCategory,
      }
    })
  }

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
    compareProductIds: state.compareProductIds ?? [],
    compareCategory: state.compareCategory ?? null,
    addToCompare,
    removeFromCompare,
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
