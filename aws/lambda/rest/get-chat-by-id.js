const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async function (event, context) {
  try {
    const id = event.pathParameters.id;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'ID parameter is missing' }),
      };
    }

    const chat = await ddb
      .get({
        TableName: 'chats',
        Key: {
          id: id,
        },
      })
      .promise();

    if (!chat.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Chat not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(chat.Item),
    };
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
