import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { SharedBrainCard } from "../components/SharedBrainCard";

export const SharedBrain = () => {
    let { hash } = useParams();
    const [content, setContent] = useState<any[]>([]);
    const [User, setUser] = useState<string>("");

    const getContent = async (hash: string) => {
        const response = await axios.get(`${BACKEND_URL}/brain/${hash}`)
        setContent(response.data.content || [])
        setUser(response.data.user)

    }


    useEffect(() => {
        if (hash) {
            getContent(hash);
        }

    }, [hash]);

    return (
        <div className="flex flex-col gap-4 pt-10 px-5">
            <div className="flex justify-center ">
                <h1 className="text-3xl font-bold border-b-2 border-gray-300 text-purple-700">Shared Brain Of {User}</h1>
            </div>
            <div className="flex gap-4 flex-wrap mt-5">
                {content?.map(({ type, link, title }: any) => <SharedBrainCard
                    type={type}
                    link={link}
                    title={title}
                />)}
            </div>
        </div>
    );
};