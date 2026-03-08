// src/components/FeatureCard.tsx
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, href }) => {
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <Wrapper
      {...wrapperProps}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition transform hover:scale-105 flex flex-col h-full"
    >
      {icon && <div className="mb-4 text-4xl text-primary flex justify-center">{icon}</div>}
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 flex-1">{description}</p>
      {href && (
        <button className="btn btn-primary mt-4 align-self-end">
          Learn More
        </button>
      )}
    </Wrapper>
  );
};

// Note: Bootstrap's .btn and .btn-primary classes are used for the button,
// while Tailwind utilities handle layout, colors, and hover effects.
