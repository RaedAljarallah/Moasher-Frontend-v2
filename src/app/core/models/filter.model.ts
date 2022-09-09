export interface IFilter {
    name: string;
    id: string;
    type: 'date' | 'static-list' | 'dynamic-list';
    listPlaceholder?: string;
    staticListItems?: { name: string, value: string }[];
    dynamicListUrl?: string;
}