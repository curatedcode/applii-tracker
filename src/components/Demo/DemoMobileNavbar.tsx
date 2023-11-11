"use client";

import { FocusTrap, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChartPieIcon as ChartPieIconOutline,
  HomeIcon as HomeIconOutline,
  PlusCircleIcon as PlusCircleIconOutline,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  ChartPieIcon as ChartPieIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DemoMobileNavbar() {
  const pathname = usePathname();

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const root = document.getElementById("root-body");
    if (!root) return;

    showMenu
      ? (root.style.overflow = "hidden")
      : (root.style.overflow = "auto");
  }, [showMenu]);

  return (
    <div className="mb-6 flex h-20 items-center border-b border-light-secondary dark:border-dark-secondary xs:hidden">
      <button onClick={() => setShowMenu(true)} title="Open navigation menu">
        <Bars3Icon className="w-6" aria-hidden="true" />
      </button>
      <span className="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold">
        Applii
      </span>
      <Transition
        show={showMenu}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <FocusTrap>
          <nav className="fixed left-0 top-0 z-50 grid h-screen w-full auto-rows-min gap-4 divide-y divide-light-secondary-shaded bg-light-secondary px-4 py-7 text-lg font-medium dark:divide-dark-secondary-shaded dark:bg-dark-secondary">
            <button
              onClick={() => setShowMenu(false)}
              title="Close navigation menu"
              className="w-fit"
            >
              <XMarkIcon className="w-6" aria-hidden="true" />
            </button>
            <ul className="grid gap-6 pt-4">
              <li>
                <Link
                  href={"/demo"}
                  className="flex items-center gap-3 transition-opacity hover:opacity-80"
                  title="Home"
                  onClick={() => setShowMenu(false)}
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
                  className="flex items-center gap-3 transition-opacity hover:opacity-80"
                  title="Create"
                  onClick={() => setShowMenu(false)}
                >
                  {pathname === "/demo/applications/create" ? (
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
                  className="flex items-center gap-3 transition-opacity hover:opacity-80"
                  title="Metrics"
                  onClick={() => setShowMenu(false)}
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
        </FocusTrap>
      </Transition>
    </div>
  );
}
