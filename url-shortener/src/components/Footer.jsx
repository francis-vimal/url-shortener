import "./Footer.css";

export default function footer() {
    return (
        <div id="footer">
            <p>@ 2025 URL-Shortener by Vimal - All rights reserved</p>
            <hr />
            <a className="githubImg" href="https://github.com/francis-vimal" target="_blank">
                <img src="images/github.png" width="25px" height="25px" />
            </a>
        </div>
    )
}