import { Button } from "../components/Button"
import { InputComponent } from "../components/InputComponent"
import { useRef } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { Brain } from "lucide-react"
export const SignUp = () => {

    const usernameref = useRef<HTMLInputElement>(null)
    const passwordref = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    function signup() {
        const username = usernameref.current?.value
        const password = passwordref.current?.value
        axios.post(`${BACKEND_URL}/signup`, { username, password })
            .then(() => {
                navigate("/signin")
                alert("signup success")
            })
            .catch((e) => {
                console.log(e)
                alert("signup failed")
            })


    }

    return <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center">
                <div className="flex justify-center">
                    <Brain className="h-12 w-12 text-purple-600" />
                </div>
                <h2 className="mt-4 text-3xl font-bold text-gray-900">Second Brain</h2>
                <p className="mt-2 text-sm text-gray-600">
                Create your account
                </p>
            </div>

            <InputComponent classname="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" reference={usernameref} placeholder="Username" />
            <InputComponent classname="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" reference={passwordref} placeholder="**************" />
            <div className="flex justify-center pt-4 flex-col">
                <Button loading={false} onClick={signup} variant="primary" title="Signup" fullWidth={true} />
                <Button classname="text-sm text-purple-600 hover:text-purple-500" loading={false} onClick={() => { navigate("/signin") }} title="Already have an account? Sign in" fullWidth={true} />
            </div>
            <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                    Trusted by thousands of knowledge workers worldwide
                </p>
            </div>
        </div>
    </div>
}