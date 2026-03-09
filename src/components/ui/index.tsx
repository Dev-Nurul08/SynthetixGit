"use client";

import { motion } from "framer-motion";
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "accent";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

type CleanButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onDragEnter" | "onDragLeave" | "onDragOver" | "onDrop"
>;

interface ButtonProps extends CleanButtonProps {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-slate-950 hover:bg-brand-400 active:bg-brand-600 shadow-[0_4px_16px_-6px_rgba(0,0,0,0.35)]",
  secondary:
    "bg-bg-tertiary text-text-primary border border-border-primary hover:bg-bg-elevated hover:border-border-secondary shadow-[0_4px_16px_-6px_rgba(0,0,0,0.35)]",
  ghost:
    "text-text-secondary hover:bg-white/[0.04] hover:text-text-primary",
  outline:
    "border border-border-secondary text-text-primary hover:bg-white/[0.04] hover:border-border-tertiary",
  accent:
    "bg-bg-elevated text-brand-300 border border-brand-500/30 hover:bg-brand-500/10",
};

const sizeStyles: Record<Size, string> = {
  xs: "h-7 px-2.5 gap-1.5 text-[11px] rounded-md",
  sm: "h-9 px-3.5 gap-2 text-xs rounded-lg",
  md: "h-11 px-5 gap-2 text-sm rounded-lg",
  lg: "h-12 px-6 gap-2.5 text-[15px] rounded-xl",
  xl: "h-14 px-8 gap-3 text-base rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      leftIcon,
      rightIcon,
      loading,
      fullWidth,
      className = "",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const MotionBtn = motion.button as unknown as React.ForwardRefExoticComponent<
      React.ButtonHTMLAttributes<HTMLButtonElement> & {
        whileHover?: any;
        whileTap?: any;
        transition?: any;
        ref?: any;
      }
    >;
    return (
      <MotionBtn
        ref={ref}
        whileHover={!isDisabled ? { y: -1, scale: 1.01 } : undefined}
        whileTap={!isDisabled ? { y: 0, scale: 0.99 } : undefined}
        transition={{ duration: 0.15 }}
        disabled={isDisabled}
        className={[
          "inline-flex items-center justify-center font-semibold",
          "transition-all duration-200 ease-out",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100",
          "select-none",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? "w-full" : "",
          className,
        ].join(" ")}
        {...props}
      >
        {loading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children && <span className="whitespace-nowrap">{children}</span>}
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </MotionBtn>
    );
  }
);
Button.displayName = "Button";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
  as?: "div" | "article" | "section";
}

export function Card({
  children,
  className = "",
  hover = false,
  glow = false,
  onClick,
  as: Tag = "div",
}: CardProps) {
  const Comp = (onClick || hover) ? motion(Tag) : Tag;
  const motionProps = onClick || hover ? {
    whileHover: hover || onClick ? { y: -4, scale: 1.01 } : undefined,
    whileTap: onClick ? { y: 0, scale: 0.99 } : undefined,
    transition: { duration: 0.25, ease: [0.2, 0.8, 0.2, 1] },
    onClick,
    className: [
      "relative bg-bg-secondary/60 backdrop-blur-xl border border-border-primary",
      "rounded-2xl p-5 shadow-[0_4px_40px_-12px_rgba(0,0,0,0.5)]",
      hover || onClick ? "cursor-pointer hover:border-border-secondary" : "",
      glow ? "before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-[rgba(34,211,238,0.04)] before:blur-2xl" : "",
      className,
    ].join(" "),
  } : {
    className: [
      "relative bg-bg-secondary/60 backdrop-blur-xl border border-border-primary",
      "rounded-2xl p-5 shadow-[0_4px_40px_-12px_rgba(0,0,0,0.5)]",
      glow ? "before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-[rgba(34,211,238,0.04)] before:blur-2xl" : "",
      className,
    ].join(" "),
  };
  return <Comp {...motionProps as any}>{children}</Comp>;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, rightIcon, label, error, className = "", disabled, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-xs font-semibold text-text-tertiary">
            {label}
          </label>
        )}
        <div
          className={[
            "group flex items-center gap-2.5 rounded-xl border border-border-primary bg-bg-tertiary/50 px-3.5 h-11",
            "transition-all duration-200",
            "focus-within:border-brand-400/60 focus-within:bg-bg-tertiary focus-within:shadow-[0_0_0_4px_rgba(34,211,238,0.08)]",
            disabled ? "opacity-50 cursor-not-allowed" : "",
            error ? "border-accent-rose/40 focus-within:border-accent-rose/60 focus-within:shadow-[0_0_0_4px_rgba(251,113,133,0.08)]" : "",
            className,
          ].join(" ")}
        >
          {leftIcon && <span className="shrink-0 text-text-muted">{leftIcon}</span>}
          <input
            ref={ref}
            disabled={disabled}
            className="h-full w-full min-w-0 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
            {...props}
          />
          {rightIcon && <span className="shrink-0 text-text-muted">{rightIcon}</span>}
        </div>
        {error && <p className="mt-1.5 text-xs text-accent-rose">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

type BadgeTone = "brand" | "emerald" | "amber" | "rose" | "violet" | "neutral";

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
}

