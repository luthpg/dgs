/// <reference types="@types/google-apps-script" />

declare namespace GoogleAppsScript {
  namespace HTML {
    namespace GlobalGoogle {
      namespace script {
        interface Location {
          hash: string;
          parameter: Record<string, string>;
          parameters: Record<string, string[]>;
        }

        /** asynchronous client-side JavaScript API that can interact with the browser history stack. */
        namespace history {
          /** Pushes the provided state object, URL parameters and URL fragment onto the browser history stack. */
          function push<T extends object, K extends object>(
            stateObject: T,
            params: K,
            hash: string,
          ): void;
          /** Replaces the top event on the browser history stack with the provided state object, URL parameters and URL fragment. */
          function replacer<T extends object, K extends object>(
            stateObject: T,
            params: K,
            hash: string,
          ): void;
          /** Sets a callback function to respond to changes in the browser history */
          function setChangeHandler<T extends object>(
            callback: (e: { state: T; location: Location }) => void,
          ): void;
        }

        /** asynchronous client-side JavaScript API that can interact with dialogs or sidebars in Google Docs, Sheets, or Forms that contain HTML-service pages.  */
        namespace host {
          /** Closes the current dialog or sidebar. */
          function close(): void;
          namespace editor {
            /** Switches browser focus from the dialog or sidebar to the Google Docs, Sheets, or Forms editor. */
            function focus(): void;
          }
          /** Sets the height of the current dialog. */
          function setHeight(height: GoogleAppsScript.Integer): void;
          /** Sets the width of the current dialog. */
          function setWidth(width: GoogleAppsScript.Integer): void;
        }

        /** asynchronous client-side JavaScript API available in HTML-service pages that can call server-side Apps Script functions. */
        const run: Record<
          string,
          /* biome-ignore lint/complexity/noBannedTypes: Client-side can NOT get Server-side scripts types */ Function
        > & {
          /** Sets a callback function to run if the server-side function throws an exception. */
          withFailureHandler<K>(
            callback: (error: Error, userObject?: K) => void,
          ): typeof GoogleAppsScript.HTML.GlobalGoogle.script.run;
          /** Sets a callback function to run if the server-side function returns successfully. */
          withSuccessHandler<T, K>(
            callback: (returnValue: T, userObject?: K) => void,
          ): typeof GoogleAppsScript.HTML.GlobalGoogle.script.run;
          /** Sets a callback function to run if the server-side function returns successfully. */
          withUserObject<K>(
            userObject?: K,
          ): typeof GoogleAppsScript.HTML.GlobalGoogle.script.run;
        };

        /** asynchronous client-side JavaScript API that can query URLs to obtain the current URL parameters and fragment.  */
        namespace url {
          /** Gets a URL location object and passes it to the specified callback function. */
          function getLocation(callback: (location: Location) => void): void;
        }
      }
    }
  }
}

declare const google: typeof GoogleAppsScript.HTML.GlobalGoogle;
