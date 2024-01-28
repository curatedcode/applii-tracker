"use client";

import { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState } from "react";

export default function StarryCanvas() {
	const [prefersDarkScheme, setPrefersDarkScheme] = useState(false);
	const [init, setInit] = useState(false);

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadSlim(engine);
		}).then(() => setInit(true));
	}, []);

	useEffect(() => {
		const darkSchemeMediaMatch = window.matchMedia(
			"(prefers-color-scheme: dark)",
		);
		setPrefersDarkScheme(darkSchemeMediaMatch.matches);

		function updatePrefersDarkScheme(e: MediaQueryListEvent) {
			setPrefersDarkScheme(e.matches);
		}

		darkSchemeMediaMatch.addEventListener("change", updatePrefersDarkScheme);

		return () =>
			darkSchemeMediaMatch.removeEventListener(
				"change",
				updatePrefersDarkScheme,
			);
	}, []);

	const options: ISourceOptions = useMemo(
		() => ({
			detectRetina: true,
			fpsLimit: 30,
			interactivity: {
				detectsOn: "canvas",
				events: {
					resize: { enable: true },
				},
			},
			particles: {
				color: {
					value: prefersDarkScheme ? "#fcfdfd" : "#262626",
				},
				number: {
					density: {
						enable: true,
						height: 1080,
						width: 1920,
					},

					limit: { mode: "delete", value: 0 },
					value: 200,
				},
				opacity: {
					animation: {
						enable: true,
						startValue: "min",
						speed: 0.25,
						sync: false,
						mode: "random",
					},
					value: prefersDarkScheme ? 0.2 : 0.3,
				},
				move: {
					direction: "bottom",
					enable: true,
					speed: 0.05,
					straight: true,
				},
				shape: {
					type: "circle",
				},
				size: {
					animation: {
						mode: "random",
						startValue: "min",
						enable: true,
					},
					value: 1,
				},
			},
		}),
		[prefersDarkScheme],
	);

	if (init)
		return (
			<Particles
				id="particlesBG"
				className="pointer-events-none fixed z-[-1] h-full w-full"
				options={options}
			/>
		);

	return <></>;
}
