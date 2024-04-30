const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async function (event, context) {
  const message = JSON.parse(event.body).message;
  message.timestamp = Date.now();

  let connections;

  try {
    connections = await ddb.scan({ TableName: process.env.table }).promise();

    await ddb
      .update({
        TableName: 'chats',
        Key: { id: message.id },
        UpdateExpression:
          'SET #messages = list_append(if_not_exists(#messages, :empty_list), :message)',
        ExpressionAttributeNames: {
          '#messages': 'messages',
        },
        ExpressionAttributeValues: {
          ':message': [message],
          ':empty_list': [],
        },
        ReturnValues: 'ALL_NEW', // This returns the updated item
      })
      .promise();
  } catch (err) {
    return {
      statusCode: 500,
      error: err,
    };
  }
  const callbackAPI = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint:
      event.requestContext.domainName + '/' + event.requestContext.stage,
  });

  const sendMessages = connections.Items.map(async ({ connectionId }) => {
    if (connectionId !== event.requestContext.connectionId) {
      try {
        await callbackAPI
          .postToConnection({
            ConnectionId: connectionId,
            Data: JSON.stringify(message),
          })
          .promise();
      } catch (e) {
        console.log(e);
      }
    }
  });

  try {
    await Promise.all(sendMessages);
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
    };
  }

  return { statusCode: 200 };
};
