import { createContext, useContext, useState, useEffect } from 'react'

const AccessibilityContext = createContext(null)

const STORAGE_KEY = 'sustainability-app-accessibility'

const defaultState = {
  largerText: false,
  highContrast: false,
  largerTouchTargets: false,
  simpleNavMode: false,
  screenReaderMode: false,
}

const PRESETS = {
  vision: {
    largerText: true,
    highContrast: true,
    largerTouchTargets: false,
    simpleNavMode: false,
    screenReaderMode: true,
  },
  motor: {
    largerText: false,
    highContrast: false,
    largerTouchTargets: true,
    simpleNavMode: true,
    screenReaderMode: false,
  },
  cognitive: {
    largerText: true,
    highContrast: false,
    largerTouchTargets: true,
    simpleNavMode: true,
    screenReaderMode: false,
  },
}

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...defaultState, ...JSON.parse(stored) }
    }
  } catch (e) {
    console.warn('Could not load accessibility settings', e)
  }
  return defaultState
}

function saveToStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('Could not save accessibility settings', e)
  }
}

export function AccessibilityProvider({ children }) {
  const [state, setState] = useState(loadFromStorage)

  useEffect(() => {
    saveToStorage(state)
  }, [state])

  const setToggle = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const applyPreset = (presetName) => {
    const preset = PRESETS[presetName]
    if (preset) {
      setState((prev) => ({ ...prev, ...preset }))
    }
  }

  const resetPresets = () => {
    setState(defaultState)
  }

  return (
    <AccessibilityContext.Provider
      value={{
        ...state,
        setToggle,
        applyPreset,
        resetPresets,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) {
    throw new Error('useAccessibility must be used within AccessibilityProvider')
  }
  return ctx
}
