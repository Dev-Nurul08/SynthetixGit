import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-brand-400 text-bg-canvas font-semibold hover:bg-brand-300 active:bg-brand-500 shadow-[0_0_24px_-8px_rgba(34,211,238,0.5)]',
  secondary:
    'bg-bg-tertiary text-text-primary border border-border-primary hover:bg-bg-elevated hover:border-border-secondary',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-white/[0.04]',
  outline:
    'border border-border-secondary text-text-primary bg-transparent hover:bg-white/[0.03] hover:border-border-tertiary',
  danger:
    'bg-accent-rose/90 text-bg-canvas font-semibold hover:bg-accent-rose',
};

const sizeStyles: Record<Size, string> = {
  xs: 'h-7 px-2.5 text-[11px] rounded-md gap-1.5',
  sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
  md: 'h-10 px-4 text-sm rounded-lg gap-2',
  lg: 'h-12 px-6 text-base rounded-xl gap-2.5',
  icon: 'h-9 w-9 rounded-md',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', leftIcon, rightIcon, loading, disabled, children, className = '', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center shrink-0
        transition-all duration-200 ease-out
        select-none
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
        active:scale-[0.98]
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-r-transparent" />
      ) : (
        leftIcon
      )}
      {children && <span className="truncate leading-none">{children}</span>}
      {!loading && rightIcon}
    </button>
  );
});
