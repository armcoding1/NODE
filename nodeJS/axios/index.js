const axios = require("axios");

axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
    response.data.forEach((post) => {
        console.log(`id: ${post.id}\ntitle: ${post.title}`);
    })
})