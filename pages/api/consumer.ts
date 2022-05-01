import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  const { responseCode } = req.query;
  res.status(Number(responseCode)).send();
}
