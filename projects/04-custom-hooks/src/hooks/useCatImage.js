import { useState, useEffect } from 'react'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState('')

  // para recuperar la imagen cada vez que tenemos un hecho nuevo
  useEffect(() => {
    if (!fact) return

    const firstThreeWords = fact.split(' ').slice(0, 3).join(' ')

    fetch(`https://cataas.com/cat/says/${firstThreeWords}?fontSize=50&fontColor=red&json=true`)
      .then((res) => res.json())
      .then((data) => {
        const url = `/cat/says/${firstThreeWords}?fontSize=50&fontColor=red`

        setImageUrl(url)
      })
  }, [fact])

  return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }
} // { imageUrl: "https://..." }
