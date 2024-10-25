/// <reference types="dgs/dist/types/dayjs.d.ts" />

function main() {
  // this 'dayjs' is a server side library, so it want to be effected by 'src/types/dayjs.d.ts'
  const today = dayjs.dayjs();
  const timestamp = today.startOf('date').format('YYYY/MM/DD HH:mm');
  console.log(timestamp);
}
