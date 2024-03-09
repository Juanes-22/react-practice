const CAT_ENDPOINT_RANDOM_FACT_URL = "https://catfact.ninja/fact";

export const getRandomFact = async () => {
    const res = await fetch(CAT_ENDPOINT_RANDOM_FACT_URL);

    if (!res.ok) {
        throw new Error("Error fetching fact");
    }

    const data = await res.json();

    const { fact } = data;
    return fact;
};
