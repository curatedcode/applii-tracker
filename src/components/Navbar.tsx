"use client";

import {
  ChartPieIcon as ChartPieIconOutline,
  Cog8ToothIcon as Cog8ToothIconOutline,
  HomeIcon as HomeIconOutline,
  PlusCircleIcon as PlusCircleIconOutline,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  ChartPieIcon as ChartPieIconSolid,
  Cog8ToothIcon as Cog8ToothIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="relative mb-6 hidden h-20 items-center justify-center border-b border-light-secondary dark:border-dark-secondary xs:flex">
      <ul className="flex h-full items-center justify-center text-lg font-medium">
        <li>
          <Link
            href={"/"}
            className="mr-4 flex items-center gap-1 transition-opacity hover:opacity-80"
            title="Home"
          >
            {pathname === "/" ? (
              <HomeIconSolid className="w-6" aria-hidden="true" />
            ) : (
              <HomeIconOutline className="w-6" aria-hidden="true" />
            )}
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/applications/create"}
            className="mr-4 flex items-center gap-1 transition-opacity hover:opacity-80"
            title="Create"
          >
            {pathname === "/applications/create" ? (
              <PlusCircleIconSolid className="w-6" aria-hidden="true" />
            ) : (
              <PlusCircleIconOutline className="w-6" aria-hidden="true" />
            )}
            <span>Create</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/applications/metrics"}
            className="flex items-center gap-1 transition-opacity hover:opacity-80"
            title="Metrics"
          >
            {pathname === "/applications/metrics" ? (
              <ChartPieIconSolid className="w-6" aria-hidden="true" />
            ) : (
              <ChartPieIconOutline className="w-6" aria-hidden="true" />
            )}
            <span>Metrics</span>
          </Link>
        </li>
        <li className="absolute right-4 mt-[3px]">
          <Link
            href={"/settings"}
            className="flex items-center gap-1 transition-opacity hover:opacity-80"
            title="Settings"
          >
            {pathname === "/settings" ? (
              <Cog8ToothIconSolid className="w-6" aria-hidden="true" />
            ) : (
              <Cog8ToothIconOutline className="w-6" aria-hidden="true" />
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
