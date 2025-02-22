import type { LucideIcon } from 'lucide-react';
import type { ComponentProps, PropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '../../helpers';
import type { Color, Size } from '../types';

export type ButtonVariant = 'filled' | 'outlined' | 'text';

type VariantClassNames = Record<
  ButtonVariant,
  Record<
    Color,
    {
      base: string;
      hover: string;
      focus: string;
      active: string;
    }
  >
>;

const variantClassNames: VariantClassNames = {
  filled: {
    slate: {
      base: 'bg-slate-100 dark:bg-slate-800',
      hover: 'hover:bg-slate-200 dark:hover:bg-slate-700',
      focus: 'focus:bg-slate-200 dark:focus:bg-slate-700',
      active: 'active:bg-slate-300 dark:active:bg-slate-800/50',
    },
    gray: {
      base: 'text-white bg-gray-500 dark:bg-gray-600',
      hover: 'hover:bg-gray-400 dark:hover:bg-gray-500',
      focus: 'focus:bg-gray-400 dark:focus:bg-gray-500',
      active: 'active:bg-gray-600 dark:active:bg-gray-700',
    },
    zinc: {
      base: 'text-white bg-zinc-500 dark:bg-zinc-600',
      hover: 'hover:bg-zinc-400 dark:hover:bg-zinc-500',
      focus: 'focus:bg-zinc-400 dark:focus:bg-zinc-500',
      active: 'active:bg-zinc-600 dark:active:bg-zinc-700',
    },
    neutral: {
      base: 'text-white bg-neutral-500 dark:bg-neutral-600',
      hover: 'hover:bg-neutral-400 dark:hover:bg-neutral-500',
      focus: 'focus:bg-neutral-400 dark:focus:bg-neutral-500',
      active: 'active:bg-neutral-600 dark:active:bg-neutral-700',
    },
    stone: {
      base: 'text-white bg-stone-500 dark:bg-stone-600',
      hover: 'hover:bg-stone-400 dark:hover:bg-stone-500',
      focus: 'focus:bg-stone-400 dark:focus:bg-stone-500',
      active: 'active:bg-stone-600 dark:active:bg-stone-700',
    },
    red: {
      base: 'text-white bg-red-500 dark:bg-red-600',
      hover: 'hover:bg-red-400 dark:hover:bg-red-500',
      focus: 'focus:bg-red-400 dark:focus:bg-red-500',
      active: 'active:bg-red-600 dark:active:bg-red-700',
    },
    orange: {
      base: 'text-white bg-orange-500 dark:bg-orange-600',
      hover: 'hover:bg-orange-400 dark:hover:bg-orange-500',
      focus: 'focus:bg-orange-400 dark:focus:bg-orange-500',
      active: 'active:bg-orange-600 dark:active:bg-orange-700',
    },
    amber: {
      base: 'text-white bg-amber-500 dark:bg-amber-600',
      hover: 'hover:bg-amber-400 dark:hover:bg-amber-500',
      focus: 'focus:bg-amber-400 dark:focus:bg-amber-500',
      active: 'active:bg-amber-600 dark:active:bg-amber-700',
    },
    yellow: {
      base: 'text-white bg-yellow-500 dark:bg-yellow-600',
      hover: 'hover:bg-yellow-400 dark:hover:bg-yellow-500',
      focus: 'focus:bg-yellow-400 dark:focus:bg-yellow-500',
      active: 'active:bg-yellow-600 dark:active:bg-yellow-700',
    },
    lime: {
      base: 'text-white bg-lime-500 dark:bg-lime-600',
      hover: 'hover:bg-lime-400 dark:hover:bg-lime-500',
      focus: 'focus:bg-lime-400 dark:focus:bg-lime-500',
      active: 'active:bg-lime-600 dark:active:bg-lime-700',
    },
    green: {
      base: 'text-white bg-green-500 dark:bg-green-600',
      hover: 'hover:bg-green-400 dark:hover:bg-green-500',
      focus: 'focus:bg-green-400 dark:focus:bg-green-500',
      active: 'active:bg-green-600 dark:active:bg-green-700',
    },
    emerald: {
      base: 'text-white bg-emerald-500 dark:bg-emerald-600',
      hover: 'hover:bg-emerald-400 dark:hover:bg-emerald-500',
      focus: 'focus:bg-emerald-400 dark:focus:bg-emerald-500',
      active: 'active:bg-emerald-600 dark:active:bg-emerald-700',
    },
    teal: {
      base: 'text-white bg-teal-500 dark:bg-teal-600',
      hover: 'hover:bg-teal-400 dark:hover:bg-teal-500',
      focus: 'focus:bg-teal-400 dark:focus:bg-teal-500',
      active: 'active:bg-teal-600 dark:active:bg-teal-700',
    },
    cyan: {
      base: 'text-white bg-cyan-500 dark:bg-cyan-600',
      hover: 'hover:bg-cyan-400 dark:hover:bg-cyan-500',
      focus: 'focus:bg-cyan-400 dark:focus:bg-cyan-500',
      active: 'active:bg-cyan-600 dark:active:bg-cyan-700',
    },
    sky: {
      base: 'text-white bg-sky-500 dark:bg-sky-600',
      hover: 'hover:bg-sky-400 dark:hover:bg-sky-500',
      focus: 'focus:bg-sky-400 dark:focus:bg-sky-500',
      active: 'active:bg-sky-600 dark:active:bg-sky-700',
    },
    blue: {
      base: 'text-white bg-blue-500 dark:bg-blue-600',
      hover: 'hover:bg-blue-400 dark:hover:bg-blue-500',
      focus: 'focus:bg-blue-400 dark:focus:bg-blue-500',
      active: 'active:bg-blue-600 dark:active:bg-blue-700',
    },
    indigo: {
      base: 'text-white bg-indigo-500 dark:bg-indigo-600',
      hover: 'hover:bg-indigo-400 dark:hover:bg-indigo-500',
      focus: 'focus:bg-indigo-400 dark:focus:bg-indigo-500',
      active: 'active:bg-indigo-600 dark:active:bg-indigo-700',
    },
    violet: {
      base: 'text-white bg-violet-500 dark:bg-violet-600',
      hover: 'hover:bg-violet-400 dark:hover:bg-violet-500',
      focus: 'focus:bg-violet-400 dark:focus:bg-violet-500',
      active: 'active:bg-violet-600 dark:active:bg-violet-700',
    },
    fuchsia: {
      base: 'text-white bg-fuchsia-500 dark:bg-fuchsia-600',
      hover: 'hover:bg-fuchsia-400 dark:hover:bg-fuchsia-500',
      focus: 'focus:bg-fuchsia-400 dark:focus:bg-fuchsia-500',
      active: 'active:bg-fuchsia-600 dark:active:bg-fuchsia-700',
    },
    purple: {
      base: 'text-white bg-purple-500 dark:bg-purple-600',
      hover: 'hover:bg-purple-400 dark:hover:bg-purple-500',
      focus: 'focus:bg-purple-400 dark:focus:bg-purple-500',
      active: 'active:bg-purple-600 dark:active:bg-purple-700',
    },
    pink: {
      base: 'text-white bg-pink-500 dark:bg-pink-600',
      hover: 'hover:bg-pink-400 dark:hover:bg-pink-500',
      focus: 'focus:bg-pink-400 dark:focus:bg-pink-500',
      active: 'active:bg-pink-600 dark:active:bg-pink-700',
    },
    rose: {
      base: 'text-white bg-rose-500 dark:bg-rose-600',
      hover: 'hover:bg-rose-400 dark:hover:bg-rose-500',
      focus: 'focus:bg-rose-400 dark:focus:bg-rose-500',
      active: 'active:bg-rose-600 dark:active:bg-rose-700',
    },
  },
  outlined: {
    slate: {
      base: 'border-2 dark:border-slate-600',
      hover: 'hover:bg-slate-200 dark:hover:bg-slate-600',
      focus: 'focus:bg-slate-200 dark:focus:bg-slate-600',
      active:
        'active:bg-slate-300 active:border-slate-300 dark:active:bg-slate-700 dark:active:border-slate-700',
    },
    gray: {
      base: 'border-2 border-gray-500 text-gray-600 dark:border-gray-600 dark:text-gray-500',
      hover: 'hover:text-white hover:bg-gray-500 dark:hover:text-white dark:hover:bg-gray-600',
      focus: 'focus:text-white focus:bg-gray-500 dark:focus:text-white dark:focus:bg-gray-600',
      active:
        'active:bg-gray-600 active:border-gray-600 dark:active:bg-gray-700 dark:active:border-gray-700',
    },
    zinc: {
      base: 'border-2 border-zinc-500 text-zinc-600 dark:border-zinc-600 dark:text-zinc-500',
      hover: 'hover:text-white hover:bg-zinc-500 dark:hover:text-white dark:hover:bg-zinc-600',
      focus: 'focus:text-white focus:bg-zinc-500 dark:focus:text-white dark:focus:bg-zinc-600',
      active:
        'active:bg-zinc-600 active:border-zinc-600 dark:active:bg-zinc-700 dark:active:border-zinc-700',
    },
    neutral: {
      base: 'border-2 border-neutral-500 text-neutral-600 dark:border-neutral-600 dark:text-neutral-500',
      hover:
        'hover:text-white hover:bg-neutral-500 dark:hover:text-white dark:hover:bg-neutral-600',
      focus:
        'focus:text-white focus:bg-neutral-500 dark:focus:text-white dark:focus:bg-neutral-600',
      active:
        'active:bg-neutral-600 active:border-neutral-600 dark:active:bg-neutral-700 dark:active:border-neutral-700',
    },
    stone: {
      base: 'border-2 border-stone-500 text-stone-600 dark:border-stone-600 dark:text-stone-500',
      hover: 'hover:text-white hover:bg-stone-500 dark:hover:text-white dark:hover:bg-stone-600',
      focus: 'focus:text-white focus:bg-stone-500 dark:focus:text-white dark:focus:bg-stone-600',
      active:
        'active:bg-stone-600 active:border-stone-600 dark:active:bg-stone-700 dark:active:border-stone-700',
    },
    red: {
      base: 'border-2 border-red-500 text-red-600 dark:border-red-600 dark:text-red-500',
      hover: 'hover:text-white hover:bg-red-500 dark:hover:text-white dark:hover:bg-red-600',
      focus: 'focus:text-white focus:bg-red-500 dark:focus:text-white dark:focus:bg-red-600',
      active:
        'active:bg-red-600 active:border-red-600 dark:active:bg-red-700 dark:active:border-red-700',
    },
    orange: {
      base: 'border-2 border-orange-500 text-orange-600 dark:border-orange-600 dark:text-orange-500',
      hover: 'hover:text-white hover:bg-orange-500 dark:hover:text-white dark:hover:bg-orange-600',
      focus: 'focus:text-white focus:bg-orange-500 dark:focus:text-white dark:focus:bg-orange-600',
      active:
        'active:bg-orange-600 active:border-orange-600 dark:active:bg-orange-700 dark:active:border-orange-700',
    },
    amber: {
      base: 'border-2 border-amber-500 text-amber-600 dark:border-amber-600 dark:text-amber-500',
      hover: 'hover:text-white hover:bg-amber-500 dark:hover:text-white dark:hover:bg-amber-600',
      focus: 'focus:text-white focus:bg-amber-500 dark:focus:text-white dark:focus:bg-amber-600',
      active:
        'active:bg-amber-600 active:border-amber-600 dark:active:bg-amber-700 dark:active:border-amber-700',
    },
    yellow: {
      base: 'border-2 border-yellow-500 text-yellow-600 dark:border-yellow-600 dark:text-yellow-500',
      hover: 'hover:text-white hover:bg-yellow-500 dark:hover:text-white dark:hover:bg-yellow-600',
      focus: 'focus:text-white focus:bg-yellow-500 dark:focus:text-white dark:focus:bg-yellow-600',
      active:
        'active:bg-yellow-600 active:border-yellow-600 dark:active:bg-yellow-700 dark:active:border-yellow-700',
    },
    lime: {
      base: 'border-2 border-lime-500 text-lime-600 dark:border-lime-600 dark:text-lime-500',
      hover: 'hover:text-white hover:bg-lime-500 dark:hover:text-white dark:hover:bg-lime-600',
      focus: 'focus:text-white focus:bg-lime-500 dark:focus:text-white dark:focus:bg-lime-600',
      active:
        'active:bg-lime-600 active:border-lime-600 dark:active:bg-lime-700 dark:active:border-lime-700',
    },
    green: {
      base: 'border-2 border-green-500 text-green-600 dark:border-green-600 dark:text-green-500',
      hover: 'hover:text-white hover:bg-green-500 dark:hover:text-white dark:hover:bg-green-600',
      focus: 'focus:text-white focus:bg-green-500 dark:focus:text-white dark:focus:bg-green-600',
      active:
        'active:bg-green-600 active:border-green-600 dark:active:bg-green-700 dark:active:border-green-700',
    },
    emerald: {
      base: 'border-2 border-emerald-500 text-emerald-600 dark:border-emerald-600 dark:text-emerald-500',
      hover:
        'hover:text-white hover:bg-emerald-500 dark:hover:text-white dark:hover:bg-emerald-600',
      focus:
        'focus:text-white focus:bg-emerald-500 dark:focus:text-white dark:focus:bg-emerald-600',
      active:
        'active:bg-emerald-600 active:border-emerald-600 dark:active:bg-emerald-700 dark:active:border-emerald-700',
    },
    teal: {
      base: 'border-2 border-teal-500 text-teal-600 dark:border-teal-600 dark:text-teal-500',
      hover: 'hover:text-white hover:bg-teal-500 dark:hover:text-white dark:hover:bg-teal-600',
      focus: 'focus:text-white focus:bg-teal-500 dark:focus:text-white dark:focus:bg-teal-600',
      active:
        'active:bg-teal-600 active:border-teal-600 dark:active:bg-teal-700 dark:active:border-teal-700',
    },
    cyan: {
      base: 'border-2 border-cyan-500 text-cyan-600 dark:border-cyan-600 dark:text-cyan-500',
      hover: 'hover:text-white hover:bg-cyan-500 dark:hover:text-white dark:hover:bg-cyan-600',
      focus: 'focus:text-white focus:bg-cyan-500 dark:focus:text-white dark:focus:bg-cyan-600',
      active:
        'active:bg-cyan-600 active:border-cyan-600 dark:active:bg-cyan-700 dark:active:border-cyan-700',
    },
    sky: {
      base: 'border-2 border-sky-500 text-sky-600 dark:border-sky-600 dark:text-sky-500',
      hover: 'hover:text-white hover:bg-sky-500 dark:hover:text-white dark:hover:bg-sky-600',
      focus: 'focus:text-white focus:bg-sky-500 dark:focus:text-white dark:focus:bg-sky-600',
      active:
        'active:bg-sky-600 active:border-sky-600 dark:active:bg-sky-700 dark:active:border-sky-700',
    },
    blue: {
      base: 'border-2 border-blue-500 text-blue-600 dark:border-blue-600 dark:text-blue-500',
      hover: 'hover:text-white hover:bg-blue-500 dark:hover:text-white dark:hover:bg-blue-600',
      focus: 'focus:text-white focus:bg-blue-500 dark:focus:text-white dark:focus:bg-blue-600',
      active:
        'active:bg-blue-600 active:border-blue-600 dark:active:bg-blue-700 dark:active:border-blue-700',
    },
    indigo: {
      base: 'border-2 border-indigo-500 text-indigo-600 dark:border-indigo-600 dark:text-indigo-500',
      hover: 'hover:text-white hover:bg-indigo-500 dark:hover:text-white dark:hover:bg-indigo-600',
      focus: 'focus:text-white focus:bg-indigo-500 dark:focus:text-white dark:focus:bg-indigo-600',
      active:
        'active:bg-indigo-600 active:border-indigo-600 dark:active:bg-indigo-700 dark:active:border-indigo-700',
    },
    violet: {
      base: 'border-2 border-violet-500 text-violet-600 dark:border-violet-600 dark:text-violet-500',
      hover: 'hover:text-white hover:bg-violet-500 dark:hover:text-white dark:hover:bg-violet-600',
      focus: 'focus:text-white focus:bg-violet-500 dark:focus:text-white dark:focus:bg-violet-600',
      active:
        'active:bg-violet-600 active:border-violet-600 dark:active:bg-violet-700 dark:active:border-violet-700',
    },
    fuchsia: {
      base: 'border-2 border-fuchsia-500 text-fuchsia-600 dark:border-fuchsia-600 dark:text-fuchsia-500',
      hover:
        'hover:text-white hover:bg-fuchsia-500 dark:hover:text-white dark:hover:bg-fuchsia-600',
      focus:
        'focus:text-white focus:bg-fuchsia-500 dark:focus:text-white dark:focus:bg-fuchsia-600',
      active:
        'active:bg-fuchsia-600 active:border-fuchsia-600 dark:active:bg-fuchsia-700 dark:active:border-fuchsia-700',
    },
    purple: {
      base: 'border-2 border-purple-500 text-purple-600 dark:border-purple-600 dark:text-purple-500',
      hover: 'hover:text-white hover:bg-purple-500 dark:hover:text-white dark:hover:bg-purple-600',
      focus: 'focus:text-white focus:bg-purple-500 dark:focus:text-white dark:focus:bg-purple-600',
      active:
        'active:bg-purple-600 active:border-purple-600 dark:active:bg-purple-700 dark:active:border-purple-700',
    },
    pink: {
      base: 'border-2 border-pink-500 text-pink-600 dark:border-pink-600 dark:text-pink-500',
      hover: 'hover:text-white hover:bg-pink-500 dark:hover:text-white dark:hover:bg-pink-600',
      focus: 'focus:text-white focus:bg-pink-500 dark:focus:text-white dark:focus:bg-pink-600',
      active:
        'active:bg-pink-600 active:border-pink-600 dark:active:bg-pink-700 dark:active:border-pink-700',
    },
    rose: {
      base: 'border-2 border-rose-500 text-rose-600 dark:border-rose-600 dark:text-rose-500',
      hover: 'hover:text-white hover:bg-rose-500 dark:hover:text-white dark:hover:bg-rose-600',
      focus: 'focus:text-white focus:bg-rose-500 dark:focus:text-white dark:focus:bg-rose-600',
      active:
        'active:bg-rose-600 active:border-rose-600 dark:active:bg-rose-700 dark:active:border-rose-700',
    },
  },
  text: {
    slate: {
      base: 'bg-transparent',
      hover: 'hover:bg-slate-200 dark:hover:bg-slate-700',
      focus: 'focus:bg-slate-200 dark:focus:bg-slate-700',
      active: 'active:bg-slate-300 dark:active:bg-slate-800',
    },
    gray: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-gray-500 dark:hover:bg-gray-600',
      focus: 'focus:text-white focus:bg-gray-500 dark:focus:bg-gray-600',
      active: 'active:bg-gray-600 dark:active:bg-gray-700',
    },
    zinc: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-zinc-500 dark:hover:bg-zinc-600',
      focus: 'focus:text-white focus:bg-zinc-500 dark:focus:bg-zinc-600',
      active: 'active:bg-zinc-600 dark:active:bg-zinc-700',
    },
    neutral: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-neutral-500 dark:hover:bg-neutral-600',
      focus: 'focus:text-white focus:bg-neutral-500 dark:focus:bg-neutral-600',
      active: 'active:bg-neutral-600 dark:active:bg-neutral-700',
    },
    stone: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-stone-500 dark:hover:bg-stone-600',
      focus: 'focus:text-white focus:bg-stone-500 dark:focus:bg-stone-600',
      active: 'active:bg-stone-600 dark:active:bg-stone-700',
    },
    red: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-red-500 dark:hover:bg-red-600',
      focus: 'focus:text-white focus:bg-red-500 dark:focus:bg-red-600',
      active: 'active:bg-red-600 dark:active:bg-red-700',
    },
    orange: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-orange-500 dark:hover:bg-orange-600',
      focus: 'focus:text-white focus:bg-orange-500 dark:focus:bg-orange-600',
      active: 'active:bg-orange-600 dark:active:bg-orange-700',
    },
    amber: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-amber-500 dark:hover:bg-amber-600',
      focus: 'focus:text-white focus:bg-amber-500 dark:focus:bg-amber-600',
      active: 'active:bg-amber-600 dark:active:bg-amber-700',
    },
    yellow: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-yellow-500 dark:hover:bg-yellow-600',
      focus: 'focus:text-white focus:bg-yellow-500 dark:focus:bg-yellow-600',
      active: 'active:bg-yellow-600 dark:active:bg-yellow-700',
    },
    lime: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-lime-500 dark:hover:bg-lime-600',
      focus: 'focus:text-white focus:bg-lime-500 dark:focus:bg-lime-600',
      active: 'active:bg-lime-600 dark:active:bg-lime-700',
    },
    green: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-green-500 dark:hover:bg-green-600',
      focus: 'focus:text-white focus:bg-green-500 dark:focus:bg-green-600',
      active: 'active:bg-green-600 dark:active:bg-green-700',
    },
    emerald: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-emerald-500 dark:hover:bg-emerald-600',
      focus: 'focus:text-white focus:bg-emerald-500 dark:focus:bg-emerald-600',
      active: 'active:bg-emerald-600 dark:active:bg-emerald-700',
    },
    teal: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-teal-500 dark:hover:bg-teal-600',
      focus: 'focus:text-white focus:bg-teal-500 dark:focus:bg-teal-600',
      active: 'active:bg-teal-600 dark:active:bg-teal-700',
    },
    cyan: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-cyan-500 dark:hover:bg-cyan-600',
      focus: 'focus:text-white focus:bg-cyan-500 dark:focus:bg-cyan-600',
      active: 'active:bg-cyan-600 dark:active:bg-cyan-700',
    },
    sky: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-sky-500 dark:hover:bg-sky-600',
      focus: 'focus:text-white focus:bg-sky-500 dark:focus:bg-sky-600',
      active: 'active:bg-sky-600 dark:active:bg-sky-700',
    },
    blue: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-blue-500 dark:hover:bg-blue-600',
      focus: 'focus:text-white focus:bg-blue-500 dark:focus:bg-blue-600',
      active: 'active:bg-blue-600 dark:active:bg-blue-700',
    },
    indigo: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-indigo-500 dark:hover:bg-indigo-600',
      focus: 'focus:text-white focus:bg-indigo-500 dark:focus:bg-indigo-600',
      active: 'active:bg-indigo-600 dark:active:bg-indigo-700',
    },
    violet: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-violet-500 dark:hover:bg-violet-600',
      focus: 'focus:text-white focus:bg-violet-500 dark:focus:bg-violet-600',
      active: 'active:bg-violet-600 dark:active:bg-violet-700',
    },
    fuchsia: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-fuchsia-500 dark:hover:bg-fuchsia-600',
      focus: 'focus:text-white focus:bg-fuchsia-500 dark:focus:bg-fuchsia-600',
      active: 'active:bg-fuchsia-600 dark:active:bg-fuchsia-700',
    },
    purple: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-purple-500 dark:hover:bg-purple-600',
      focus: 'focus:text-white focus:bg-purple-500 dark:focus:bg-purple-600',
      active: 'active:bg-purple-600 dark:active:bg-purple-700',
    },
    pink: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-pink-500 dark:hover:bg-pink-600',
      focus: 'focus:text-white focus:bg-pink-500 dark:focus:bg-pink-600',
      active: 'active:bg-pink-600 dark:active:bg-pink-700',
    },
    rose: {
      base: 'bg-transparent',
      hover: 'hover:text-white hover:bg-rose-500 dark:hover:bg-rose-600',
      focus: 'focus:text-white focus:bg-rose-500 dark:focus:bg-rose-600',
      active: 'active:bg-rose-600 dark:active:bg-rose-700',
    },
  },
};

