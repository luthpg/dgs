# Typed-GoogleAppsScript

## Roadmap

- OAuth2
  - `1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF`
- ImgApp
  - `1T03nYHRho6XMWYcaumClcWr6ble65mAT8OLJqRFJ5lukPVogAN2NDl-y`
- Underscore
  - `1PcEHcGVC1njZd8SfXtmgQk19djwVd2GrrW1gd7U5hNk033tzi6IUvIAV`
- SlackApp
  - `1on93YOYfSmV92R5q59NpKmsyWIQD8qnoLYk-gkQBI92C58SPyA2x1-bq`
- ChatWorkClient
  - `1nf253qsOnZ-RcdcFu1Y2v4pGwTuuDxN5EbuvKEZprBWg764tjwA5fLav`
- spreadsheets-sql
  - `17p1ghyOkbWOhdE4bdBFhOXL079I-yt5xd0LAi00Zs5N-bUzpQtN7iT1a`
- Parser: done
  - `1Mc8BthYthXx6CoIz90-JiSzSafVnT6U3t0z_W3hLTAX5ek4w0G_EIrNw`
- dayjs: done
  - `1ShsRhHc8tgPy5wGOzUvgEhOedJUQD53m-gd8lG2MOgs-dXC_aCZn9lFB`

## File Template

```ts
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
```

## Usage

for server-side script:

```ts: clasp-file.ts
/// <reference types="typedGAS/dist/dayjs" />
dayjs.dayjs('2024-01-01 12:23:34').add(1, 'D').format('YYYY/MM/DD HH:mm'); // '2024/01/02 12:23'
```

for client-side script:

```tsx: react-file.tsx
/// <reference types="typedGAS/dist/clientSideGoogle" />
interface ResponseValue {
  value: string;
}
export default function Home() {
  const [responseValue, setResponseValue] = useState<ResponseValue | null>(null);
  useEffect(() => {
    google
      .script
      .run
      .withSuccessHandler((response: string) => {
        const responseValues = JSON.parse(response);
      })
      .useServerSideScript(parameters);
  }, [google]);
  return (<>
    response is {responseValue.value}
  </>);
}
```
