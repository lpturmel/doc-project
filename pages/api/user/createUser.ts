import { Credentials, DynamoDB } from "aws-sdk";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export default async (req, res) => {
    if (req.method === "POST") {
        const body = req.body;

        if (!body || Object.keys(body).length === 0) {
            res.statusCode = 400;
            return res.json({
                error: "Missing body",
            });
        }

        if (!("email" in body)) {
            res.statusCode = 400;
            return res.json({
                error: "Missing email in the request body",
            });
        }
        if (!("first_name" in body)) {
            res.statusCode = 400;
            return res.json({
                error: "Missing first_name in the request body",
            });
        }
        if (!("last_name" in body)) {
            res.statusCode = 400;
            return res.json({
                error: "Missing last_name in the request body",
            });
        }
        if (!("password" in body)) {
            res.statusCode = 400;
            return res.json({
                error: "Missing password in the request body",
            });
        }
        if (!("password_conf" in body)) {
            res.statusCode = 400;
            return res.json({
                error: "Missing password_conf in the request body",
            });
        }
        const first_name = body.first_name;
        const last_name = body.last_name;
        const email = body.email;
        const password = body.password;
        const password_conf = body.password_conf;

        if (password !== password_conf) {
            res.statusCode = 400;
            return res.json({
                error: "Passwords do not match",
            });
        }
        const saltRounds = 10;
        const hashed_password = await bcrypt.hash(password, saltRounds);

        const account_credentials = new Credentials({
            accessKeyId: "AKIASU5QMALPKLL6J4G5",
            secretAccessKey: "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",
        });

        const DDB = new DynamoDB({
            apiVersion: "2012-08-10",
            region: "ca-central-1",
            credentials: account_credentials,
        });

        var putParams = {
            TableName: "scheduling-user-service",
            Item: {
                _id: { S: uuidv4() },
                first_name: { S: first_name },
                last_name: { S: last_name },
                email: { S: email },
                password: { S: hashed_password },
            },
        };
        try {
            await DDB.putItem(putParams).promise();
        } catch (error) {}
        res.statusCode = 200;
        res.json({
            first_name,
            last_name,
            email,
        });
    } else {
        res.statusCode = 404;
        res.json("Cannot " + req.method);
    }
};
