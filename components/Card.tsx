import type React from "react";

///variant: primary, secondary
///hover: boolean
///padding: small, medium, large
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant: "default" | "primary" | "success" | "dark";
  padding: "none" | "small" | "normal" | "large";
  className?: string;
  isHover?: boolean;
}
const Card = ({
  children,
  variant = "default", //: keyof typeof variants
  padding = "normal",
  className = "",
  isHover = true,
}: Props) => {
  const baseStyles = "rounded-lg shadow-md transition-all duration-300";

  const variants = {
    default: "bg-green-400 border border-gray-200",
    primary: "bg-yellow-100 border border-blue-200",
    success: "bg-green-50 border border-green-200",
    dark: "bg-blue-800 border border-gray-700 text-white",
  };

  const hoverStyles = isHover ? "hover:shadow-xl hover:-translate-y-1" : "";

  const paddingStyles = {
    none: "p-0",
    small: "p-4",
    normal: "p-6",
    large: "p-8",
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
