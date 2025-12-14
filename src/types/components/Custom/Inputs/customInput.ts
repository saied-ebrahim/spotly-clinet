export interface CustomInputProps {
  type?: string;
  placeholder?: string;
  id?: string;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
  error?: string;
  color?: string;
  size?: string;
  setOpen?: (open: boolean) => void;
  open?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  disabled?: boolean;
  apiUrl?: string;
  querySearch?: string;
  triggerApiUrl?: string;
  reset?: () => void;
  skipGlobalLoading?: boolean;
  rows?: number;
  [key: string]: unknown;
}
export type OptionType = {
  label: string;
  value: string;
};
