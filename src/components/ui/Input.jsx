export default function Input({ label, id, error, className = '', ...props }) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-4 py-3 rounded-xl border ${
          error ? 'border-red-400 focus:ring-red-200' : 'border-border focus:ring-primary/20'
        } bg-white text-text placeholder:text-gray-light focus:outline-none focus:ring-2 focus:border-primary transition-all duration-200`}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
}
