/// <reference types="./../../src/types/dayjs.d.ts" />

function main() {
  const today = dayjs.dayjs();
  const timestamp = today.startOf('date').format('YYYY/MM/DD HH:mm');
  console.log(timestamp);
}
