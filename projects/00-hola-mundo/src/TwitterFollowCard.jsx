import { useState } from "react"

export function TwitterFollowCard ( { children, formatUserName, userName = "unknown", initialIsFollowing = false} ) {    
    const [isFollowing, SetIsFollowing] = useState(initialIsFollowing);


    const handleClick = () => {
        SetIsFollowing(!isFollowing);
    }

    const text = isFollowing ? "Siguiendo" : "Seguir";
    const buttonClassName = isFollowing
        ? "twitter-followCard-button is-following"
        : "twitter-followCard-button";

    return (
        <article className="twitter-followCard">
            <header className="twitter-followCard-header">
                <img 
                    className="twitter-followCard-avatar"
                    alt="El ávatar de una persona"
                    src={ `https://unavatar.io/${userName}` }
                />
                <div className="twitter-followCard-info">
                    <strong>{ children }</strong>
                    <span>{ formatUserName(userName) }</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>{text}</button>
            </aside>
        </article>        
    )
}