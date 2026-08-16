// Base skeleton block — a shimmering placeholder rectangle.
// Compose these into page-specific skeleton layouts below.
export function SkeletonBox({ width = '100%', height = '1rem', radius = '6px', style = {} }) {
  return (
    <div
      className="skeleton-shimmer"
      style={{
        width,
        height,
        borderRadius: radius,
        ...style,
      }}
    />
  )
}

// Circle placeholder (avatars, icons)
export function SkeletonCircle({ size = '140px', style = {} }) {
  return (
    <div
      className="skeleton-shimmer"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        ...style,
      }}
    />
  )
}

// A generic "card" skeleton — image block + a title line + 2 text lines.
// Used for Certification / Projects grids.
export function SkeletonCard({ withImage = true, imageHeight = '200px' }) {
  return (
    <div
      className="card"
      style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
    >
      {withImage && <SkeletonBox height={imageHeight} radius="8px" />}
      <SkeletonBox width="70%" height="1.3rem" />
      <SkeletonBox width="45%" height="0.9rem" />
      <SkeletonBox width="100%" height="0.85rem" />
      <SkeletonBox width="90%" height="0.85rem" />
    </div>
  )
}

// A grid of card skeletons — mirrors the real auto-fill grid used on
// Certification / Projects pages so the loading state matches final layout.
export function SkeletonCardGrid({ count = 4, minColWidth = '320px', imageHeight = '200px' }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${minColWidth}, 1fr))`,
        gap: '1.5rem',
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} imageHeight={imageHeight} />
      ))}
    </div>
  )
}

// A timeline-entry skeleton — mirrors Experience / Education cards
// (title line, subtitle line, date pill, 2-3 body lines).
export function SkeletonTimelineCard() {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <SkeletonBox width="55%" height="1.3rem" />
      <SkeletonBox width="40%" height="0.9rem" />
      <SkeletonBox width="150px" height="1.8rem" radius="999px" />
      <SkeletonBox width="100%" height="0.85rem" />
      <SkeletonBox width="95%" height="0.85rem" />
      <SkeletonBox width="60%" height="0.85rem" />
    </div>
  )
}

// A row of pill-shaped skeletons — mirrors a Skills category's chip row.
export function SkeletonChipRow({ count = 4 }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBox key={i} width={`${80 + (i % 3) * 30}px`} height="2.2rem" radius="999px" />
      ))}
    </div>
  )
}