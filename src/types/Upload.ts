import { useTranslations } from "next-intl";

export interface UploadFileProps {
  t: ReturnType<typeof useTranslations<"">>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  attachments: File[];
  handleViewFile: (file: File) => void;
  handleDeleteFile: (index: number) => void;
  errors: string;
  label: string;
  size: number;
  accept: string;
  fileTypesMessage?: string;
}