import axios from "axios";


export const getImages = async (searchTerm = 'cyberpunk') => await axios.get(`https://api.pexels.com/v1/search?query=${searchTerm}`, {
  headers: {
    Authorization: 'chZRdjpxvJUP205cuUM8xVPRvaxaAkApHAfSq0af4qYv4YTNVqgMjrpP'
  }
})

