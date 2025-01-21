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
                    const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                    navigator.clipboard.writeText(shareUrl)
                    alert("Copied to clipboard");
                }} variant="secondary" title="Share brain" startIcon={<ShareIcon />}></Button>
            </div>

            <div className="flex gap-4 flex-wrap mt-2">
                {userContents?.map(({ type, link, title }) => <Card
                    type={type}
                    link={link}
                    title={title}
                />)}
            </div>
        </div>
    </div>
}