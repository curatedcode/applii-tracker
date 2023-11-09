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

export default function DemoNavbar() {
  const pathname = usePathname();

  return (
    <nav className="relative mb-6 hidden h-20 items-center justify-center border-b border-light-secondary dark:border-dark-secondary xs:flex">
      <ul className="flex h-full items-center justify-center text-lg font-medium">
        <li>
          <Link
            href={"/demo"}
            className="mr-4 flex items-center gap-1 transition-opacity hover:opacity-80"
            title="Home"
          >
            {pathname === "/demo" ? (
              <HomeIconSolid className="w-6" aria-hidden="true" />
            ) : (
              <HomeIconOutline className="w-6" aria-hidden="true" />
            )}
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/demo/applications/create"}
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
            href={"/demo/applications/metrics"}
            className="flex items-center gap-1 transition-opacity hover:opacity-80"
            title="Metrics"
          >
            {pathname === "/demo/applications/metrics" ? (
              <ChartPieIconSolid className="w-6" aria-hidden="true" />
            ) : (
              <ChartPieIconOutline className="w-6" aria-hidden="true" />
            )}
            <span>Metrics</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
