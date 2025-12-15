import type { IconType } from "react-icons";
import {
  FiHome,
  FiCalendar,
  FiShoppingBag,
  FiTag,
  FiUser,
  FiPackage,
  FiGrid,
} from "react-icons/fi";

export type NavItem = {
  icon: IconType;
  badge?: string;
  active?: boolean;
  key: string;
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
        icon: FiHome,
        key: "home",
        link: "",
      },
      {
        icon: FiCalendar,
        key: "events",
        link: "events",
      },
      {
        icon: FiShoppingBag,
        key: "orders",
        link: "orders",
      },
      {
        icon: FiPackage,
        key: "sold-products",
        link: "sold-products",
        allowedRoles: ["organizer"],
      },
      {
        icon: FiTag,
        key: "tags",
        link: "tags",
        allowedRoles: ["admin"],
      },
      {
        icon: FiGrid,
        key: "categories",
        link: "categories",
        allowedRoles: ["admin"],
      },
      {
        icon: FiUser,
        key: "users",
        link: "users",
        allowedRoles: ["Admin"],
      },
    ],
  },
];
