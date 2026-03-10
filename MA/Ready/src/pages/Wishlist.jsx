// Wishlist page
// Displays all saved products and allows users to manage shopping lists
// Users can remove items or add them to the comparison tool



import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/common/ProductCard'
import ExpandableSection from '../components/common/ExpandableSection'
import { mockProducts } from '../data/mockProducts'
import { useAppState } from '../hooks/useAppState'

export default function Wishlist() {
  const {
    wishlistIds,
    shoppingLists,
    removeFromWishlist,
    addToComparison,
    addShoppingList,
    removeShoppingList,
    addProductToShoppingList,
    removeProductFromShoppingList,
  } = useAppState()
  const [newListName, setNewListName] = useState('')
  const [showNewListInput, setShowNewListInput] = useState(false)

  // Get the full product objects for items currently saved in the wishlist
  const savedProducts = mockProducts.filter((p) => wishlistIds.includes(p.id))


// Create a new shopping list using the entered name
  const handleCreateList = () => {
    const name = newListName.trim() || 'My list'
    addShoppingList(name)
    setNewListName('')
    setShowNewListInput(false)
  }

  return (
    <div className="py-6 space-y-8">
      <h1 className="text-xl font-semibold text-gray-900">Saved items</h1>

      <div className="flex flex-col md:flex-row md:items-start gap-6">
          <section className="md:w-80 md:flex-shrink-0 order-1 md:order-none">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shopping lists</h2>
            {showNewListInput ? (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="List name"
                  className="flex-1 min-w-[120px] px-4 py-2 border border-gray-200 rounded-xl min-h-[44px]"
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateList()}
                />
                <button
                  type="button"
                  onClick={handleCreateList}
                  className="px-4 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 min-h-[44px]"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNewListInput(false)
                    setNewListName('')
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 min-h-[44px]"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowNewListInput(true)}
                className="mb-4 px-4 py-2 border border-green-600 text-green-700 font-medium rounded-xl hover:bg-green-50 min-h-[44px]"
              >
                + Create new list
              </button>
            )}

            {shoppingLists.length === 0 ? (
              <p className="text-gray-600 text-sm">No shopping lists yet. Create one to group items for a trip.</p>
            ) : (
              <div className="space-y-2">
                {shoppingLists.map((list) => {
                  const notInList = savedProducts.filter((p) => !list.productIds.includes(p.id))
                  return (
                  <ExpandableSection key={list.id} title={`${list.name} (${list.productIds.length} items)`}>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => removeShoppingList(list.id)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Delete list
                      </button>
                    </div>
                    {savedProducts.length > 0 && (
                      <div className="mb-3 pt-2 border-t border-gray-100">
                        <p className="text-xs font-medium text-gray-600 mb-2">Add from saved</p>
                        {notInList.length === 0 ? (
                          <p className="text-xs text-gray-500">All saved items are in this list.</p>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {notInList.map((p) => (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => addProductToShoppingList(list.id, p.id)}
                                className="text-xs px-2 py-1.5 rounded bg-green-100 text-green-800 hover:bg-green-200 min-h-[44px]"
                              >
                                + {p.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {list.productIds.length === 0 ? (
                        <li>No items. Add from saved above or from the cards on the right.</li>
                      ) : (
                        list.productIds.map((id) => {
                          const p = mockProducts.find((x) => x.id === id)
                          return (
                            <li key={id} className="flex items-center justify-between gap-2">
                              <span>{p ? p.name : `Product #${id}`}</span>
                              <button
                                type="button"
                                onClick={() => removeProductFromShoppingList(list.id, id)}
                                className="text-gray-500 hover:text-red-600"
                                aria-label={`Remove ${p?.name ?? id} from list`}
                              >
                                Remove
                              </button>
                            </li>
                          )
                        })
                      )}
                    </ul>
                  </ExpandableSection>
                  )
                })}
              </div>
            )}
          </section>

          <div className="flex-1">
            {savedProducts.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                <p className="text-gray-700 mb-4">You haven’t saved any products yet.</p>
                <Link
                  to="/search"
                  className="inline-block px-4 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 min-h-[44px] min-w-[44px]"
                >
                  Browse products
                </Link>
              </div>
            ) : (
              <div className="search-grid">
                {savedProducts.map((product) => (
                  <div key={product.id} className="relative">
                    <ProductCard product={product} />
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-sm font-medium text-gray-600 hover:text-red-600 min-h-[44px] min-w-[44px] px-3"
                      >
                        Remove from saved
                      </button>
                      <button
                        type="button"
                        onClick={() => addToComparison(product.id)}
                        className="text-sm font-medium text-green-700 hover:text-green-800 min-h-[44px] min-w-[44px] px-3"
                      >
                        Add to comparison
                      </button>
                      {shoppingLists.length > 0 && (
                        <span className="text-sm text-gray-500 flex items-center gap-1 flex-wrap">
                          Add to list:
                          {shoppingLists.map((list) => {
                            const inList = list.productIds.includes(product.id)
                            return (
                              <button
                                key={list.id}
                                type="button"
                                onClick={() =>
                                  inList
                                    ? removeProductFromShoppingList(list.id, product.id)
                                    : addProductToShoppingList(list.id, product.id)
                                }
                                className={`min-h-[44px] px-2 rounded ${
                                  inList ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {list.name}
                                {inList ? ' ✓' : ''}
                              </button>
                            )
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      <div className="flex gap-4">
        <Link
          to="/compare"
          className="inline-block px-4 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 min-h-[44px] min-w-[44px]"
        >
          Compare products
        </Link>
        <Link
          to="/"
          className="inline-block px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 min-h-[44px] min-w-[44px]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
