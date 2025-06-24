import { useRef } from "react"
import { Button } from "../components/Button"
import { InputComponent } from "../components/InputComponent"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Brain } from "lucide-react"
export const Signin = () => {

    const usernameref = useRef<HTMLInputElement>()
    const passwordref = useRef<HTMLInputElement>()
    const navigate = useNavigate()

    function useTestCredentials() {
        usernameref.current!.value = "admin"
        passwordref.current!.value = "admin1"
    }
     function signin() {
        const username = usernameref.current?.value
        const password = passwordref.current?.value
        console.log(username, password)
        axios.post(`${BACKEND_URL}/signin`, { username, password })
            .then((res) => {

                localStorage.setItem("token", res.data.token)
                navigate("/dashboard")
            })
            .catch(() => {
                alert("signin failed")
            })
    }

    return<div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
            <div className="flex justify-center">
                <Brain className="h-12 w-12 text-purple-600" />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">Second Brain</h2>
            <p className="mt-2 text-sm text-gray-600">
                Welcome back! Sign in to your account
            </p>
        </div>
        <InputComponent classname="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" reference={usernameref} placeholder="Username" />
        <InputComponent classname="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" reference={passwordref} placeholder="**************" />
        <div className="flex justify-center pt-4 flex-col">
    <div className="flex justify-center text-xs text-purple-600 cursor-pointer mb-2" onClick={useTestCredentials}>
                    USE TEST CREDENTIALS
                </div>
            <Button loading={false} onClick={signin} variant="primary" title="Signin" fullWidth={true} />
            <Button classname="text-sm text-purple-600 hover:text-purple-500" loading={false} onClick={() => { navigate("/signup") }} title="Don't have an account? Sign up" fullWidth={true} />
        </div>
        <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
                Trusted by thousands of knowledge workers worldwide
            </p>
        </div>
    </div>
</div>
}