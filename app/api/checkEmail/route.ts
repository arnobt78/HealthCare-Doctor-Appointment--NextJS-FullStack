import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

import {
  databases,
  NEXT_PUBLIC_DATABASE_ID,
  NEXT_PUBLIC_PATIENT_COLLECTION_ID,
} from "@/lib/appwrite.config";
import type { Patient } from "@/types/appwrite.types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    const response = await databases.listDocuments(
      NEXT_PUBLIC_DATABASE_ID!,
      NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      [Query.equal("email", email)]
    );

    const exists = response.documents.length > 0;
    let userId;
    let user;
    if (exists) {
      const patientDoc = response.documents[0] as Patient;
      userId = patientDoc.userId; // Use Appwrite Auth user ID for routing
      user = patientDoc;
    }
    return NextResponse.json({ exists, userId, user });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
