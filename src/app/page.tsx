/* eslint-disable @next/next/no-img-element */
import ExternalLink from "@/src/components/ExternalLink";
import BoardSection from "@/src/components/Landing/BoardSection";
import FAQAccordion from "@/src/components/Landing/FAQAccordion";
import StarryCanvas from "@/src/components/Landing/StarryCanvas";
import Navbar from "@/src/components/Navbar";
import {
	ChartPieIcon,
	DevicePhoneMobileIcon,
	LockOpenIcon,
	RectangleStackIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { defaultFocusHoverClasses } from "../types/global";
import { needToApplyMocks, offerMocks } from "../types/landing";

export default function Home() {
	return (
		<>
			<Navbar
				items={[
					{ name: "Home", href: "/" },
					{ name: "Features", href: "#features" },
					{ name: "FAQ", href: "#faq" },
					{ name: "Demo", href: "/demo" },
				]}
			/>
			<StarryCanvas />
			<main className="mt-36 flex flex-col lg:mt-24">
				<section
					id="main"
					className="grid min-h-[calc(100vh-12rem)] auto-rows-min gap-4 lg:grid-cols-2"
				>
					<div className="grid auto-rows-min content-center justify-items-center gap-6 lg:-mt-6">
						<h1 className="bg-gradient-to-b from-light-text via-light-text to-transparent bg-clip-text text-6xl font-bold text-transparent dark:from-dark-text dark:via-dark-text sm:text-8xl">
							Applii
						</h1>
						<p className="max-w-sm text-center">
							A local-first app that helps you organize, monitor, and manage
							your job applications.
						</p>
						<div className="grid gap-4 text-sm font-medium">
							<Link
								href="/boards"
								className={`${defaultFocusHoverClasses} gradient-border h-fit min-w-[6rem] animate-shift-gradient-x whitespace-nowrap rounded-md bg-gradient-to-bl from-light-primary via-light-primary to-light-secondary px-5 py-2 text-center font-medium transition-colors hover:bg-none hover:text-black focus-visible:bg-none focus-visible:text-black dark:from-dark-primary dark:via-dark-primary dark:to-dark-secondary`}
							>
								Get started
							</Link>
							<div className="flex items-center gap-4">
								<Link
									href="/demo"
									className={`${defaultFocusHoverClasses} animate-shift-gradient-x rounded-md bg-gradient-to-bl from-light-primary via-light-primary to-light-secondary px-5 py-2 text-center font-medium ring-2 ring-light-secondary dark:from-dark-primary dark:via-dark-primary dark:to-dark-secondary dark:ring-dark-secondary`}
								>
									Demo
								</Link>
								<ExternalLink
									href="https://github.com/curatedcode/applii-tracker"
									className={`${defaultFocusHoverClasses} animate-shift-gradient-x rounded-md bg-gradient-to-bl from-light-primary via-light-primary to-light-secondary px-5 py-2 text-center font-medium ring-2 ring-light-secondary dark:from-dark-primary dark:via-dark-primary dark:to-dark-secondary dark:ring-dark-secondary`}
								>
									Github
								</ExternalLink>
							</div>
						</div>
					</div>
					<div className="hidden lg:block" aria-hidden="true">
						<div className="relative flex rotate-2">
							<BoardSection
								title="Need To Apply"
								cards={needToApplyMocks}
								className="fix-blurry-text animation-delay-1000 min-w-board-section animate-wiggle"
							/>
							<div className="group w-full">
								<BoardSection
									title="Offer"
									cards={offerMocks}
									className="fix-blurry-text absolute -top-3 right-1 z-[-1] animate-wiggle transition-all group-hover:top-0 group-hover:z-[1] group-hover:rotate-2"
								/>
							</div>
						</div>
					</div>
				</section>
				<section id="features">
					<h1 className="sr-only">Features</h1>
					<div className="grid gap-8 sm:auto-rows-fr sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
						<div className="flex animate-shift-gradient-x flex-col gap-2 rounded-md bg-gradient-to-bl from-light-primary to-light-secondary px-4 py-3 ring-2 ring-light-secondary dark:from-dark-primary dark:via-dark-primary dark:to-dark-secondary dark:ring-dark-secondary">
							<h2 className="flex items-center gap-2 text-lg font-semibold">
								<RectangleStackIcon
									className="w-5 text-card-needToApply"
									aria-hidden="true"
								/>
								Organize applications
							</h2>
							<p>
								Keep track of all your job applications in one place. You can
								track everything from the position title, status, and any notes
								for each application.
							</p>
						</div>
						<div className="flex animate-shift-gradient-x flex-col gap-2 rounded-md bg-gradient-to-bl from-light-primary to-light-secondary px-4 py-3 ring-2 ring-light-secondary dark:from-dark-primary dark:via-dark-primary dark:to-dark-secondary dark:ring-dark-secondary">
							<h2 className="flex items-center gap-2 text-lg font-semibold">
								<ChartPieIcon
									className="w-5 text-card-interviewing"
									aria-hidden="true"
								/>
								Monitor your progress
							</h2>
							<p>
								See how far you have come in your job search journey. You can
								view statistics and charts on your application outcomes,
								response rates, and more.
							</p>
						</div>
						<div className="flex animate-shift-gradient-x flex-col gap-2 rounded-md bg-gradient-to-bl from-light-primary to-light-secondary px-4 py-3 ring-2 ring-light-secondary dark:from-dark-primary dark:via-dark-primary dark:to-dark-secondary dark:ring-dark-secondary">
							<h2 className="flex items-center gap-2 text-lg font-semibold">
								<DevicePhoneMobileIcon
									className="w-5 text-card-offer"
									aria-hidden="true"
								/>
								Local-first
							</h2>
							<p>
								All data is saved on your device, not on a server you don’t
								know. You can use the app with no internet and decide when to
								sync with the cloud.
							</p>
						</div>
						<div className="flex animate-shift-gradient-x flex-col gap-2 rounded-md bg-gradient-to-bl from-light-primary to-light-secondary px-4 py-3 ring-2 ring-light-secondary dark:from-dark-primary dark:via-dark-primary dark:to-dark-secondary dark:ring-dark-secondary">
							<h2 className="flex items-center gap-2 text-lg font-semibold">
								<LockOpenIcon
									className="w-5 text-card-applied"
									aria-hidden="true"
								/>
								Open-source
							</h2>
							<p>
								You can verify our transparency and security by accessing the
								source code. If you&apos;d like to contribute to Applii, view
								the repository on{" "}
								<ExternalLink
									href="https://github.com/curatedcode/applii-tracker"
									className="underline underline-offset-1"
								>
									GitHub.
								</ExternalLink>
							</p>
						</div>
					</div>
				</section>
				<section id="faq" className="mt-40">
					<FAQAccordion />
				</section>
			</main>
		</>
	);
}
