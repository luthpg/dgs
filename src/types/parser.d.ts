/// <reference types="@types/google-apps-script" />

declare namespace GoogleAppsScript {
	namespace Libraries {
		/**
		 * For GoogleAppsScript Library `Parser`
		 * @author Ivan Kutil
		 * @email codeasi@gmail.com
		 * @scriptId `1Mc8BthYthXx6CoIz90-JiSzSafVnT6U3t0z_W3hLTAX5ek4w0G_EIrNw`
		 */
		namespace Parser {
			/*
			 * Extract parts from long content
			 *
			 * @param {String} content Text to parse
			 * @return {object} the result of the exponential calculation
			 */
			function data(content: string): Parser;
			type Direction = "from" | "to";
			interface Parser {
				content: string;
				direction: Direction;
				index: number;
				end?: number;
				last?: number;
				log: boolean;
				position: number;
				from: (pattern: string, offset?: number) => Parser;
				to: (pattern: string, offset?: number) => Parser;
				offset: (index: number) => Parser;
				setDirection: (way: Direction) => Parser;
				setLog: () => Parser;
				build: () => string;
				iterate: () => string[];
			}

			/**
			 * Caching content into static Drive files
			 *
			 * @deprecated
			 * @param {String} cacheName The cache name, which have to be unique like ID for Properties, Cache and File name
			 * @param {Number} expirationInSeconds How long cache will be in memory
			 * @param {PropertiesService.Properties} propertiesService Insert which type Properties Service do you want to use (User / Document / Script)
			 *
			 * @return {Blob} Returns Binary large object
			 */
			function cache(
				cacheName: string,
				expirationInSeconds: number,
				propertiesService: GoogleAppsScript.Properties.Properties,
			): CachePro;
			/**
			 * @deprecated
			 */
			interface CachePro {
				id?: string;
				log: boolean;
				name: string;
				expirationInSeconds: number;
				propertiesService: GoogleAppsScript.Properties.Properties;
				reset: () => void;
				setLog: () => CachePro;
				init: (file: GoogleAppsScript.DriveApp.File) => CachePro;
				getData: <T>(callback: () => T) => GoogleAppsScript.Base.Blob;
			}
		}
	}
}

declare const Parser: typeof GoogleAppsScript.Libraries.Parser;
