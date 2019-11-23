import qs from 'qs'

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3'
const YELP_API_KEY = 'pwASmEZ_35utta6OThMlczeYSpsRbznNsD-KL_MZ_brTtSgantqMtoWAVQu5_15YXqJEAvzizQLIrOlRtg0Sl386n8B4hyke1HRLCPV53cklJZVIGYaaX9_DxY9wXHYx'

export const autoComplete = async(text) => {
    const params = qs.stringify({text})

    const headers = new Headers({
        'Authorization': `Bearer ${YELP_API_KEY}`,
    })
    const response = await fetch(`${BASE_URL}/autocomplete?${params}`, {headers})
    if(!response.ok) return []

    const results = await response.json()
    return results.terms || []
}