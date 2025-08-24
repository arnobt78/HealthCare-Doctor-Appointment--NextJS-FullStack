import { redirect } from "next/navigation";

import {
  getUserByEmail,
  getPatientByEmail,
  updatePatientUserId,
} from "@/lib/actions/patient.actions";

interface FindByEmailPageProps {
  searchParams: { email: string };
}

const FindByEmailPage = async ({ searchParams }: FindByEmailPageProps) => {
  const { email } = searchParams;
  if (!email) {
    // fallback: redirect to home
    redirect("/");
  }

  // 1. Find user by email in Appwrite Auth
  const user = await getUserByEmail(email);
  // 2. Find patient by email in DB
  const patient = await getPatientByEmail(email);

  if (user && patient) {
    // 3. If patient.userId !== user.$id, update patient.userId
    if (patient.userId !== user.$id) {
      await updatePatientUserId(patient.$id, user.$id);
    }
    // 4. Redirect to correct register page
    redirect(`/patients/${user.$id}/register`);
  } else if (user) {
    // No patient, but user exists: redirect to register
    redirect(`/patients/${user.$id}/register`);
  } else {
    // fallback: redirect to home
    redirect("/");
  }
};

export default FindByEmailPage;
