"use client";
import React, { useState } from "react";
import { Controller, useForm, Resolver, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaBuilding,
  FaIdCard,
  FaUserShield,
} from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiUserLocationLine } from "react-icons/ri";
import { TiLocationOutline } from "react-icons/ti";
import CustomInput from "@/components/Custom/CustomInput";
import StepNavigation from "./StepNavigation";
import { adminStep1Schema, adminStep2Schema } from "@/schemas/registerSchema";
import {
  AdminFormData,
  AdminFormDataStep1,
  AdminFormDataStep2,
} from "@/hooks/useRegisterForm";
import { BsGenderMale } from "react-icons/bs";
import { useRouter } from "@/i18n/navigation";
import { TbLockPassword } from "react-icons/tb";

export default function AdminRegisterForm() {
  const t = useTranslations("");
  const [step, setStep] = useState<number>(1);
  const [fullFormData, setFullFormData] = useState<Partial<AdminFormData>>({});

  const handleNext = (data: Partial<typeof fullFormData>) => {
    setFullFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const submitAdmin = (data: AdminFormDataStep2) => {
    const allData: Partial<AdminFormData> = { ...fullFormData, ...data };
    setFullFormData(allData);
    console.log("submitAdmin", allData);
  };

  const handleBack = (data: Partial<AdminFormData>) => {
    setFullFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Form
            t={t}
            onNext={handleNext}
            step={step}
            fullFormData={fullFormData}
          />
        );
      case 2:
        return (
          <Step2Form
            t={t}
            onBack={handleBack}
            step={step}
            fullFormData={fullFormData}
            submitAdmin={submitAdmin}
          />
        );
      default:
        return null;
    }
  };

  return <div className="">{renderStep()}</div>;
}

