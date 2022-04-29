export const checkColor = (val: number | string) => {
  let num = Number(val);
  return num < 0 ? 'text-[#ff0000]' : 'text-[#009c24]';
};
