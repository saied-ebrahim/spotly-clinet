"use client";
import React, { useEffect, useState } from "react";
import { Controller, useForm, Resolver, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaBuilding,
  FaLink,
} from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiUserLocationLine } from "react-icons/ri";
import { TiLocationOutline } from "react-icons/ti";
import CustomInput from "@/components/Custom/CustomInput";
import StepNavigation from "./StepNavigation";
import {
  organizerStep1Schema,
  organizerStep2Schema,
} from "@/schemas/registerSchema";
import {
  OrganizerFormData,
  OrganizerFormDataStep1,
  OrganizerFormDataStep2,
} from "@/hooks/useRegisterForm";
import { BsGenderMale } from "react-icons/bs";
import { _checkFileSize, _checkFileType } from "@/shared/_shared";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/navigation";
import { TbLockPassword } from "react-icons/tb";
import UploadFile from "../Custom/UploadFile";
import { FaGraduationCap } from "react-icons/fa";

export default function OrganizerRegisterForm() {
  const t = useTranslations("");
  const [step, setStep] = useState<number>(1);
  const [fullFormData, setFullFormData] = useState<Partial<OrganizerFormData>>(
    {}
  );

  const handleNext = (data: Partial<typeof fullFormData>) => {
    setFullFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const submitOrganizer = (data: OrganizerFormDataStep2) => {
    const allData: Partial<OrganizerFormData> = { ...fullFormData, ...data };
    setFullFormData(allData);
    console.log("submitOrganizer", allData);
  };

  const handleBack = (data: Partial<OrganizerFormData>) => {
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
            submitOrganizer={submitOrganizer}
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
  onNext: (data: OrganizerFormDataStep1) => void;
  step: number;
  fullFormData: Partial<OrganizerFormData>;
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
  } = useForm<OrganizerFormDataStep1>({
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
      organizerStep1Schema(t)
    ) as unknown as Resolver<OrganizerFormDataStep1>,
    mode: "onChange",
  });

  const onSubmit = (data: OrganizerFormDataStep1) => onNext(data);

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
  submitOrganizer,
}: {
  t: ReturnType<typeof useTranslations<"">>;
  onBack: (data: Partial<OrganizerFormData>) => void;
  step: number;
  fullFormData: Partial<OrganizerFormData>;
  submitOrganizer: (data: OrganizerFormDataStep2) => void;
}) => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<OrganizerFormDataStep2>({
    defaultValues: {
      organizationName: fullFormData.organizationName || "",
      organizationType:
        fullFormData.organizationType ||
        (null as unknown as { label: string; value: string }),
      organizationDescription: fullFormData.organizationDescription || "",
      organizationWebsite: fullFormData.organizationWebsite || "",
      organizationLogo: fullFormData.organizationLogo || [],
    },
    resolver: yupResolver(
      organizerStep2Schema(t)
    ) as unknown as Resolver<OrganizerFormDataStep2>,
    mode: "onChange",
  });

  const onSubmit = (data: OrganizerFormDataStep2) => submitOrganizer(data);

  const organizationLogo =
    useWatch({
      control,
      name: "organizationLogo",
      defaultValue: [],
    }) || [];

  useEffect(() => {
    if (
      fullFormData.organizationLogo &&
      fullFormData.organizationLogo.length > 0
    ) {
      setValue("organizationLogo", fullFormData.organizationLogo, {
        shouldValidate: true,
      });
    }
  }, [fullFormData.organizationLogo, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const size = 2;

    if (!files.every((file: File) => _checkFileSize(file, size))) {
      toast.error(
        t("form.sizeMustBeLessThan{size}MB", { size: size.toString() })
      );
      return;
    }

    if (
      !files.every((file: File) =>
        _checkFileType(file, [
          "image/png",
          "image/webp",
          "image/jpeg",
          "image/jpg",
        ])
      )
    ) {
      toast.error(t("form.onlyPNGWEBPJPGAllowed"));
      return;
    }

    setValue("organizationLogo", [...organizationLogo, ...files], {
      shouldValidate: true,
    });
    e.target.value = "";
  };

  const handleDeleteFile = (index: number) => {
    const updatedFiles = organizationLogo.filter(
      (_: File, i: number) => i !== index
    );
    setValue("organizationLogo", updatedFiles, { shouldValidate: true });
  };

  const handleViewFile = (file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url, "_blank");
    URL.revokeObjectURL(url);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 animate-fadeIn"
    >
      <h3 className="text-center text-xl font-semibold mb-2">
        {t("form.step")} {step}: {t("form.organizationInformation")}
      </h3>

      <div className="space-y-6 animate-fadeIn">
        <Controller
          control={control}
          name="organizationName"
          render={({ field: { value, onChange } }) => (
            <CustomInput
              type="text"
              placeholder={t("form.organizationName")}
              id="organizationName"
              icon={<FaBuilding />}
              label={t("form.organizationName")}
              error={errors?.organizationName?.message || ""}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="organizationType"
          render={({ field: { value, onChange } }) => (
            <CustomInput
              type="select"
              placeholder={t("form.organizationType")}
              id="organizationType"
              icon={<FaGraduationCap />}
              label={t("form.organizationType")}
              error={errors?.organizationType?.message || ""}
              value={value}
              onChange={onChange}
              options={[
                {
                  label: t("form.corporate"),
                  value: "corporate",
                },
                {
                  label: t("form.nonProfit"),
                  value: "non-profit",
                },
                {
                  label: t("form.educational"),
                  value: "educational",
                },
                {
                  label: t("form.government"),
                  value: "government",
                },
                {
                  label: t("form.other"),
                  value: "other",
                },
              ]}
            />
          )}
        />

        <Controller
          control={control}
          name="organizationDescription"
          render={({ field: { value, onChange } }) => (
            <CustomInput
              type="textarea"
              placeholder={t("form.organizationDescription")}
              id="organizationDescription"
              label={t("form.organizationDescription")}
              error={errors?.organizationDescription?.message || ""}
              value={value}
              onChange={onChange}
              rows={4}
            />
          )}
        />

        <Controller
          control={control}
          name="organizationWebsite"
          render={({ field: { value, onChange } }) => (
            <CustomInput
              type="text"
              placeholder={t("form.organizationWebsite")}
              id="organizationWebsite"
              icon={<FaLink />}
              label={t("form.organizationWebsite")}
              error={errors?.organizationWebsite?.message || ""}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <UploadFile
          t={t}
          handleFileChange={handleFileChange}
          attachments={organizationLogo}
          handleViewFile={handleViewFile}
          handleDeleteFile={handleDeleteFile}
          errors={errors?.organizationLogo?.message || ""}
          label={"form.organizationLogo"}
          size={2}
          accept="image/png,image/webp,image/jpeg,image/jpg"
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
