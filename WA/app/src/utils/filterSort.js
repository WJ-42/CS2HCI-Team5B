/**
 * Reusable filter and sort logic for products.
 * Works with both letter ratings (A/B/C) and numeric sustainabilityRating.
 */

const RATING_TO_NUMBER = { A: 90, B: 70, C: 50 }

function getSustainabilityNumeric(product) {
  const r = product.sustainabilityRating
  if (typeof r === 'number') return r
  return RATING_TO_NUMBER[r] ?? 0
}

function getCarbonFootprint(product) {
  return product.carbonFootprintKg ?? product.carbonFootprint ?? 0
}

/**
 * Filter products by the given filter object.
 * @param {Array} products - Array of product objects
 * @param {Object} filters - Filter criteria
 * @param {number} [filters.minSustainability] - Minimum sustainability rating (0-100)
 * @param {number} [filters.maxCarbonFootprint] - Maximum carbon footprint (kg CO2e)
 * @param {number} [filters.priceMin] - Minimum price
 * @param {number} [filters.priceMax] - Maximum price
 * @param {string[]} [filters.packagingType] - Allowed packaging types (OR)
 * @param {string[]} [filters.brand] - Allowed brands (OR)
 * @param {string[]} [filters.nutritionTags] - Product must have at least one of these tags (OR)
 * @param {string|null} [filters.category] - Filter by category
 * @returns {Array} Filtered products
 */
export function filterProducts(products, filters = {}) {
  if (!filters || Object.keys(filters).length === 0) return products

  return products.filter((p) => {
    if (filters.category) {
      if (p.category !== filters.category) return false
    }
    if (filters.minSustainability != null) {
      const rating = getSustainabilityNumeric(p)
      if (rating < filters.minSustainability) return false
    }
    if (filters.maxCarbonFootprint != null) {
      const carbon = getCarbonFootprint(p)
      if (carbon > filters.maxCarbonFootprint) return false
    }
    if (filters.priceMin != null && p.price < filters.priceMin) return false
    if (filters.priceMax != null && p.price > filters.priceMax) return false
    if (filters.packagingType?.length) {
      if (!filters.packagingType.includes(p.packagingType)) return false
    }
    if (filters.brand?.length) {
      if (!filters.brand.includes(p.brand)) return false
    }
    if (filters.nutritionTags?.length) {
      const tags = p.nutritionTags ?? []
      const hasAny = filters.nutritionTags.some((t) => tags.includes(t))
      if (!hasAny) return false
    }
    return true
  })
}

/**
 * Sort products by the given sort option.
 * @param {Array} products - Array of product objects
 * @param {string} sortOption - 'sustainable' | 'carbon'
 * @returns {Array} Sorted products (new array)
 */
export function sortProducts(products, sortOption = 'sustainable') {
  const arr = [...products]
  if (sortOption === 'carbon') {
    arr.sort((a, b) => getCarbonFootprint(a) - getCarbonFootprint(b))
  } else {
    arr.sort((a, b) => getSustainabilityNumeric(b) - getSustainabilityNumeric(a))
  }
  return arr
}
