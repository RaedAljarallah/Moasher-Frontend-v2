export interface INotification {
    id: string;
    title: string;
    body: string;
    hasRead: boolean;
    createdAt: Date;
    ReadAt?: Date;
}