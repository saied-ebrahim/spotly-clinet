import type { IconType } from "react-icons";
import {
  FiHome,
  FiCalendar,
  FiShoppingBag,
  FiTrendingUp,
  FiDollarSign,
  FiSettings,
  FiTag,
  FiUser,
  FiPackage,
} from "react-icons/fi";

export type NavItem = {
  label: string;
  icon: IconType;
  badge?: string;
  active?: boolean;
  key?: string;
  link?: string;
  parentLink?: string;
  dependentParent?: boolean;
  allowedRoles?: string[];
};

export type NavSection = {
  title?: string;
  items: NavItem[];
};

export const navSections: NavSection[] = [
  {
    items: [
      {
        label: "Home",
        icon: FiHome,
        key: "home",
        link: "",
      },
      {
        label: "Events",
        icon: FiCalendar,
        key: "events",
        link: "events",
      },
      {
        label: "Orders",
        icon: FiShoppingBag,
        key: "orders",
        link: "orders",
      },
      {
        label: "Sold Products",
        icon: FiPackage,
        key: "sold-products",
        link: "sold-products",
        allowedRoles: ["Organizer"],
      },
      {
        label: "Tags",
        icon: FiTag,
        key: "tags",
        link: "tags",
        allowedRoles: ["Admin"],
      },
      {
        label: "Users",
        icon: FiUser,
        key: "users",
        link: "users",
        allowedRoles: ["Admin"],
      },
      {
        label: "Marketing",
        icon: FiTrendingUp,
        key: "marketing",
        link: "marketing",
      },
      {
        label: "Finance",
        icon: FiDollarSign,
        key: "finance",
        link: "finance",
      },
      {
        label: "Settings",
        icon: FiSettings,
        key: "settings",
        link: "settings",
      },
    ],
  },
];
