import stylesSubhead from "@vkontakte/vkui/dist/cssm/components/Typography/Subhead/Subhead.module.css";
import stylesTitle from "@vkontakte/vkui/dist/cssm/components/Typography/Title/Title.module.css";
import stylesTypography from "@vkontakte/vkui/dist/cssm/components/Typography/Typography.module.css";
import clsx from "clsx";
import type { FC } from "react";
import styles from "./Header.module.css";

export const Header: FC = () => {
	return (
		<>
			<h1
				className={clsx(
					styles.title,
					stylesTypography.normalize,
					stylesTypography.weight1,
					stylesTitle.level1,
				)}
			>
				Modern Bundlephobia
			</h1>
			<h2
				className={clsx(
					styles.subhead,
					stylesTypography.normalize,
					stylesTypography.weight3,
					stylesSubhead.host,
				)}
			>
				find the cost of adding a npm package to your bundle
			</h2>
		</>
	);
};
