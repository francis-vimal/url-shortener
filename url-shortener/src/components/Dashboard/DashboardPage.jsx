import "./DashboardPage.css";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import LinkCard from "./LinkCard";
import Icon from "../common/Icon.jsx"
export default function DashboardPage() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [urlError, setUrlError] = useState("");
    const [aliasError, setAliasError] = useState("");
    const [isAlias, setIsAlias] = useState(false);
    const urlRef = useRef();
    const aliasRef = useRef();
    const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;

    function loadLinks() {
        fetch(`${backendBaseUrl}/api/links`)
            .then(res => res.json())
            .then(data => setLinks(data));
    }

    useEffect(() => {
        loadLinks();
    }, [refresh]);

    async function onShorten(e) {
        try {
            e.preventDefault();
            const longUrl = urlRef.current?.value?.trim() || "";
            const alias = aliasRef.current?.value?.trim() || "";

            if (!isValidUrl(longUrl)) {
                setUrlError("Please enter a valid URL");
                return;
            }
            if (alias) {
                const aliasRegex = /^[a-zA-Z0-9]{6,8}$/;
                if (!aliasRegex.test(alias)) {
                    setAliasError("Alias must be 6-8 characters");
                    return;
                }
            }
            setAliasError("");
            setUrlError("");
            setLoading(true);
            const res = await fetch(`${backendBaseUrl}/api/links`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    longUrl: longUrl,
                    customCode: alias || null
                })
            });
            // const data = await res.json();
            if (res.ok) {
                toast.success("Link shortened successfully!");
                setRefresh(prev => !prev);
            } else {
                toast.error(data.error || "Something went wrong!");
            }
            setLoading(false);
            setRefresh(prev => !prev);
        } catch (err) {
            console.error(err);
            setLoading(false);
            // setRefresh(prev => !prev);
        }
    }

    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }

    return (
        <div className="dashboardMain">
            <div className="dashboardTop">

                <h2>Shorten a URL?</h2>
                <form className="urlInputContainer" onSubmit={(e) => onShorten(e)}>
                    <div className="urlInputWrapper">
                        <input ref={urlRef} name="url" placeholder="Paste your URL"
                            className={urlError ? "urlInput inputError" : "urlInput"} />
                        {urlError && <p className="errorText">{urlError}</p>}
                        {loading ?
                            <button type="submit" className="loadingButton" disabled={loading}>
                                <Icon className="loader" iconName="progress_activity" />
                            </button> :
                            <button type="submit" className="submitButton">
                                <Icon iconName="arrow_forward" />
                            </button>
                        }
                    </div>
                    {isAlias ? <div className="aliasInputWrapper">
                        <input ref={aliasRef} name="alias" placeholder="Enter Alias"
                            className={aliasError ? "aliasInput inputError" : "aliasInput"} />
                        {aliasError && <p className="errorText">{aliasError}</p>}
                    </div> :
                        <p className="alias" onClick={() => setIsAlias(prev => !prev)}>+Add Alias</p>
                    }
                </form>
            </div>
            <div className="cardContainer">
                {links.length ?
                    links.map((link) => (
                        <LinkCard key={link.id} links={link} refresh={loadLinks} />
                    )) :
                    <p className="emptyLinkText">Shorten your first URL to see it here.</p>}
            </div>
        </div>
    )
}