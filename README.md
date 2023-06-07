# OpenAI API Chat with Model gpt-3.5-turbo

This project is an example of how to use OpenAI's API chat with the model gpt-3.5-turbo. The project consists of three files:

1. `lambda.mjs`: This is a JavaScript code that communicates with OpenAI's API and will be deployed to AWS Lambda.

2. `chat.js`: This is a JavaScript file that contains HTTP REST code to communicate with the Lambda.

3. `index.html`: This is a very simple UI web chat using the Carbon Design System.

## Deployment

To deploy this project, follow these steps:

1. Deploy `lambda.mjs` to AWS Lambda. You can do this using the AWS CLI or the AWS Management Console.

2. Update the `endpoint` variable in `chat.js` with the endpoint of your AWS Lambda deployment.

3. Deploy `index.html` and `chat.js` to an AWS S3 bucket. Make sure to set the bucket to serve as hosting.

After completing these steps, you should be able to navigate to the URL of your AWS S3 bucket and see the chat UI. You can then use the chat UI to communicate with the OpenAI API using the gpt-3.5-turbo model.
