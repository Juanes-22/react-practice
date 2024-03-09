import { useState } from "react";
import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard.jsx";




const users = [
    {
      id: 1,
      userName: 'midudev',
      name: 'Miguel Ángel Durán',
      isFollowing: true
    },
    {
      id: 2,
      userName: 'pheralb',
      name: 'Pablo H.',
      isFollowing: false
    },
    {
      id: 3,
      userName: 'PacoHdezs',
      name: 'Paco Hdez',
      isFollowing: true
    },
    {
      id: 4,
      userName: 'TMChein',
      name: 'Tomas',
      isFollowing: false
    }
  ]

export function App() {
    const [name, setName] = useState("midudev");

    const formatUserName = (userName) => `@${userName}`;

    return (
        <section className="App">

            {
                users.map(user => {
                    const {id, userName, name, isFollowing} = user;
                    return (
                        <TwitterFollowCard
                            key={id}
                            formatUserName={formatUserName}
                            userName={userName}
                            initialIsFollowing={isFollowing}
                        >
                            {name}
                        </TwitterFollowCard>
                    )
                })
            }

            {/* <TwitterFollowCard formatUserName={formatUserName} initialIsFollowing userName={name}>
                Leo Messi
            </TwitterFollowCard>

            <TwitterFollowCard formatUserName={formatUserName} userName="leomessi">
                Leo Messi
            </TwitterFollowCard>
            
            <TwitterFollowCard formatUserName={formatUserName} >
                Leo Messi
            </TwitterFollowCard>

            <button onClick={() => setName("cristiano")}>
                Cambiar nombre
            </button> */}
        </section>
    );
}
