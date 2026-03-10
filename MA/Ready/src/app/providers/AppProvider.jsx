import { createContext, useContext, useState, useEffect } from 'react'
import { loadJSON, saveJSON } from '../../utils/storage'
import { AccessibilityProvider } from '../../context/AccessibilityContext'

const FILTERS_SORT_STORAGE_KEY = 'sustainability-app-filters-sort'
const WISHLIST_STORAGE_KEY = 'sustainability-app-wishlist'
const COMPARISON_STORAGE_KEY = 'sustainability-app-comparison'
const SHOPPING_LISTS_STORAGE_KEY = 'sustainability-app-shopping-lists'
const ACCOUNT_PREFS_STORAGE_KEY = 'sustainability-app-account-prefs'
const HISTORY_STORAGE_KEY = 'sustainability-app-history'

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

const defaultSustainabilityGoals = {
  reduceCarbon: true,
  preferOrganic: true,
  preferRecyclable: true,
  maxCarbonPerItem: 1.5,
}

const AppStateContext = createContext(null)

export function AppProvider({ children }) {
  const [state, setState] = useState(() => {
    const stored = loadJSON(FILTERS_SORT_STORAGE_KEY, null)
    const wishlist = loadJSON(WISHLIST_STORAGE_KEY, [])
    const comparison = loadJSON(COMPARISON_STORAGE_KEY, [])
    const shoppingLists = loadJSON(SHOPPING_LISTS_STORAGE_KEY, [])
    const accountPrefs = loadJSON(ACCOUNT_PREFS_STORAGE_KEY, { sustainabilityGoals: defaultSustainabilityGoals })
    const history = loadJSON(HISTORY_STORAGE_KEY, [])

    return {
      filters: stored?.filters ?? defaultFilters,
      sortOption: stored?.sortOption ?? defaultSortOption,
      wishlistIds: Array.isArray(wishlist) ? wishlist : [],
      comparisonIds: Array.isArray(comparison) ? comparison : [],
      shoppingLists: Array.isArray(shoppingLists) ? shoppingLists : [],
      accountPrefs: accountPrefs?.sustainabilityGoals ? accountPrefs : { sustainabilityGoals: defaultSustainabilityGoals },
      history: Array.isArray(history) ? history : [],
    }
  })

  useEffect(() => {
    saveJSON(FILTERS_SORT_STORAGE_KEY, {
      filters: state.filters,
      sortOption: state.sortOption,
    })
  }, [state.filters, state.sortOption])

  useEffect(() => {
    saveJSON(WISHLIST_STORAGE_KEY, state.wishlistIds)
  }, [state.wishlistIds])

  useEffect(() => {
    saveJSON(COMPARISON_STORAGE_KEY, state.comparisonIds)
  }, [state.comparisonIds])

  useEffect(() => {
    saveJSON(SHOPPING_LISTS_STORAGE_KEY, state.shoppingLists)
  }, [state.shoppingLists])

  useEffect(() => {
    saveJSON(ACCOUNT_PREFS_STORAGE_KEY, state.accountPrefs)
  }, [state.accountPrefs])

  useEffect(() => {
    saveJSON(HISTORY_STORAGE_KEY, state.history)
  }, [state.history])

  const now = () => new Date().toISOString()

  const withHistoryLimit = (entries) => entries.slice(0, 50)

  const setFilters = (updater) => {
    setState((prev) => ({
      ...prev,
      filters: typeof updater === 'function' ? updater(prev.filters) : updater,
    }))
  }

  const setSortOption = (option) => {
    setState((prev) => ({ ...prev, sortOption: option }))
  }

  const toggleWishlist = (productId) => {
    setState((prev) => {
      const has = prev.wishlistIds.includes(productId)
      const wishlistIds = has
        ? prev.wishlistIds.filter((id) => id !== productId)
        : [...prev.wishlistIds, productId]
      const historyEntry = {
        id: `${Date.now()}-${productId}-wishlist`,
        type: has ? 'wishlist-remove' : 'wishlist-add',
        productId,
        timestamp: now(),
      }
      const history = withHistoryLimit([historyEntry, ...prev.history])
      return { ...prev, wishlistIds, history }
    })
  }

  const removeFromWishlist = (productId) => {
    setState((prev) => {
      const historyEntry = {
        id: `${Date.now()}-${productId}-wishlist-remove`,
        type: 'wishlist-remove',
        productId,
        timestamp: now(),
      }
      const history = withHistoryLimit([historyEntry, ...prev.history])
      return {
        ...prev,
        wishlistIds: prev.wishlistIds.filter((id) => id !== productId),
        history,
      }
    })
  }

  const addToComparison = (productId) => {
    setState((prev) => {
      if (prev.comparisonIds.includes(productId)) return prev
      const comparisonIds =
        prev.comparisonIds.length >= 4 ? [...prev.comparisonIds.slice(1), productId] : [...prev.comparisonIds, productId]
      const historyEntry = {
        id: `${Date.now()}-${productId}-compare-add`,
        type: 'comparison-add',
        productId,
        timestamp: now(),
      }
      const history = withHistoryLimit([historyEntry, ...prev.history])
      return { ...prev, comparisonIds, history }
    })
  }

  const removeFromComparison = (productId) => {
    setState((prev) => {
      const historyEntry = {
        id: `${Date.now()}-${productId}-compare-remove`,
        type: 'comparison-remove',
        productId,
        timestamp: now(),
      }
      const history = withHistoryLimit([historyEntry, ...prev.history])
      return {
        ...prev,
        comparisonIds: prev.comparisonIds.filter((id) => id !== productId),
        history,
      }
    })
  }

  const clearComparison = () => {
    setState((prev) => {
      const historyEntry = {
        id: `${Date.now()}-comparison-clear`,
        type: 'comparison-clear',
        timestamp: now(),
      }
      const history = withHistoryLimit([historyEntry, ...prev.history])
      return { ...prev, comparisonIds: [], history }
    })
  }

  const addShoppingList = (name) => {
    setState((prev) => {
      const newList = { id: Date.now().toString(), name, productIds: [] }
      const historyEntry = {
        id: `${newList.id}-list-add`,
        type: 'shopping-list-add',
        listId: newList.id,
        name,
        timestamp: now(),
      }
      const history = withHistoryLimit([historyEntry, ...prev.history])
      return {
        ...prev,
        shoppingLists: [...prev.shoppingLists, newList],
        history,
      }
    })
  }

  const updateShoppingList = (listId, updater) => {
    setState((prev) => ({
      ...prev,
      shoppingLists: prev.shoppingLists.map((list) =>
        list.id === listId ? (typeof updater === 'function' ? updater(list) : { ...list, ...updater }) : list
      ),
    }))
  }

  const removeShoppingList = (listId) => {
    setState((prev) => {
      const list = prev.shoppingLists.find((l) => l.id === listId)
      const historyEntry = {
        id: `${Date.now()}-${listId}-list-remove`,
        type: 'shopping-list-remove',
        listId,
        name: list?.name,
        timestamp: now(),
      }
      const history = withHistoryLimit([historyEntry, ...prev.history])
      return {
        ...prev,
        shoppingLists: prev.shoppingLists.filter((l) => l.id !== listId),
        history,
      }
    })
  }

  const addProductToShoppingList = (listId, productId) => {
    setState((prev) => {
      const historyEntry = {
        id: `${Date.now()}-${listId}-${productId}-list-add`,
        type: 'shopping-list-product-add',
        listId,
        productId,
        timestamp: now(),
      }
      const history = withHistoryLimit([historyEntry, ...prev.history])
      return {
        ...prev,
        shoppingLists: prev.shoppingLists.map((list) =>
          list.id === listId && !list.productIds.includes(productId)
            ? { ...list, productIds: [...list.productIds, productId] }
            : list
        ),
        history,
      }
    })
  }

  const removeProductFromShoppingList = (listId, productId) => {
    setState((prev) => {
      const historyEntry = {
        id: `${Date.now()}-${listId}-${productId}-list-remove`,
        type: 'shopping-list-product-remove',
        listId,
        productId,
        timestamp: now(),
      }
      const history = withHistoryLimit([historyEntry, ...prev.history])
      return {
        ...prev,
        shoppingLists: prev.shoppingLists.map((list) =>
          list.id === listId ? { ...list, productIds: list.productIds.filter((id) => id !== productId) } : list
        ),
        history,
      }
    })
  }

  const setAccountPrefs = (updater) => {
    setState((prev) => ({
      ...prev,
      accountPrefs: typeof updater === 'function' ? updater(prev.accountPrefs) : { ...prev.accountPrefs, ...updater },
    }))
  }

  const setSustainabilityGoals = (goals) => {
    setState((prev) => {
      const updatedGoals =
        typeof goals === 'function' ? goals(prev.accountPrefs.sustainabilityGoals) : { ...prev.accountPrefs.sustainabilityGoals, ...goals }
      const historyEntry = {
        id: `${Date.now()}-goals-update`,
        type: 'goals-update',
        goals: updatedGoals,
        timestamp: now(),
      }
      const history = withHistoryLimit([historyEntry, ...prev.history])
      return {
        ...prev,
        accountPrefs: {
          ...prev.accountPrefs,
          sustainabilityGoals: updatedGoals,
        },
        history,
      }
    })
  }

  const clearHistory = () => {
    setState((prev) => ({
      ...prev,
      history: [],
    }))
  }

  const value = {
    filters: state.filters,
    sortOption: state.sortOption,
    wishlistIds: state.wishlistIds,
    comparisonIds: state.comparisonIds,
    shoppingLists: state.shoppingLists,
    accountPrefs: state.accountPrefs,
    history: state.history,
    setFilters,
    setSortOption,
    toggleWishlist,
    removeFromWishlist,
    addToComparison,
    removeFromComparison,
    clearComparison,
    addShoppingList,
    updateShoppingList,
    removeShoppingList,
    addProductToShoppingList,
    removeProductFromShoppingList,
    setAccountPrefs,
    setSustainabilityGoals,
    clearHistory,
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
