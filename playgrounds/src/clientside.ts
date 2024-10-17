/// <reference types="./../../src/types/clientSideGoogle.d.ts" />

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
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
        result: boolean
      }
      if (result) {

      }
    })
    .logTimeStampInServer(timestamp);
}