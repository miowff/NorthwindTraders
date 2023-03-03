import moment, { MomentInput } from 'moment';

export const priceFormat = (price: number | string): string => `$${Number(price).toFixed(2)}`;
export const dateFormat = (date: MomentInput): string => moment(date).format('YYYY-MM-DD');
