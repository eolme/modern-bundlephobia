"use client";

import { IconAppearanceProvider } from "@vkontakte/icons-sprite";
import type { AdaptivityProps } from "@vkontakte/vkui/dist/cssm/components/AdaptivityProvider/AdaptivityContext";
import { AdaptivityContext } from "@vkontakte/vkui/dist/cssm/components/AdaptivityProvider/AdaptivityContext";
import type { AppRootContextInterface } from "@vkontakte/vkui/dist/cssm/components/AppRoot/AppRootContext";
import { AppRootContext } from "@vkontakte/vkui/dist/cssm/components/AppRoot/AppRootContext";
import type { ConfigProviderContextInterface } from "@vkontakte/vkui/dist/cssm/components/ConfigProvider/ConfigProviderContext";

import { ConfigProviderContext } from "@vkontakte/vkui/dist/cssm/components/ConfigProvider/ConfigProviderContext";
import { useKeyboardInputTracker } from "@vkontakte/vkui/dist/cssm/hooks/useKeyboardInputTracker";
import {
	SizeType,
	ViewHeight,
	ViewWidth,
} from "@vkontakte/vkui/dist/cssm/lib/adaptivity";
import type { ColorSchemeType } from "@vkontakte/vkui/dist/cssm/lib/colorScheme";
import { useRenderEffect } from "ahks";
import { constDeps } from "ahks/utils";
import type { FC, ReactNode } from "react";
import { useInsertionEffect, useMemo, useState } from "react";

import { safeDocument, safeWindow } from "#/utils/dom";
import { once } from "#/utils/fn";

const AppearanceLight = "light";
const AppearanceDark = "dark";

const mediaAppereance = once(() =>
	safeWindow.matchMedia("(prefers-color-scheme: dark)"),
);

const mediaAppereanceCurrent = () =>
	mediaAppereance().matches ? AppearanceDark : AppearanceLight;

const mediaAppereanceApply = () =>
	safeDocument.body.classList[
		mediaAppereanceCurrent() === AppearanceDark ? "add" : "remove"
	]("vkui--vkBase--dark");

const MetaThemeLight = "#fff";
const MetaThemeDark = "#19191a";

const metaThemeCurrent = () =>
	mediaAppereance().matches ? MetaThemeDark : MetaThemeLight;

const metaThemeApply = () =>
	safeDocument
		.getElementsByName("theme-color")
		.forEach((element) => element.setAttribute("content", metaThemeCurrent()));

type ClientConfigProps = {
	root: string;
	portal: string;
	children: ReactNode;
};

export const ClientConfig: FC<ClientConfigProps> = ({
	root,
	portal,
	children,
}) => {
	const [appearance, setApperance] = useState<ColorSchemeType>(
		mediaAppereanceCurrent,
	);

	useInsertionEffect(mediaAppereanceApply, [appearance]);
	useInsertionEffect(metaThemeApply, [appearance]);

	useRenderEffect(() => {
		mediaAppereance().onchange = () => setApperance(mediaAppereanceCurrent);
	});

	useRenderEffect(() => {
		safeDocument.ondragstart = (event) => {
			if (event.cancelable) {
				event.preventDefault();
			}

			return false;
		};

		if (safeWindow.navigator.virtualKeyboard) {
			safeWindow.navigator.virtualKeyboard.overlaysContent = true;
		}
	});

	const ConfigProviderValue = useMemo<ConfigProviderContextInterface>(
		() => ({
			locale: "en",
			colorScheme: appearance,
			platform: "android",
			isWebView: false,
			transitionMotionEnabled: false,
			hasCustomPanelHeaderAfter: false,
			customPanelHeaderAfterMinWidth: 0,
			direction: "ltr",
			tokensClassNames: {},
		}),
		[appearance],
	);

	const AdaptivityProviderValue = useMemo<AdaptivityProps>(
		() => ({
			sizeX: SizeType.REGULAR,
			sizeY: SizeType.REGULAR,
			viewWidth: ViewWidth.DESKTOP,
			viewHeight: ViewHeight.MEDIUM,
		}),
		constDeps,
	);

	const keyboardInputRef = useKeyboardInputTracker();

	const AppRootValue = useMemo<AppRootContextInterface>(
		() => ({
			appRoot: {
				get current() {
					return safeDocument.getElementById(root) as HTMLDivElement;
				},
			},
			get portalRoot() {
				return safeDocument.getElementById(portal);
			},
			disablePortal: false,
			get keyboardInput() {
				return keyboardInputRef.current;
			},
			mode: "full",
			embedded: false,
			layout: "plain",
			userSelectMode: "enabled",
		}),
		constDeps,
	);

	return (
		<ConfigProviderContext.Provider value={ConfigProviderValue}>
			<IconAppearanceProvider value={appearance}>
				<AdaptivityContext.Provider value={AdaptivityProviderValue}>
					<AppRootContext.Provider value={AppRootValue}>
						{children}
					</AppRootContext.Provider>
				</AdaptivityContext.Provider>
			</IconAppearanceProvider>
		</ConfigProviderContext.Provider>
	);
};
