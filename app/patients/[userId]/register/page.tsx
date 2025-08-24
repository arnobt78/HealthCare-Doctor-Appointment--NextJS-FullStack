/* eslint-disable @next/next/no-img-element */
// Replaced next/image with native img for Vercel quota
// import { redirect } from "next/navigation";
import Link from "next/link";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  // Prefer patient.phone over user.phone if available
  let mergedUser = user;
  if (patient && patient.phone && patient.phone !== "") {
    mergedUser = user ? { ...user, phone: patient.phone } : undefined;
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="mx-auto max-w-md rounded-md border border-red-300 bg-red-50 px-6 py-8 text-center text-lg text-red-700">
          <p className="mb-2 font-semibold">User not found</p>
          <p className="mb-4">
            The account associated with this patient record no longer exists.
            Please contact support or try registering as a new patient.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Link href="/">
            <img
              src="/assets/icons/logo-full.svg"
              width={200}
              height={40}
              alt="CarePulse Logo"
              className="mb-12 h-10 w-fit"
              loading="eager"
              decoding="async"
              style={{ height: "auto", width: "auto" }}
            />
          </Link>

          {/* Pass mergedUser for prefill/edit */}
          <RegisterForm user={mergedUser} patient={patient} />

          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <img
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default Register;