const badgeTones: Record<BadgeTone, string> = {
  brand:
    "bg-brand-500/10 text-brand-200 border-brand-400/25",
  emerald:
    "bg-accent-emerald-soft text-accent-emerald border-accent-emerald-border",
  amber:
    "bg-accent-amber-soft text-accent-amber border-accent-amber-border",
  rose:
    "bg-accent-rose-soft text-accent-rose border-accent-rose-border",
  violet:
    "bg-accent-violet-soft text-accent-violet border-accent-violet-border",
  neutral:
    "bg-white/[0.04] text-text-tertiary border-border-secondary",
};

const badgeDots: Record<BadgeTone, string> = {
  brand: "bg-brand-400",
  emerald: "bg-accent-emerald",
  amber: "bg-accent-amber",
  rose: "bg-accent-rose",
  violet: "bg-accent-violet",
  neutral: "bg-text-muted",
};

export function Badge({ children, tone = "neutral", dot = false, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none",
        badgeTones[tone],
        className,
      ].join(" ")}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${badgeDots[tone]} animate-pulse`} />}
      {children}
    </span>
  );
}

interface IconTileProps {
  icon: ReactNode;
  tone?: BadgeTone;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const tileSizes: Record<string, string> = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14",
};

const tileTones: Record<BadgeTone, string> = {
  brand:
    "bg-brand-500/10 text-brand-200 border-brand-400/25",
  emerald:
    "bg-accent-emerald-soft text-accent-emerald border-accent-emerald-border",
  amber:
    "bg-accent-amber-soft text-accent-amber border-accent-amber-border",
  rose:
    "bg-accent-rose-soft text-accent-rose border-accent-rose-border",
  violet:
    "bg-accent-violet-soft text-accent-violet border-accent-violet-border",
  neutral:
    "bg-bg-tertiary text-text-secondary border-border-secondary",
};

export function IconTile({ icon, tone = "brand", size = "md", className = "" }: IconTileProps) {
  return (
    <span
      className={[
        "inline-grid shrink-0 place-items-center rounded-xl border",
        tileSizes[size],
        tileTones[tone],
        className,
      ].join(" ")}
    >
      {icon}
    </span>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  eyebrowTone?: BadgeTone;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  eyebrowTone = "brand",
  title,
  description,
  align = "left",
  children,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={[
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start",
        className,
      ].join(" ")}
    >
      <Badge tone={eyebrowTone} dot>{eyebrow}</Badge>
      <h2 className="text-3xl font-black tracking-tight text-text-primary sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-text-tertiary max-w-2xl">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

export function Tabs<T extends string>({
  value,
  onChange,
  tabs,
  className = "",
}: {
  value: T;
  onChange: (v: T) => void;
  tabs: { id: T; label: string; icon?: ReactNode }[];
  className?: string;
}) {
  return (
    <div
      className={[
        "inline-flex items-center gap-1 rounded-xl border border-border-primary bg-bg-tertiary/50 p-1",
        className,
      ].join(" ")}
    >
      {tabs.map((tab) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={[
              "inline-flex items-center gap-2 rounded-lg h-9 px-3.5 text-xs font-semibold transition-all duration-200",
              selected
                ? "bg-bg-secondary text-text-primary border border-border-secondary shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4)]"
                : "text-text-tertiary hover:text-text-secondary",
            ].join(" ")}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
