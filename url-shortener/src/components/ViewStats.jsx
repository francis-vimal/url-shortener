import "./ViewStats.css"
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Icon from "./common/Icon";
import LinkCard from "./Dashboard/LinkCard";
import toast from "react-hot-toast";

export default function ViewStats() {
    const [link, setLink] = useState([])
    const { code } = useParams();
    const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;
    const history = useHistory();

    useEffect(() => {
        const loadLink = () => {
            fetch(`${backendBaseUrl}/api/links/${code}`)
                .then(res => res.json())
                .then(data => setLink(data)).catch(err => {
                    history.push("/");
                    toast.error("Requested Url not found");
                });
        }
        loadLink();
    }, []);

    function handleBack() {
        history.push("/");
    }

    return (
        <div className="statsContainer">
            <p className="backContainer" onClick={handleBack}><Icon className="backIcon" iconName="chevron_left" />Back to List</p>
            <LinkCard links={link} isStat={true} />
        </div>
    )
}