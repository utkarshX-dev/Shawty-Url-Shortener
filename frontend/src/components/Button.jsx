export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/40 disabled:cursor-not-allowed disabled:opacity-60'

  const variants = {
    primary: 'bg-black text-white hover:bg-black/90',
    secondary: 'border border-black bg-white text-black hover:bg-zinc-800 hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-gray-100 text-black hover:bg-gray-200',
  }

  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
