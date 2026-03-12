import ExpandableSection from './ExpandableSection'

const PACKAGING_IMPACT = {
  Cardboard: 'Cardboard is widely recyclable. It breaks down easily and can be recycled many times.',
  Paper: 'Paper packaging is recyclable and biodegradable. Choose recycled content when possible.',
  Compostable: 'Compostable packaging breaks down into natural materials in industrial or home compost.',
  Glass: 'Glass is infinitely recyclable. It does not degrade when recycled.',
  Tin: 'Metal tins are fully recyclable and have high recycling rates.',
  Refillable: 'Refillable packaging drastically reduces waste by reusing the same container.',
  Minimal: 'Minimal packaging cuts down on materials and transport emissions.',
  Loose: 'Loose produce uses no packaging, avoiding waste entirely.',
  Plastic: 'Plastic packaging varies. Check local recycling; many types have limited recyclability.',
}

export default function SustainabilityDetails({ product, variant = 'full' }) {
  const { carbonFootprint, packagingType, ethicalSourcing, environmentalSummary } = product
  const packagingNote = ['Cardboard', 'Paper', 'Compostable', 'Glass', 'Tin', 'Refillable', 'Minimal', 'Loose'].includes(packagingType)
    ? 'Widely recyclable or compostable.'
    : 'Check local recycling guidelines.'

  return (
    <div className="space-y-4">
      {variant === 'full' && (
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Carbon footprint:</span>
          <span>{carbonFootprint}kg CO2e per unit</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-gray-900">Packaging:</span>
          <span>{packagingType} – {packagingNote}</span>
        </div>
        {ethicalSourcing && (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">Sourcing:</span>
            <span>{ethicalSourcing}</span>
          </div>
        )}
        <div>
          <span className="font-medium text-gray-900">Summary: </span>
          <span>{environmentalSummary}</span>
        </div>
      </div>
      )}

      <ExpandableSection title="More sustainability details">
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Carbon footprint explained</h4>
            <p>
              This product has a carbon footprint of {carbonFootprint}kg CO2e per unit. That covers growing or making it,
              packaging, and transport. Lower numbers mean less impact on the climate. Compare with similar products to
              choose options with a smaller footprint.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Packaging impact</h4>
            <p>
              {PACKAGING_IMPACT[packagingType] ??
                `${packagingType} packaging. Check local recycling guidelines for disposal.`}
            </p>
          </div>
          {ethicalSourcing && (
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Sourcing details</h4>
              <p>
                This product is {ethicalSourcing.toLowerCase()}, meaning better practices for workers, farmers, or the
                environment in its supply chain.
              </p>
            </div>
          )}
        </div>
      </ExpandableSection>
    </div>
  )
}
