const { v4: uuidv4 } = require('uuid');
let guitars = require('../guitarData.js');

exports.handler = async (event) => {
    const { httpMethod, body } = event;

    if (httpMethod === 'GET') {
        // Get guitars logic
        return {
            statusCode: 200,
            body: JSON.stringify(guitars)
        };
    }

    if (httpMethod === 'POST') {
        const newGuitar = JSON.parse(body);
        newGuitar.id = uuidv4();
        guitars.push(newGuitar);

        return {
            statusCode: 201,
            body: JSON.stringify(newGuitar)
        };
    }

    if (event.httpMethod === "DELETE") {
        const { id } = event.queryStringParameters || {};

        const index = guitars.findIndex((guitar) => guitar.id === id);

        if (index === -1) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Guitar not found", id })
            };
        }

        guitars.splice(index, 1);
                

        return {
            statusCode: 200,
            body: JSON.stringify({
            message: "Guitar deleted",
            id: id
            })
        };
    }

    // Handle unsupported methods
    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' })
    };
};