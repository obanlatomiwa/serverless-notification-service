import AWS from "aws-sdk";

const ses = new AWS.SES({ region: "eu-west-1" });

async function sendMail(event, context) {
  const record = event.Records[0];
  console.log("email records", record);
  const { email } = JSON.parse(record.body);
  const { subject, receipent, body } = email;

  const params = {
    Source: "obanlatomiwa@gmail.com",
    Destination: {
      ToAddresses: [receipent],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
      },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log(result);
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export const handler = sendMail;
