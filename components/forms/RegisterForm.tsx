/* eslint-disable @next/next/no-img-element */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
// Replaced next/image with native img for Vercel quota
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import loading from "@/app/loading";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { registerPatient } from "@/lib/actions/patient.actions";
import { PatientFormValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import SubmitButton from "../SubmitButton";

interface RegisterFormProps {
  user: User;
  patient?: any;
}

const RegisterForm = ({ user, patient }: RegisterFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      ...(patient || {}),
      name: (patient && patient.name) || user.name,
      email: (patient && patient.email) || user.email,
      phone: (patient && patient.phone) || user.phone,
      // Ensure all consent checkboxes are always present in form state
      treatmentConsent:
        patient && typeof patient.treatmentConsent === "boolean"
          ? patient.treatmentConsent
          : false,
      disclosureConsent:
        patient && typeof patient.disclosureConsent === "boolean"
          ? patient.disclosureConsent
          : false,
      privacyConsent:
        patient && typeof patient.privacyConsent === "boolean"
          ? patient.privacyConsent
          : false,
    },
  });

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center text-red-500">
        User not found. Please contact support.
      </div>
    );
  }

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);
    setErrorMessage(null);

    // Store file info in form data as
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patientPayload = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      };

      // If patient exists, update, else register
      let newPatient;
      if (patient && patient.$id) {
        newPatient = await registerPatient({
          ...patientPayload,
          $id: patient.$id,
        });
      } else {
        newPatient = await registerPatient(patientPayload);
      }

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      } else {
        setErrorMessage(
          "Registration failed. Please try again or contact support."
        );
      }
    } catch (error: any) {
      let message = "Registration failed. Please try again or contact support.";
      if (error?.message) message = error.message;
      setErrorMessage(message);
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header text-dark-700">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
          {errorMessage && (
            <div className="mt-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header text-dark-700">Personal Information</h2>
          </div>

          {/* NAME */}

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
            iconClassName="mx-2 my-auto flex items-center justify-center"
          />

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
              iconClassName="mx-2 my-auto flex items-center justify-center"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="(555) 123-4567"
              iconClassName="mx-2 my-auto flex items-center justify-center"
            />
          </div>

          {/* BirthDate & Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of birth"
              iconClassName="mx-2 my-auto flex items-center justify-center"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group text-white">
                        <RadioGroupItem value={option} id={option} />
                        <Label
                          htmlFor={option}
                          className="cursor-pointer text-white"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          {/* Address & Occupation */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="14 street, New york, NY - 5101"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder=" Software Engineer"
            />
          </div>

          {/* Emergency Contact Name & Emergency Contact Number */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="(555) 123-4567"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header text-dark-700">Medical Information</h2>
          </div>

          {/* PRIMARY CARE PHYSICIAN */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <img
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          {/* INSURANCE & POLICY NUMBER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance provider"
              placeholder="BlueCross BlueShield"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ABC123456789"
            />
          </div>

          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Pollen"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current medications"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>

          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label=" Family medical history (if relevant)"
              placeholder="Mother had brain cancer, Father has hypertension"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header text-dark-700">
              Identification and Verfication
            </h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <>
                <FormControl>
                  <FileUploader files={field.value} onChange={field.onChange} />
                </FormControl>
                {/* Show previously uploaded document if available and no new file is selected */}
                {patient?.identificationDocumentUrl &&
                  (!field.value || field.value.length === 0) && (
                    <div className="mt-4 flex flex-col items-start gap-2">
                      <span className="text-xs text-dark-600">
                        Previously uploaded document:
                      </span>
                      <img
                        src={patient.identificationDocumentUrl}
                        alt="Uploaded identification document"
                        className="max-h-60 rounded border border-gray-300 object-contain shadow"
                        style={{
                          maxWidth: "100%",
                          width: "auto",
                          height: "auto",
                        }}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.style.display = "none";
                          const msg = document.createElement("div");
                          msg.textContent =
                            "Document not found or no longer available.";
                          msg.className = "text-xs text-red-500 mt-2";
                          e.currentTarget.parentNode?.appendChild(msg);
                        }}
                      />
                    </div>
                  )}
              </>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header text-dark-700">Consent and Privacy</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy"
          />
        </section>

        <SubmitButton
          isLoading={isLoading}
          loadingText="Continuing..."
          className={`shad-primary-btn w-full${isLoading ? " cursor-not-allowed opacity-50" : ""}`}
        >
          {isLoading ? "Continuing..." : "Submit and Continue"}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
