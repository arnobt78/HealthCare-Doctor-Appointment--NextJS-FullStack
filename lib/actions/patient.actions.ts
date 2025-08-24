"use server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

import {
  BUCKET_ID,
  NEXT_PUBLIC_DATABASE_ID,
  ENDPOINT,
  NEXT_PUBLIC_PATIENT_COLLECTION_ID,
  NEXT_PUBLIC_PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create

    const newuser = await users.create(
      ID.unique(),
      user.email,
      undefined, // phone is not unique in Appwrite, so skip it here
      undefined,
      user.name
    );
    return newuser;
  } catch (error: any) {
    // Check existing user if error code is 409 (conflict)
    if (error && error.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);
      if (existingUser.users[0] && existingUser.users[0].$id) {
        return existingUser.users[0];
      }
      // Instead of throwing, return a user-friendly error object
      return {
        error: true,
        message:
          "Email already exists, but user record is invalid. Please contact support or use the 'Returning Patient?' button.",
      };
    }
    console.error("An error occurred while creating a new user:", error);
    throw error;
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    let publicUrl = null;
    if (identificationDocument) {
      const blobEntry = identificationDocument.get("blobFile");
      const fileName = identificationDocument.get("fileName") as string;
      if (blobEntry && blobEntry instanceof Blob) {
        const inputFile = InputFile.fromBuffer(blobEntry, fileName);
        file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
        if (file?.$id) {
          publicUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${NEXT_PUBLIC_PROJECT_ID}`;
        }
      }
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      NEXT_PUBLIC_DATABASE_ID!,
      NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: publicUrl,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      NEXT_PUBLIC_DATABASE_ID!,
      NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      [
        Query.equal("userId", [userId]),
        Query.orderDesc("$updatedAt"),
        Query.limit(1),
      ]
    );
    return patients.documents.length > 0
      ? parseStringify(patients.documents[0])
      : null;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
    return null;
  }
};

// --- Utility functions for returning patient logic ---

export const getUserByEmail = async (email: string) => {
  try {
    const usersList = await users.list([Query.equal("email", [email])]);
    if (usersList.users.length > 0) {
      return parseStringify(usersList.users[0]);
    }
    return null;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user by email:",
      error
    );
    return null;
  }
};

export const getPatientByEmail = async (email: string) => {
  try {
    const patients = await databases.listDocuments(
      NEXT_PUBLIC_DATABASE_ID!,
      NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      [
        Query.equal("email", [email]),
        Query.orderDesc("$updatedAt"),
        Query.limit(1),
      ]
    );
    if (patients.documents.length > 0) {
      return parseStringify(patients.documents[0]);
    }
    return null;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient by email:",
      error
    );
    return null;
  }
};

export const updatePatientUserId = async (
  patientId: string,
  userId: string
) => {
  try {
    const updated = await databases.updateDocument(
      NEXT_PUBLIC_DATABASE_ID!,
      NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      patientId,
      { userId }
    );
    return parseStringify(updated);
  } catch (error) {
    console.error("An error occurred while updating patient userId:", error);
    return null;
  }
};
