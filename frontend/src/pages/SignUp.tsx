import { Button } from "../components/Button"
import { InputComponent } from "../components/InputComponent"
import { useRef } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
export const SignUp = () => {

    const usernameref = useRef<HTMLInputElement>(null)
    const passwordref = useRef<HTMLInputElement>(null)

    function signup (){
        const username = usernameref.current?.value
        const password = passwordref.current?.value
         axios.post(`${BACKEND_URL}/signup`, {username, password})
         
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <InputComponent reference={usernameref}  placeholder="Username" />
            <InputComponent reference={passwordref}  placeholder="Password" />
            <div className="flex justify-center pt-4">
                <Button  loading={false} variant="primary" title="Signup" fullWidth={true} />
            </div>
        </div>
    </div>
}