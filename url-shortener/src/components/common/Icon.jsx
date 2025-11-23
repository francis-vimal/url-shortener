import "./Icon.css"

export default function Icon({ className, title, iconName, event }) {
    return <span className={`material-symbols-outlined ${className}`} title={title} onClick={() => event()}>{iconName}</span>
}