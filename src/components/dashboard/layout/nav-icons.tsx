import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { ClipboardTextIcon } from '@phosphor-icons/react/dist/ssr/ClipboardText';
import { DropIcon } from '@phosphor-icons/react/dist/ssr/Drop';
import { GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { GlobeIcon } from '@phosphor-icons/react/dist/ssr/Globe';
import { MicroscopeIcon } from '@phosphor-icons/react/dist/ssr/Microscope';
import { PackageIcon } from '@phosphor-icons/react/dist/ssr/Package';
import { PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { WarningCircleIcon } from '@phosphor-icons/react/dist/ssr/WarningCircle';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'clipboard-text': ClipboardTextIcon,
  'drop': DropIcon,
  'gear-six': GearSixIcon,
  'globe': GlobeIcon,
  'microscope': MicroscopeIcon,
  'package': PackageIcon,
  'plugs-connected': PlugsConnectedIcon,
  'user': UserIcon,
  'users': UsersIcon,
  'warning-circle': WarningCircleIcon,
  'x-square': XSquare,
} as Record<string, Icon>;
