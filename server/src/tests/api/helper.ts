
export const randomTimestamp = () => new Date(new Date().valueOf() - Math.random()*(1e+12)).toISOString();

export function randomItemOf<Type>(arr:Type[]):Type { 
	return arr[Math.floor(Math.random() * arr.length)];
};
