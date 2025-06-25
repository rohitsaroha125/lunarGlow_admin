import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'users', title: 'Users', href: paths.dashboard.users, icon: 'users' },
  { key: 'assessments', title: 'Assessments', href: paths.dashboard.assessments, icon: 'clipboard-text' },
  { key: 'skin-concerns', title: 'Skin Concerns', href: paths.dashboard.skinConcerns, icon: 'warning-circle' },
  { key: 'skin-type', title: 'Skin Type', href: paths.dashboard.skinType, icon: 'drop' },
  { key: 'product-lines', title: 'Product Lines', href: paths.dashboard.productLines, icon: 'package' },
  { key: 'product-global', title: 'Product Global', href: paths.dashboard.productGlobal, icon: 'globe' },
  { key: 'product-india', title: 'Product India', href: paths.dashboard.productIndia, icon: 'package' },
  { key: 'skin-analysis', title: 'Skin Analysis', href: paths.dashboard.skinAnalysis, icon: 'microscope' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
] satisfies NavItemConfig[];
