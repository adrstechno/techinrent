import { cn } from '@/lib/utils';

const ResponsiveWrapper = ({
  children,
  className = "",
  containerSize = 'xl',
  padding = 'md'
}) => {
  const containerSizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  const paddingSizes = {
    none: "",
    sm: "px-2 py-1",
    md: "px-4 py-2",
    lg: "px-6 py-3",
    xl: "px-8 py-4"
  };

  return (
    <div className={cn(
      'mx-auto w-full',
      containerSizes[containerSize],
      paddingSizes[padding],
      className
    )}>
      {children}
    </div>
  );
};

export default ResponsiveWrapper;
