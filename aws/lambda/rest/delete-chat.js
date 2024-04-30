const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async function (event, context) {
  try {
    const id = event.pathParameters.id;

    await ddb
      .delete({
        TableName: 'chats',
        Key: {
          id: id,
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Chat deleted successfully' }),
    };
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err }),
    };
  }
};
