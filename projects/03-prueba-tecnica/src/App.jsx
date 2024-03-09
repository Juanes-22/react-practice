import { useEffect, useState } from "react";
import "./App.css";

const CAT_ENDPOINT_RANDOM_FACT_URL = "https://catfact.ninja/fact";
const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

export function App() {
    const [fact, setFact] = useState();
    const [factError, setFactError] = useState();
    const [imageUrl, setImageUrl] = useState();

    // para recuperar el hecho al cargar la página
    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT_URL)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error fetching fact");
                }
                return res.json();
            })
            .then((data) => {
                const { fact } = data;
                setFact(fact);
            })
            .catch((err) => {
                setFactError(err);
            });

        // async function getRandomFact () {
        //     const res = await fetch(CAT_ENDPOINT_RANDOM_FACT_URL)
        //     const json = await res.json()
        //     setFact(json.fact)
        // }
    }, []);

    // para recueprar la imagen cada vez que tenemos un hecho nuevo
    useEffect(() => {
        if (!fact) return;

        const firstThreeWords = fact.split(" ").slice(0, 3).join(" ");

        fetch(`https://cataas.com/cat/says/${firstThreeWords}?fontSize=50&fontColor=red&json=true`)
            .then((res) => res.json())
            .then((data) => {
                //const { url } = data;
                //setImageUrl(data);

                const url = `/cat/says/${firstThreeWords}?fontSize=50&fontColor=red`;

                setImageUrl(url);
            });
    }, [fact]);

    return (
        <main>
            <h1>App de gatitos</h1>
            <section>
                {fact && <p>{fact}</p>}
                {imageUrl && (
                    <img
                        src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
                        alt={`Image extracted using the first three words for ${fact}`}
                    />
                )}
            </section>
        </main>
    );
}
