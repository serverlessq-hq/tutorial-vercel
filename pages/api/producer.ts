// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const SERVERLESSQ_QUEUE_ID = process.env.SERVERLESSQ_QUEUE_ID;
const SERVERLESSQ_API_TOKEN = process.env.SERVERLESSQ_API_TOKEN;

const VERCEL_URL = process.env.VERCEL_URL;
const BASE_URL = process.env.BASE_URL || "api.serverlessq.com";

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

  const fetchUrl = `https://${BASE_URL}?id=${SERVERLESSQ_QUEUE_ID}&target=${targetUrl}`;

  console.log("Fetch URL", fetchUrl);

  const result = await fetch(fetchUrl, {
    headers: { "x-api-key": SERVERLESSQ_API_TOKEN! },
  });

  console.log("Result: ", result);

  res.status(200).json({ name: "Message sent to queue" });
}
