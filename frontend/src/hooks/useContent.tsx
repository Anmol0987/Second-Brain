import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
    const [userContents, setUserContents] = useState([]);

    function refresh() {
        axios.get(`${BACKEND_URL}/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then((response) => {
                setUserContents(response.data)
            })
    }

    useEffect(() => {
        refresh()
        let interval = setInterval(() => {
            refresh()
        }, 10 * 1000)

        return () => {
            clearInterval(interval);
        }
    }, [])

    return { userContents, refresh };
}