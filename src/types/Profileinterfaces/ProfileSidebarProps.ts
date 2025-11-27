import { ProfileSection } from "./ProfileSection";

export interface ProfileSidebarProps {
  activeSection: ProfileSection;
  onSectionChange: (section: ProfileSection) => void;
}
