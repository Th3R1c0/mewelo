import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(`
          w-full
          rounded-full
          bg-purple-500
          border
          border-transparent
          px-3
          py-3
          disabled:cursor-not-allowed
          disabled:opacity-50
          text-black
          font-bold
          transition
          hover:opacity-75`, className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
