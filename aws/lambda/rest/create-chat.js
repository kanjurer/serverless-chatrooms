const AWS = require('aws-sdk');
const uuid = require('uuid');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async function (event, context) {
  try {
    const item = {
      id: uuid.v4(),
      name: event.name,
      users: event.users,
      messages: event.messages,
      createdBy: event.createdBy,
      createdAt: Date.now(),
    };

    await ddb
      .put({
        TableName: 'chats',
        Item: item,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err }),
    };
  }
};
