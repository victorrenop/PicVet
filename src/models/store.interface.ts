import { ServiceInterface } from './service.interface';

export interface StoreInterface{
	logo?: string;
	name: string;
	address: string;
	totalRatings: number;
	meanRating: number;
	open: string;
	types: string[];
	services: ServiceInterface[];
}