export const get = async (url) => {
    let data = await fetch(url)
    let response = await data.json()
    return response;
}