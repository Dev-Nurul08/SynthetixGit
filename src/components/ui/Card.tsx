import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { interactive = false, hoverable = false, padding = 'md', className = '', children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={`
        relative rounded-2xl
        bg-bg-secondary/80 backdrop-blur-xl
        border border-border-primary
        ${paddingStyles[padding]}
        ${interactive ? 'cursor-pointer' : ''}
        ${hoverable ? 'transition-all duration-300 ease-out hover:bg-bg-tertiary/80 hover:border-border-secondary hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.6)]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className = '', children, ...props },
  ref
) {
  return (
    <div ref={ref} className={`flex flex-col gap-1 ${className}`} {...props}>
      {children}
    </div>
  );
});

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { className = '', children, ...props },
  ref
) {
  return (
    <h3 ref={ref} className={`text-base font-bold text-text-primary tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  );
});

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(function CardDescription(
  { className = '', children, ...props },
  ref
) {
  return (
    <p ref={ref} className={`text-sm text-text-tertiary leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
});

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(function CardContent(
  { className = '', children, ...props },
  ref
) {
  return (
    <div ref={ref} className={`mt-4 ${className}`} {...props}>
      {children}
    </div>
  );
});

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className = '', children, ...props },
  ref
) {
  return (
    <div ref={ref} className={`mt-5 pt-4 border-t border-border-subtle flex items-center justify-between ${className}`} {...props}>
      {children}
    </div>
  );
});
