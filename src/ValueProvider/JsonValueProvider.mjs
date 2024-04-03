import { PREFIXES } from "./PREFIXES.mjs";
import { SUFFIX_JSON, SUFFIXES } from "./SUFFIXES.mjs";

/** @typedef {import("../FluxConfig.mjs").FluxConfig} FluxConfig */

export class JsonValueProvider {
    /**
     * @returns {Promise<JsonValueProvider>}
     */
    static async new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {

    }

    /**
     * @param {string} key
     * @param {FluxConfig} flux_config
     * @returns {Promise<*>}
     */
    async getConfig(key, flux_config) {
        if (PREFIXES.some(prefix => key.startsWith(prefix)) || SUFFIXES.some(suffix => key.endsWith(suffix))) {
            return null;
        }

        const value = await flux_config.getConfig(
            `${key}${SUFFIX_JSON}`,
            null,
            null,
            false
        );

        if (value === null) {
            return null;
        }

        return JSON.parse(value);
    }
}
