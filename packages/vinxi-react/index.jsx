/// <reference types="vinxi/client" />
import React from "react";
import { lazy } from "react";
import { updateStyles } from "vinxi/runtime/style";

import { renderAsset } from "./render-asset";

export { renderAsset };
export { default as lazyRoute } from "./lazy-route";
export const createAssets = (src, manifest) =>
	lazy(async () => {
		const assets = await manifest.inputs[src].assets();
		const styles = assets.filter((asset) => asset.tag === "style");

		if (typeof window !== "undefined" && import.meta.hot) {
			import.meta.hot.on("css-update", (data) => {
				updateStyles(styles, data);
			});
		}

		return {
			default: function Assets() {
				return <>{assets.map((asset) => renderAsset(asset))}</>;
			},
		};
	});
