/**
 * localStorage helper functions for persisting app state.
 */

const defaultSerializer = JSON.stringify
const defaultDeserializer = JSON.parse

/**
 * Load a value from localStorage, parsed as JSON.
 * @param {string} key - Storage key
 * @param {*} defaultVal - Value to return if key is missing or parse fails
 * @returns {*} Parsed value or defaultVal
 */
export function loadJSON(key, defaultVal = null) {
  try {
    const stored = localStorage.getItem(key)
    if (stored == null) return defaultVal
    return defaultDeserializer(stored)
  } catch (e) {
    console.warn(`Could not load ${key} from storage`, e)
    return defaultVal
  }
}

/**
 * Save a value to localStorage as JSON.
 * @param {string} key - Storage key
 * @param {*} val - Value to save (will be JSON stringified)
 */
export function saveJSON(key, val) {
  try {
    if (val == null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, defaultSerializer(val))
    }
  } catch (e) {
    console.warn(`Could not save ${key} to storage`, e)
  }
}
