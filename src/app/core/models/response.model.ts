import {Pagination} from "./pagination.model";

export interface IResponse<TType> {
    result: TType;
    pagination?: Pagination;
}