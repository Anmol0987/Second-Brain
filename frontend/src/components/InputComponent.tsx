interface InputComponentProps {
    reference?: any;
    placeholder: string;
    classname?: string
}

export const InputComponent = ({ reference, placeholder,classname }: InputComponentProps) => {
    return <div>
        <input ref={reference}  placeholder={placeholder} type={"text"} className={`px-4 py-2 border rounded m-2` + "" + classname} ></input>
    </div>
}

