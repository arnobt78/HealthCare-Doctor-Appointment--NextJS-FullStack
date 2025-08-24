/* eslint-disable @next/next/no-img-element */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";

import { AppointmentModal } from "../AppointmentModal";
import { PatientModal } from "../PatientModal";
import { StatusBadge } from "../StatusBadge";

interface ColumnsProps {
  openModal: (patientId: string) => void;
  isModalOpen: boolean;
  selectedPatientId: string | null;
  closeModal: () => void;
  reloadAppointments?: () => void;
}

export const Columns = ({
  openModal,
  isModalOpen,
  selectedPatientId,
  closeModal,
  reloadAppointments,
}: ColumnsProps): ColumnDef<Appointment>[] => [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="text-14-medium cursor-pointer">
          <div
            onClick={() => openModal(appointment.patient.$id)}
            className="inline-block rounded-md p-3 text-white transition-colors duration-200 hover:bg-gray-800 hover:text-gray-300"
          >
            <p>{appointment.patient.name}</p>
          </div>
          {isModalOpen && selectedPatientId === appointment.patient.$id && (
            <PatientModal
              patientId={selectedPatientId}
              closeModal={closeModal}
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;

      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <img
            src={doctor?.image!}
            alt="doctor"
            width={100}
            height="auto"
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex gap-1">
          <AppointmentModal
            patientId={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="schedule"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
            reloadAppointments={reloadAppointments}
          />
          <AppointmentModal
            patientId={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
            reloadAppointments={reloadAppointments}
          />
        </div>
      );
    },
  },
];
