import axios from "axios";

export async function getPosts() {
    const response = await axios.get(generateURL('/api/blog'));
    if(response.status === 200) {
        return response.data;
    }
    return null;
}

export async function getPost(id) {
    const response = await axios.get(generateURL(`/api/blog/${ id }`));
    if(response.status === 200) {
        return response.data;
    }
    return null;
}

function generateURL(url) {
    if(process.env.REACT_APP_API != null) {
        return `${ process.env.REACT_APP_API }${ url }`;
    }
    return url;
}