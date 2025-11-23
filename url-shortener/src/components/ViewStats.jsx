import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ViewStats() {
    const [link, setLink] = useState([])
    const { code } = useParams();
    const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const loadLink = () => {
            fetch(`${backendBaseUrl}/api/links/${code}`)
                .then(res => res.json())
                .then(data => setLink(data));
        }
        loadLink();
    }, []);
    return <></>
}