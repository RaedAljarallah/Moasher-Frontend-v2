export interface IBaseModel {
    id: string;
    approved?: boolean;
    hasDeleteRequest?: boolean;
    hasUpdateRequest?: boolean;
}