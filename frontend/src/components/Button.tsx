import { ReactElement } from "react";

export interface ButtonProps {
    title: string;
    // onClick: () => void;
    variant: "primary" | "secondary";
    // size: "sm" | "md" | "lg";
    startIcon?: ReactElement;
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600",
}
const defaultStyles = "px-4 py-2 text-md rounded-md flex gap-2 items-center justify-center" ;
// const sizeStyles = {
//     "lg": "px-8 py-4 text-xl rounded-xl",
//     "md": "px-4 py-2 text-md rounded-md",
//     "sm": "px-2 py-1 text-sm rounded-sm",
// }

export const Button = (props: ButtonProps) => {
    // const Comp = props.startIcon;
    return <button className={`${variantStyles[props.variant]} ${defaultStyles}`}>
        {props.startIcon}
        {props.title}
    </button>
}