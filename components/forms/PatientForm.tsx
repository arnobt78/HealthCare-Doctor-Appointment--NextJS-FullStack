"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };
      const newUser = await createUser(user);
      if (newUser && "$id" in newUser) {
        startTransition(() => {
          router.push(`/patients/${(newUser as { $id: string }).$id}/register`);
        });
      } else {
        setIsLoading(false);
        if ("message" in newUser && typeof newUser.message === "string") {
          // Optionally, show error message to user
          console.error(newUser.message);
        }
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        if (error.message.includes("Email already exists")) {
          form.setError("email", {
            type: "manual",
            message: "Email already exists",
          });
        }
        if (error.message.includes("Phone number already exists")) {
          form.setError("phone", {
            type: "manual",
            message: "Phone number already exists",
          });
        }
      }
      // Ensure loading state is visible for at least 200ms
      setTimeout(() => setIsLoading(false), 200);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header text-dark-700">Hi there 👋</h1>
          <p className="text-dark-700">Get started with appointments.</p>
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          iconClassName="mx-2 my-auto flex items-center justify-center"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
          iconClassName="mx-2 my-auto flex items-center justify-center"
        />
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />
        <SubmitButton
          isLoading={isLoading || isPending}
          loadingText="Continuing..."
          className={`shad-primary-btn w-full${isLoading || isPending ? " cursor-not-allowed opacity-50" : ""}`}
        >
          {isLoading || isPending ? "Continuing..." : "Get Started"}
        </SubmitButton>
      </form>
    </Form>
  );
};
