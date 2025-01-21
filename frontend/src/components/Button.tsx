import { ReactElement } from "react";

export interface ButtonProps {
    title: string;
    onClick?: () => void;
    variant?: "primary" | "secondary ";
    loading?: boolean;
    startIcon?: ReactElement;
    fullWidth?: boolean;
    classname?: string
    
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600",
}
const defaultStyles = "px-4 py-2 text-md rounded-md flex gap-2 items-center justify-center" ;


export const Button = ({title,onClick,variant,loading,fullWidth,startIcon,classname}: ButtonProps) => {
    return <button onClick={onClick} className={variantStyles[variant] + " " + defaultStyles + " "+ classname+  `${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading ? "opacity-45	" : ""}`} disabled={loading}>
    <div className="pr-2">
        {startIcon}
    </div>
    {title}
</button>

}