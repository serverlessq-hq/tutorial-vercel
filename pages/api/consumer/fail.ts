import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  console.log("Get failure request");
  res.status(400).send();
}
