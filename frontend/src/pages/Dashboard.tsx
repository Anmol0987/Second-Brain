import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { AddContentModal } from "../components/AddContentModal"
import { PlusIcon } from "../Icons/PlusIcon"
import { ShareIcon } from "../Icons/ShareIcon"
import { SideBar } from "../components/SideBar"
import { useContent } from "../hooks/useContent"
import { BACKEND_URL } from "../config"
import axios from "axios"

export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const { userContents, refresh } = useContent();

    useEffect(() => {
        refresh();
    }, [modalOpen])



    return <div>
        <SideBar />
        <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
            <AddContentModal open={modalOpen} onclose={() => {
                setModalOpen(false);
                console.log(modalOpen)
            }} />
            <div className="flex justify-end gap-4">
                <Button onClick={() => {
                    setModalOpen(true)
                }} variant="primary" title="Add content" startIcon={<PlusIcon />}></Button>
                <Button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/brain/share`, {
                        share: true
                    }, {
                        headers: {
                            "Authorization": localStorage.getItem("token")
                        }
                    });
                    navigator.clipboard.writeText(response.data.link);
                    alert("Copied to clipboard");
                }} variant="secondary" title="Share brain" startIcon={<ShareIcon />}></Button>
            </div>

            <div className="flex gap-4 flex-wrap mt-2">
                {userContents?.map(({ type, link, title }) => <Card
                    type={type}
                    link={link}
                    title={title}
                    onDelete={() => refresh()}
                />)}
            </div>
            {/* <div className="google-doc-container">
                <iframe
                    src="https://docs.google.com/document/d/e/2PACX-1vT7Fy1RVEgXMi9gQbJU-dD5og1m0Y7dZ--W_4iKM4YogJyHIEE4qfaMXW61TCyzpL2OKfl_L_UJ_GSm/pub?embedded=true" // Replace with your Google Doc link
                    title="Google Document"
                    style={{
                        width: "50vw",
                        height: "80vh",
                        border: "none",
                    }}
                ></iframe>
            </div> */}
        </div>
    </div>
}