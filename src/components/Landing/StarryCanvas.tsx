"use client";

import { useCallback, useEffect, useState } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function StarryCanvas() {
	const particlesId = "particlesBG";

	const [prefersDarkScheme, setPrefersDarkScheme] = useState(false);

	const particlesInit = useCallback(async (engine: Engine) => {
		await loadSlim(engine);
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

	// no way to reinitialize particles after creation

	if (prefersDarkScheme) {
		return (
			<Particles
				id={particlesId}
				init={particlesInit}
				style={{ position: "fixed" }}
				className="pointer-events-none fixed z-[-1] h-full w-full"
				options={{
					detectRetina: true,
					fpsLimit: 30,
					interactivity: {
						detectsOn: "canvas",
						events: {
							resize: true,
						},
					},
					particles: {
						color: {
							value: "#fcfdfd",
						},
						number: {
							density: {
								enable: true,
								area: 1080,
							},
							limit: 0,
							value: 200,
						},
						opacity: {
							animation: {
								enable: true,
								minimumValue: 0.05,
								speed: 0.25,
								sync: false,
							},
							random: {
								enable: true,
								minimumValue: 0.05,
							},
							value: 1,
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
							random: {
								enable: true,
								minimumValue: 0.5,
							},
							value: 1,
						},
					},
				}}
			/>
		);
	}

	return (
		<Particles
			id={particlesId}
			init={particlesInit}
			style={{ position: "fixed" }}
			className="pointer-events-none fixed z-[-1] h-full w-full"
			options={{
				detectRetina: true,
				fpsLimit: 30,
				interactivity: {
					detectsOn: "canvas",
					events: {
						resize: true,
					},
				},
				particles: {
					color: {
						value: "#262626",
					},
					number: {
						density: {
							enable: true,
							area: 1080,
						},
						limit: 0,
						value: 200,
					},
					opacity: {
						animation: {
							enable: true,
							minimumValue: 0.05,
							speed: 0.25,
							sync: false,
						},
						random: {
							enable: true,
							minimumValue: 0.05,
						},
						value: 1,
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
						random: {
							enable: true,
							minimumValue: 0.5,
						},
						value: 1,
					},
				},
			}}
		/>
	);
}