const Step1Form = ({
  t,
  onNext,
  step,
  fullFormData,
}: {
  t: ReturnType<typeof useTranslations<"">>;
  onNext: (data: AdminFormDataStep1) => void;
  step: number;
  fullFormData: Partial<AdminFormData>;
}) => {
  const router = useRouter();
  const messages = {
    firstName: t("auth.firstName"),
    lastName: t("auth.lastName"),
    phone: t("auth.phone"),
    email: t("auth.email"),
    gender: t("auth.gender"),
    birthDate: t("auth.birthDate"),
  };

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<AdminFormDataStep1>({
    defaultValues: {
      firstName: fullFormData.firstName || "",
      lastName: fullFormData.lastName || "",
      phone: fullFormData.phone || "",
      email: fullFormData.email || "",
      country:
        fullFormData.country ||
        (null as unknown as { label: string; value: string }),
      state:
        fullFormData.state ||
        (null as unknown as { label: string; value: string }),
      city:
        fullFormData.city ||
        (null as unknown as { label: string; value: string }),
      gender:
        fullFormData.gender ||
        (null as unknown as { label: string; value: string }),
      birthDate: fullFormData.birthDate
        ? new Date(fullFormData.birthDate)
        : new Date(),
      password: fullFormData.password || "",
      confirmPassword: fullFormData.confirmPassword || "",
    },
    resolver: yupResolver(
      adminStep1Schema(t)
    ) as unknown as Resolver<AdminFormDataStep1>,
    mode: "onChange",
  });

  const onSubmit = (data: AdminFormDataStep1) => onNext(data);

  const country = useWatch({
    control,
    name: "country",
  });
  const state = useWatch({
    control,
    name: "state",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 animate-fadeIn"
    >
      <h3 className="text-xl font-bold text-center mb-4">
        {t("form.step")} {step}: {t("form.personalInformation")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <CustomInput
              {...field}
              type="text"
              id="firstName"
              label={messages.firstName}
              placeholder={messages.firstName}
              icon={<FaUser />}
              error={errors.firstName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <CustomInput
              {...field}
              type="text"
              id="lastName"
              label={messages.lastName}
              placeholder={messages.lastName}
              icon={<FaUser />}
              error={errors.lastName?.message}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <CustomInput
            {...field}
            type="email"
            id="email"
            label={messages.email}
            placeholder={messages.email}
            icon={<FaEnvelope />}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field }) => (
          <CustomInput
            {...field}
            type="tel"
            id="phone"
            label={messages.phone}
            placeholder={messages.phone}
            icon={<FaPhone />}
            error={errors.phone?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="country"
        render={({ field: { value, onChange } }) => (
          <CustomInput
            type="select"
            apiUrl="/api/countries"
            querySearch={"search"}
            placeholder={t("auth.selectCountry")}
            id="country"
            icon={<FaMapLocationDot />}
            label={t("auth.country")}
            reset={() => {
              setValue(
                "state",
                null as unknown as { label: string; value: string }
              );
              setValue(
                "city",
                null as unknown as { label: string; value: string }
              );
              trigger("state");
              trigger("city");
            }}
            error={errors.country?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="state"
        render={({ field: { value, onChange } }) => (
          <CustomInput
            type="select"
            apiUrl={`/api/state`}
            triggerApiUrl={`countryId=${country?.value || ""}`}
            querySearch={"search"}
            placeholder={t("auth.selectState")}
            reset={() => {
              setValue(
                "city",
                null as unknown as { label: string; value: string }
              );
              trigger("city");
            }}
            id="state"
            icon={<TiLocationOutline />}
            label={t("auth.state")}
            error={errors.state?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="city"
        render={({ field: { value, onChange } }) => (
          <CustomInput
            type="select"
            apiUrl={`/api/city`}
            triggerApiUrl={`stateId=${state?.value || ""}`}
            querySearch={"search"}
            placeholder={t("auth.selectCity")}
            id="city"
            icon={<RiUserLocationLine />}
            label={t("auth.city")}
            error={errors.city?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="gender"
        render={({ field }) => (
          <CustomInput
            {...field}
            type="select"
            id="gender"
            label={messages.gender}
            placeholder={messages.gender}
            icon={<BsGenderMale />}
            error={errors.gender?.message}
            options={[
              { label: t("auth.male"), value: "male" },
              {
                label: t("auth.female"),
                value: "female",
              },
            ]}
          />
        )}
      />
      <Controller
        control={control}
        name="birthDate"
        render={({ field }) => (
          <CustomInput
            {...field}
            type="date"
            id="birthDate"
            label={messages.birthDate}
            placeholder={messages.birthDate}
            icon={<FaCalendarAlt />}
            error={errors.birthDate?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange } }) => (
          <CustomInput
            type="password"
            placeholder={t("auth.password")}
            id="password"
            icon={<TbLockPassword />}
            label={t("auth.password")}
            error={errors.password?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { value, onChange } }) => (
          <CustomInput
            type="password"
            placeholder={t("auth.confirmPassword")}
            id="confirmPassword"
            icon={<TbLockPassword />}
            label={t("auth.confirmPassword")}
            error={errors.confirmPassword?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />
      <StepNavigation
        currentStep={step}
        totalSteps={2}
        nextLabel={t("form.next")}
        onBack={() => {
          router.push("/auth/register");
        }}
      />
    </form>
  );
};

const Step2Form = ({
  t,
  onBack,
  step,
  fullFormData,
  submitAdmin,
}: {
  t: ReturnType<typeof useTranslations<"">>;
  onBack: (data: Partial<AdminFormData>) => void;
  step: number;
  fullFormData: Partial<AdminFormData>;
  submitAdmin: (data: AdminFormDataStep2) => void;
}) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<AdminFormDataStep2>({
    defaultValues: {
      adminCode: fullFormData.adminCode || "",
      department:
        fullFormData.department ||
        (null as unknown as { label: string; value: string }),
      adminRole:
        fullFormData.adminRole ||
        (null as unknown as { label: string; value: string }),
    },
    resolver: yupResolver(
      adminStep2Schema(t)
    ) as unknown as Resolver<AdminFormDataStep2>,
    mode: "onChange",
  });

  const onSubmit = (data: AdminFormDataStep2) => submitAdmin(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 animate-fadeIn"
    >
      <h3 className="text-center text-xl font-semibold mb-2">
        {t("form.step")} {step}: {t("form.adminCredentials")}
      </h3>

      <div className="space-y-6 animate-fadeIn">
        <Controller
          control={control}
          name="adminCode"
          render={({ field: { value, onChange } }) => (
            <CustomInput
              type="text"
              placeholder={t("form.adminCode")}
              id="adminCode"
              icon={<FaIdCard />}
              label={t("form.adminCode")}
              error={errors?.adminCode?.message || ""}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="department"
          render={({ field: { value, onChange } }) => (
            <CustomInput
              type="select"
              placeholder={t("form.department")}
              id="department"
              icon={<FaBuilding />}
              label={t("form.department")}
              error={errors?.department?.message || ""}
              value={value}
              onChange={onChange}
              options={[
                {
                  label: t("form.operations"),
                  value: "operations",
                },
                {
                  label: t("form.support"),
                  value: "support",
                },
                {
                  label: t("form.marketing"),
                  value: "marketing",
                },
                {
                  label: t("form.development"),
                  value: "development",
                },
                {
                  label: t("form.management"),
                  value: "management",
                },
              ]}
            />
          )}
        />

        <Controller
          control={control}
          name="adminRole"
          render={({ field: { value, onChange } }) => (
            <CustomInput
              type="select"
              placeholder={t("form.adminRole")}
              id="adminRole"
              icon={<FaUserShield />}
              label={t("form.adminRole")}
              error={errors?.adminRole?.message || ""}
              value={value}
              onChange={onChange}
              options={[
                {
                  label: t("form.superAdmin"),
                  value: "super-admin",
                },
                {
                  label: t("form.contentModerator"),
                  value: "content-moderator",
                },
                {
                  label: t("form.supportAdmin"),
                  value: "support-admin",
                },
                {
                  label: t("form.analyticsAdmin"),
                  value: "analytics-admin",
                },
              ]}
            />
          )}
        />
      </div>

      <StepNavigation
        currentStep={step}
        totalSteps={2}
        onBack={() => onBack(getValues())}
        nextLabel={t("form.finish")}
        backLabel={t("form.back")}
      />
    </form>
  );
};
