interface InputComponentProps {
    reference?: any;
    placeholder: string;
}

export const InputComponent = ({ reference, placeholder }: InputComponentProps) => {
    return <div>
        <input ref={reference} placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded m-2" ></input>
    </div>
}

