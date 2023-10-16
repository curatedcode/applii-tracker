"use client";

import {
  ChartPieIcon as ChartPieIconOutline,
  HomeIcon as HomeIconOutline,
  PlusCircleIcon as PlusCircleIconOutline,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  ChartPieIcon as ChartPieIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-light-secondary dark:border-dark-secondary mb-6 flex h-20 items-center justify-center border-b">
      <ul className="flex gap-8 text-lg font-medium">
        <li>
          <Link
            href={"/"}
            className="flex items-center gap-1 transition-opacity hover:opacity-80"
          >
            {pathname === "/" ? (
              <HomeIconSolid className="w-6" />
            ) : (
              <HomeIconOutline className="w-6" />
            )}
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/applications/create"}
            className="flex items-center gap-1 transition-opacity hover:opacity-80"
          >
            {pathname === "/applications/create" ? (
              <PlusCircleIconSolid className="w-6" />
            ) : (
              <PlusCircleIconOutline className="w-6" />
            )}
            <span>Create</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/applications/metrics"}
            className="flex items-center gap-1 transition-opacity hover:opacity-80"
          >
            {pathname === "/applications/metrics" ? (
              <ChartPieIconSolid className="w-6" />
            ) : (
              <ChartPieIconOutline className="w-6" />
            )}
            <span>Metrics</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
