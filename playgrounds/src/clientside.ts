/// <reference types="dgs/dist/types/clientSideGoogle.d.ts" />

// this 'dayjs' is a client side library, so it's not effected by 'src/types/dayjs.d.ts' what is a server side library
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(weekOfYear);
dayjs.tz.setDefault('Asia/Tokyo');

export const logTimeStamp = () => {
  const timestamp = dayjs().format('YYYYMMDDHHmmss');
  google.script.run
    .withSuccessHandler((response: string) => {
      const { result } = JSON.parse(response) as {
        result: boolean;
      };
      if (result) {
      }
    })
    .logTimeStampInServer(timestamp);
};
