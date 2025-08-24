import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

import {
  databases,
  NEXT_PUBLIC_DATABASE_ID,
  NEXT_PUBLIC_PATIENT_COLLECTION_ID,
} from "@/lib/appwrite.config";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get("phone");

  if (!phone) {
    return NextResponse.json(
      { error: "Invalid phone number" },
      { status: 400 }
    );
  }

  try {
    console.log(`Checking phone in database: ${phone}`);
    const response = await databases.listDocuments(
      NEXT_PUBLIC_DATABASE_ID!,
      NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      [Query.equal("phone", phone)]
    );
    console.log(`Database response: ${JSON.stringify(response)}`);

    const exists = response.documents.length > 0;
    console.log(`Phone exists in database: ${exists}`);
    return NextResponse.json({ exists });
  } catch (error) {
    console.error(`Error checking phone in database: ${error}`);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
