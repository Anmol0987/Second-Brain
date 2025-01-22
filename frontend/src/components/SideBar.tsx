import { SideBarContent } from "./SideBarContent"
import { Brain, LogOut, Twitter, Youtube } from "lucide-react"



export const SideBar = () => {
    return (
        <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 px-4 ">
            <div className="flex text-3xl pt-8 items-center pb-3 border-b-2 border-gray-300">
                <div className="pr-2 text-purple-600">
                    <Brain className="h-10 w-10" />
                </div>
                Second-Brain
            </div>
            <div className="flex justify-between flex-col h-[85vh]  "> 
                <div className="pt-8 pl-4">
                    <SideBarContent text="Twitter" icon={<Twitter className="h-8 w-8 text-blue-500" />} />
                    <SideBarContent text="Youtube" icon={<Youtube className="h-8 w-8 text-red-500" />} />
                </div>
                <div onClick={() =>{
                    localStorage.removeItem("token");
                    window.location.href = "/signin";
                }} className="pt-8 pl-3 ">
                <SideBarContent text="Logout" icon={<LogOut className="h-8 w-8 rotate-180 text-gray-500" />} />
                </div>
            </div>
        </div>
    )
}