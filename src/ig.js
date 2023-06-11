const axios = require('axios');

const getInstagramMediaInfo = async () => {
    const options = {
        method: 'GET',
        url: 'https://instagram28.p.rapidapi.com/following',
        params: {
          user_id: '59539818716',
          batch_size: '20'
        },
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': '59d19169b1msh9e196aa8558da57p1a522bjsn23e8c00ad993',
          'X-RapidAPI-Host': 'instagram28.p.rapidapi.com'
        }
      };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getInstagramMediaInfo();
