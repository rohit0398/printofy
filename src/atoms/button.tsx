import type { ReactNode } from "react";

type IButtonVarient = "" | "transparent" | "out-lined";

type IProps = {
  title: string | ReactNode;
  disabled?: boolean;
  size?: string;
  paddingMargin?: string;
  variant?: IButtonVarient;
  fontSize?: string;
  className?: string;
  onClick?: () => void;
  rounded?: string;
  type?: any;
  children?: ReactNode;
};
export function Button({
  title,
  disabled = false,
  size = "h-10",
  paddingMargin = "px-5 lg:px-8",
  variant = "",
  fontSize = "text-sm lg:text-base lg:font-bold",
  className = "",
  onClick,
  rounded = "rounded lg:rounded-lg",
  type = "button",
  children,
}: IProps) {
  function buttonVarient(uiVarient: IButtonVarient) {
    switch (uiVarient) {
      case "transparent":
        return `bg-transparent text-app-purple text-center ${rounded} ${className} ${size} ${paddingMargin} ${fontSize} ${
          disabled ? "opacity-40 cursor-not-allowed" : ""
        }`;
      case "out-lined":
        return `bg-transparent text-white text-center ${rounded} border border-app-purple hover:ring ring-white hover:ring-1  transition duration-500 ${className} ${size} ${paddingMargin} ${fontSize} ${
          disabled ? "opacity-40 cursor-not-allowed" : ""
        }`;
      default:
        return ` bg-app-purple/50 text-white text-center hover:bg-black hover:ring ring-white hover:ring-1 transition duration-500 ${rounded} ${className} ${size} ${paddingMargin} ${fontSize} ${
          disabled ? "opacity-40 cursor-not-allowed" : ""
        }`;
    }
  }
  return (
    <button
      onClick={onClick}
      className={buttonVarient(variant)}
      disabled={disabled}
      type={type}
    >
      {children ? children : <></>}
      {title}
    </button>
  );
}
