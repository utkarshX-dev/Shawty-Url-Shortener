export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  )
}
