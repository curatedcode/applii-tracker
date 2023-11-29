"use client";

/* eslint-disable @next/next/no-img-element */
import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { NavbarProps } from "../utils/customVariables";
import Link from "next/link";
import useRelativeURL from "./Hooks/useRelativeURL";

export default function Navbar({ items }: NavbarProps) {
  const relativeURL = useRelativeURL();

  const [navItems, setNavItems] = useState(() =>
    items.map((item) => {
      if (relativeURL === item.href) {
        return { ...item, current: true };
      }

      return { ...item, current: false };
    }),
  );

  function setCurrentItem(href: string) {
    const newNavItems = navItems.map((item) => {
      if (item.href === href) {
        return { ...item, current: true };
      }

      return { ...item, current: false };
    });
    setNavItems(newNavItems);
  }

  return (
    <Disclosure as="nav" className="mb-8 sm:mb-12">
      {({ open }) => (
        <>
          <div>
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-0.5 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link
                  className="flex flex-shrink-0 items-center"
                  tabIndex={-1}
                  href="/"
                >
                  <img
                    className="h-8 w-auto"
                    src="/media/applii-logo.svg"
                    alt="Applii logo"
                  />
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors duration-100 hover:border-b-light-tertiary dark:hover:border-b-dark-tertiary ${
                          item.current
                            ? "border-b-light-tertiary dark:border-b-dark-tertiary"
                            : "border-b-transparent"
                        }`}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        onClick={() => setCurrentItem(item.href)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-80"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-80"
            >
              <div className="grid space-y-1 px-2 pb-3 pt-2">
                {navItems.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={`border-l-2 bg-opacity-20 px-3 py-2 text-sm font-medium transition-colors duration-100 hover:cursor-pointer hover:border-l-inherit hover:bg-light-secondary hover:dark:bg-dark-secondary ${
                      item.current
                        ? "border-l-inherit bg-light-secondary bg-opacity-20 dark:bg-dark-secondary"
                        : "border-l-transparent"
                    }`}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Transition>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
