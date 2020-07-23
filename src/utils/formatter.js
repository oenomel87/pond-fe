const formatter = new Intl.NumberFormat('ko-KR');

export function currencyFormat(number) {
	return formatter.format(number);
}
