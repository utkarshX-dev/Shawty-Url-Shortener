export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  )
}
