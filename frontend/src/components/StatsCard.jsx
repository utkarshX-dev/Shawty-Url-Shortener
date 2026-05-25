export default function StatsCard({ title, value, subtitle }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs uppercase tracking-widest text-gray-500">{title}</p>
      <h3 className="mt-2 text-3xl font-semibold text-black">{value}</h3>
      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
    </article>
  )
}
