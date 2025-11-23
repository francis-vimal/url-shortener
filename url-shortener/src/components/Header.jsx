import "./Header.css"
import { useLocation } from "react-router-dom";
import Icon from "./common/Icon"

export default function Header({ searchText, setSearchText }) {
    const location = useLocation();
    const isViewStatsPage = location.pathname.startsWith("/code/");

    return <div id="header">
        {!isViewStatsPage && (
            <div className="seachInputWrapper">
                <input
                    className="searchInput"
                    name="search"
                    placeholder="Search your link"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Icon iconName="search" className="searchIcon" />
            </div>
        )}
        <a className={!isViewStatsPage ? "githubImage" : "githubImage viewStat"} href="https://github.com/francis-vimal" target="_blank"><img src="images/github.png" width="25px" height="25px" /></a>
    </div>
}