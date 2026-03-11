import { useMemo } from 'react'
import { filterProducts, sortProducts } from '../utils/filterSort'

/**
 * Hook that returns filtered and sorted products based on app state.
 * @param {Object} options
 * @param {Array} [options.products] - Product list (defaults to empty; caller should pass mockProducts or filtered list)
 * @param {Object} [options.filters] - Filter object from app state
 * @param {string} [options.sortOption] - Sort option from app state
 * @returns {Array} Filtered and sorted products
 */
export function useFilteredProducts({ products = [], filters = {}, sortOption = 'sustainable' } = {}) {
  return useMemo(() => {
    const filtered = filterProducts(products, filters)
    return sortProducts(filtered, sortOption)
  }, [products, filters, sortOption])
}
