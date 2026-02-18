export type NavItem = {
  label: string;
  href: string;
  icon?: string;
  exact?: boolean;
  roles?: string[];
  subItems?: {
  	label: string;
  	href: string;
    exact?: boolean;
  	icon?: string;
    roles?: string[];
    subItems?: {
      label: string;
      href: string;
      exact?: boolean;
      icon?: string;
      roles?: string[];
      subItems?: {
        label: string;
        href: string;
        exact?: boolean;
        icon?: string;
        roles?: string[];
      }[]
    }[]
  }[];
};
export interface SidebarGroup {
  title: string;
  items: NavItem[];
}

