interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
