import { IconAppearanceProvider } from "@vkontakte/icons-sprite";
import type { AdaptivityProps } from "@vkontakte/vkui/dist/cssm/components/AdaptivityProvider/AdaptivityContext";
import { AdaptivityContext } from "@vkontakte/vkui/dist/cssm/components/AdaptivityProvider/AdaptivityContext";
import type { AppRootContextInterface } from "@vkontakte/vkui/dist/cssm/components/AppRoot/AppRootContext";
import { AppRootContext } from "@vkontakte/vkui/dist/cssm/components/AppRoot/AppRootContext";
import type { ConfigProviderContextInterface } from "@vkontakte/vkui/dist/cssm/components/ConfigProvider/ConfigProviderContext";
import { ConfigProviderContext } from "@vkontakte/vkui/dist/cssm/components/ConfigProvider/ConfigProviderContext";
import {
	SizeType,
	ViewHeight,
	ViewWidth,
} from "@vkontakte/vkui/dist/cssm/lib/adaptivity";
import type { FC, ReactNode } from "react";

const ConfigProviderValue: ConfigProviderContextInterface = {
	locale: "en",
	colorScheme: "light",
	platform: "android",
	isWebView: false,
	transitionMotionEnabled: false,
	hasCustomPanelHeaderAfter: false,
	customPanelHeaderAfterMinWidth: 0,
	direction: "ltr",
	tokensClassNames: {},
};

const AdaptivityProviderValue: AdaptivityProps = {
	sizeX: SizeType.REGULAR,
	sizeY: SizeType.REGULAR,
	viewWidth: ViewWidth.DESKTOP,
	viewHeight: ViewHeight.MEDIUM,
};

const AppRootValue: AppRootContextInterface = {
	appRoot: {
		current: null,
	},
	portalRoot: null,
	disablePortal: false,
	keyboardInput: false,
	mode: "full",
	embedded: false,
};

type ServerConfigProps = {
	children: ReactNode;
};

export const ServerConfig: FC<ServerConfigProps> = ({ children }) => {
	return (
		<ConfigProviderContext.Provider value={ConfigProviderValue}>
			<IconAppearanceProvider value="light">
				<AdaptivityContext.Provider value={AdaptivityProviderValue}>
					<AppRootContext.Provider value={AppRootValue}>
						{children}
					</AppRootContext.Provider>
				</AdaptivityContext.Provider>
			</IconAppearanceProvider>
		</ConfigProviderContext.Provider>
	);
};