const sizeClassNames: Record<
  Size,
  {
    base: string;
    withChildren: string;
    icon: { base: string; withChildren: string };
  }
> = {
  small: {
    base: 'gap-1 text-sm h-6',
    withChildren: 'px-1.5',
    icon: {
      base: 'h-3 w-3',
      withChildren: 'h-2 w-2',
    },
  },
  medium: {
    base: 'gap-1.5 text-base h-9',
    withChildren: 'px-2',
    icon: {
      base: 'h-4 w-4',
      withChildren: 'h-3 w-3',
    },
  },
};

export type ButtonProps = PropsWithoutRef<ComponentProps<'button'>> & {
  size?: Size;
  color?: Color;
  variant?: ButtonVariant;
  rounded?: boolean;
  prefixIcon?: LucideIcon;
  suffixIcon?: LucideIcon;
  unstyled?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      size = 'medium',
      color = 'slate',
      variant = 'filled',
      rounded,
      prefixIcon: PrefixIcon,
      suffixIcon: SuffixIcon,
      unstyled,
      ...props
    },
    ref,
  ) => (
    <button
      className={cn(
        'relative flex aspect-square items-center font-medium duration-200',
        sizeClassNames[size].base,
        variantClassNames[variant][color].base,
        rounded ? 'rounded-full' : 'rounded-md',
        props.disabled
          ? 'cursor-not-allowed opacity-50'
          : !unstyled
            ? `${variantClassNames[variant][color].hover} ${variantClassNames[variant][color].focus} ${variantClassNames[variant][color].active}`
            : 'cursor-default',
        children ? `${sizeClassNames[size].withChildren} aspect-[initial]` : 'justify-center',
        className,
      )}
      type="button"
      {...props}
      ref={ref}
    >
      {PrefixIcon && (
        <PrefixIcon
          className={
            children ? sizeClassNames[size].icon.withChildren : sizeClassNames[size].icon.base
          }
        />
      )}
      {children}
      {SuffixIcon && (
        <SuffixIcon
          className={
            children ? sizeClassNames[size].icon.withChildren : sizeClassNames[size].icon.base
          }
        />
      )}
    </button>
  ),
);
