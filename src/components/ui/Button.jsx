import { motion } from 'framer-motion'
import { tapScale } from '../../utils/animations'

const variants = {
  primary:
    'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg',
  secondary:
    'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white',
  outline:
    'bg-transparent text-text border-2 border-border hover:border-primary hover:text-primary',
  ghost:
    'bg-transparent text-gray hover:text-primary hover:bg-background-light',
  accent:
    'bg-accent text-white hover:bg-accent-dark shadow-md hover:shadow-lg',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  onClick,
  type = 'button',
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ y: -2 }}
        whileTap={tapScale}
        {...props}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: -2 }}
      whileTap={tapScale}
      {...props}
    >
      {content}
    </motion.button>
  )
}
