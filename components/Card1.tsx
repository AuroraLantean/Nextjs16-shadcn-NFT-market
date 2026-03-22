import type React from "react";
import { cn } from "@/lib/utils";

/*variant: primary, secondary
padding: small, medium, large
hover: boolean
*/
//extends React.HTMLAttributes<HTMLDivElement>
type Props = {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "dark";
  size?: "small" | "medium" | "large";
  padding?: "none" | "small" | "normal" | "large";
  className?: string;
  isHover?: boolean;
};
const Card = ({
  children,
  variant = "default",
  size = "medium",
  padding = "small",
  className = "",
  isHover = true,
  //disabled = false,
  //onClick,
  ...props
}: Props) => {
  const baseStyles = "rounded-lg shadow-md transition-all duration-300";

  const variants = {
    default: "bg-green-400 border border-gray-200",
    primary: "bg-yellow-100 border border-blue-200",
    success: "bg-green-50 border border-green-200",
    dark: "bg-blue-800 border border-gray-700",
  };

  const hoverStyles = isHover ? "hover:shadow-xl hover:-translate-y-1" : "";
  const sizes = {
    small: "py-1.5 text-sm",
    medium: "py-2 text-base",
    large: "py-3 text-lg",
  };
  const paddingStyles = {
    none: "p-0",
    small: "p-4",
    normal: "p-6",
    large: "p-8",
  };

  return (
    <div
      className={cn(
        `${baseStyles} ${variants[variant]} ${sizes[size]} ${hoverStyles} ${paddingStyles[padding]} ${className}`,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
