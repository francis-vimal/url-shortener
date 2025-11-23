import "./LinkCard.css";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import Icon from "../common/Icon";

export default function LinkCard({ links, refresh, isStat }) {
    const history = useHistory();
    const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;

    function onShortClick() {
        setTimeout(() => {
            refresh();
        }, 500)
    }

    function formatLastClicked(dateString) {
        if (!dateString) return "Never";

        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    }

    async function handleDelete() {
        const confirmed = window.confirm("Are you sure you want to delete this link?");
        if (!confirmed) return;

        try {
            const res = await fetch(`${backendBaseUrl}/api/links/${links.shortcode}`, {
                method: "DELETE"
            });
            if (res.ok) {
                toast.success("Link deleted successfully!");
                !isStat && refresh();
                history.push("/");
            } else {
                const errorData = await res.json();
                toast.error(errorData.error || "Something went wrong!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }
    }

    async function handleCopy() {
        const fullLink = `${backendBaseUrl}/${links.shortcode}`;

        try {
            await navigator.clipboard.writeText(fullLink);
            toast.success("Copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy: ", err);
            toast.error("Could not copy link");
        }
    }

    function handleView() {
        history.push(`/code/${links.shortcode}`);
    }

    return (
        <div className={!isStat ? "linkCard" : "statCard"}>
            <div className="actionsContainer">
                {!isStat && <Icon className="icon viewIcon" title="View Stat" iconName="visibility" event={handleView} />}
                <Icon className="icon deleteIcon" title="Delete Link" iconName="delete" event={handleDelete} />
            </div>
            <div className="linkContainer">
                <div className="shortLinkContainer">
                    <p><a className="shortLink" onClick={onShortClick} href={`${backendBaseUrl}/${links.shortcode}`} target="_blank">
                        {backendBaseUrl}/{links.shortcode}
                    </a></p>
                    <Icon className="icon copyIcon" title="Copy" iconName="content_copy" event={handleCopy} />
                </div>
                <p><a className="longLink" href={`${links.long_url}`} target="_blank">{links.long_url}</a></p>
            </div>
            <div className="cardBottomContainer">
                <p className="lastClicked">Last Clicked: <span>{formatLastClicked(links.last_clicked)}</span></p>
                <div className="cardBottom">
                    <div>
                        <span>Total Clicks: </span>
                        <span className="clicks">{links.click_count}</span>
                    </div>
                    <span className="createdText" title="Created Date">
                        {new Date(links.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        })}
                    </span>
                </div>
            </div>
        </div>
    )
}