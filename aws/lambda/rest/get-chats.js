const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async function (event, context) {
  try {
    const chats = await ddb.scan({ TableName: 'chats' }).promise();

    return {
      statusCode: 200,
      chats: chats.Items,
    };
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err }),
    };
  }
};
