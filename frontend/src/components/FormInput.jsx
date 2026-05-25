export default function FormInput({
  label,
  name,
  type = 'text',
  error,
  className = '',
  ...props
}) {
  return (
    <label className="flex w-full flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</span>
      <input
        name={name}
        type={type}
        className={`w-full rounded-xl border px-3 py-2.5 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-400/50'
            : 'border-gray-300 focus:border-black focus:ring-black/20'
        } ${className}`}
        {...props}
      />
      {error ? <span className="text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  )
}
