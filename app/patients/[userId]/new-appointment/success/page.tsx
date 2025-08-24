/* eslint-disable @next/next/no-img-element */
// Replaced next/image with native img for Vercel quota
import dynamic from "next/dynamic";
import Link from "next/link";

import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
const NewAppointmentButton = dynamic(
  () => import("@/components/NewAppointmentButton"),
  { ssr: false }
);

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <img
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            loading="eager"
            decoding="async"
          />
        </Link>

        <section className="flex flex-col items-center">
          <img
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
            style={{
              width: 280,
              height: 300,
              objectFit: "contain",
              aspectRatio: "auto",
            }}
            loading="eager"
            decoding="async"
          />
          <h2 className="header mb-6 max-w-[600px] text-center text-dark-700">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p className="text-dark-700">
            We&apos;ll be in touch shortly to confirm.
          </p>
        </section>

        <section className="request-details text-dark-700">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <img
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
              style={{
                width: "auto",
                height: "auto",
                maxWidth: 100,
                maxHeight: 100,
                objectFit: "contain",
                aspectRatio: "auto",
              }}
              loading="lazy"
              decoding="async"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <img
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
              style={{
                width: "auto",
                height: "auto",
                maxWidth: 24,
                maxHeight: 24,
                objectFit: "contain",
                aspectRatio: "auto",
              }}
              loading="lazy"
              decoding="async"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <NewAppointmentButton userId={userId} />

        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
