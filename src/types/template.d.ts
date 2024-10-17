/// <reference types="@types/google-apps-script" />

declare namespace GoogleAppsScript {
  namespace Libraries {
    namespace LibraryName {
      const globalValue: string;
      function method(arg: number[]): void;
      class Dog {
        method(arg: string): void;
      }
    }
  }
}

declare const LibraryName: typeof GoogleAppsScript.Libraries.LibraryName;
