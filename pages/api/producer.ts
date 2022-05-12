// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const SERVERLESSQ_QUEUE_ID = process.env.SERVERLESSQ_QUEUE_ID;
const SERVERLESSQ_API_TOKEN = process.env.SERVERLESSQ_API_TOKEN;

const VERCEL_URL = process.env.VERCEL_URL;

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { success } = req.query;

  const targetUrl = `https://${VERCEL_URL}/api/consumer/${
    success ? "success" : "fail"
  }`;
  console.log("Target URL: ", targetUrl);

  await fetch(
    `https://api.serverlessq.com?id=${SERVERLESSQ_QUEUE_ID}&target=${targetUrl}`,
    { headers: { "x-api-key": SERVERLESSQ_API_TOKEN! } }
  );

  res.status(200).json({ name: "Message sent to queue" });
}
