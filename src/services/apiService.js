import axios from 'axios';

export default {
  query: (query) => {
    return new Promise((resolve, reject) => {
      axios({
        url: 'http://localhost:4300/graphql',
        method: 'POST',
        data: {
          query: query,
        }
      }).then(({ data }) => data).then(({ data }) => {
        resolve(data);
      }).catch(reject);
    })
  }
}