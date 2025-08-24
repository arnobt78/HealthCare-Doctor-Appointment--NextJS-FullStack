import { NextApiRequest, NextApiResponse } from "next";

import { databases } from "@/lib/appwrite.config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { patientId } = req.query;

  try {
    const response = await databases.getDocument(
      "66f8831e001d304c7f4d", // Your database ID
      "66f883e700300eb34a8e", // Your collection ID
      patientId as string
    );
    res.status(200).json(response);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
    res.status(500).json({ error: "Failed to retrieve patient details" });
  }
}
