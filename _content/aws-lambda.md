---
title: How to deploy a lambda function
author: Louis-Philippe Turmel
created: Monday, Mars 8th 2021
languages: Typescript, Powershell, YML
---

## 1. Get your access keys from the console

Under the IAM service go to the users section and select the user that you use to connect to the console.

You will find a section named access keys. Create one and save the csv file somewhere to keep your credentials since you **cannot re download or see them afterwards**.
![iam-console](/aws-lambda/console-iam.png)

These credentials are used to authenticate your user to the AWS account it is assigned with, programmaticly and as such, you can access anything that your user can access via the CLI or SDK.

## 2. Create your nodejs project

Refer to this guide to see how to create a new node project:
[Create a nodejs project from scratch](https://doc-project.vercel.app/posts/create-node-project)

## 3. Install the serverless library globally

Run this command in any terminal window:

```powershell
npm install -g serverless
```

You can test to see if the library is correctly installed by running:

```powershell
serverless --version
```

## 4. Configure with your aws account

Setup the serverless framework with your AWS account:

```powershell
serverless config credentials --provider aws \
--key YOUR_ACCESS_KEY --secret YOU_SECRET_KEY
```

## 5. Setup the serverless configuration file for your project

Create a file named serverless.yml at the **ROOT** of your project and populate it with this:

```yml
service: hello-world
provider:
    name: aws
    runtime: nodejs12.x
    stage: dev
    region: us-east-1
functions:
    hello-world-service:
        handler: handler.helloWorld
        events:
            - http:
                  path: hello
                  method: get
```

## 6. Create your handler

Create a file named handler.js and add the following lines to it:

```javascript
// The name of the handler here needs to match
// the one you specified in the serverless.yml config file
module.exports.helloWorld = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    return callback(null, {
        statusCode: 200,
        body: JSON.stringify("Hello World!"),
    });
};
```

## 7. Deploy
