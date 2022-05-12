import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  console.log("Get success request");
  res.status(200).send();
}
