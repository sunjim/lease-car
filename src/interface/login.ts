export interface IUser {
	name: string;
	openid?: string;
	location?: string;
	avatar?: string;
}
export interface IWeather {
	current: number;
	size: number;
	pageNo: number;
	pageSize: number;
	communityId: string;
}
export interface IMap {
	current: number;
	size: number;
	pageNo: number;
	pageSize: number;
	communityId: string;
}
export interface IData {
	name:string;
	id:string;
}

export interface IUserResult {
	data:IData,
	code: number;
	message: string;
}