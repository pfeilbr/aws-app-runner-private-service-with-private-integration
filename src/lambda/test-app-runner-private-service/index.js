const axios = require('axios');

exports.handler = async (event) => {
    let responseMessage = 'Hello, World!';
    const url = `${process.env.APP_RUNNER_PRIVATE_SERVICE_TEST_URL}`;
    console.log({url})

    try {
        const response = await axios.get(url);
        console.log({response})
        responseMessage = JSON.stringify({url, "response.data": response.data});
    } catch (error) {
        console.error(`HTTP request failed: ${error}`);
        responseMessage = `Failed to fetch data, url: ${url}`;
    }

    const response = {
        statusCode: 200,
        body: responseMessage,
    };

    return response;
};
