const axios = require('axios');

const testURL = async (url) => {
    console.log({url})
    try {
        const response = await axios.get(url);
        console.log({response})
        return {url, "response": response.data};
    } catch (error) {
        console.error(`HTTP request failed: ${error}`);
        return {responseMessage: `Failed to fetch data, url: ${url}`};
    }    
}

exports.handler = async (event) => {
    let responseMessage = 'Hello, World!';
    const urls = [
        `${process.env.APP_RUNNER_PRIVATE_SERVICE_TEST_URL}`,
        `${process.env.APP_RUNNER_CODE_BASED_PRIVATE_SERVICE_BASE_URL}`,
        `${process.env.APP_RUNNER_IMAGE_BASED_PRIVATE_SERVICE_BASE_URL}`
    ];
    const responses = await Promise.all(urls.map(url => testURL(url)));
    const response = {
        statusCode: 200,
        body: JSON.stringify(responses, null, 2),
    };

    return response;
};
