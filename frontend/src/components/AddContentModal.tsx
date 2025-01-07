import { CloseIcon } from "../Icons/CloseIcon"
import { Button } from "./Button"
import { InputComponent } from "./InputComponent"

interface AddContentModalProps {
    open: boolean;
    onclose: () => void;
}
export const AddContentModal = ({ open , onclose }:AddContentModalProps) => {
    return (
        <>
            {open && <div>
                <div className="w-full h-full top-0 left-0 fixed bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-md">
                        <div onClick={onclose} className="flex justify-end cursor-pointer">
                            <CloseIcon />
                        </div>
                        <div>
                            <InputComponent placeholder="Title" />
                            <InputComponent placeholder="Link" />
                            <div className="flex justify-center">
                                <Button onClick={onclose} variant="primary" title="Submit" />
                            </div>
                        </div>

                    </div>
                </div>

            </div>}
        </>)
}