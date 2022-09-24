import {IFilter} from "../models/filter.model";

export const schedulableQueryParameters: { key: string; defaultValue?: string }[] = [
    {key: 'plannedFrom'},
    {key: 'plannedTo'},
    {key: 'actualFrom'},
    {key: 'actualTo'},
    {key: 'dueUntil'},
    {key: 'status'}
]

export const schedulableFilterFields: IFilter[] = [
    {name: 'مخطط من', id: 'plannedFrom', type: 'date'},
    {name: 'مخطط حتى', id: 'plannedTo', type: 'date'},
    {name: 'منجز من', id: 'actualFrom', type: 'date'},
    {name: 'منجز حتى', id: 'actualTo', type: 'date'},
    {name: 'مستحق حتى', id: 'dueUntil', type: 'date'},
    {
        name: 'الحالة',
        id: 'status',
        type: 'static-list',
        listPlaceholder: 'الرجاء إختيار الحالة',
        staticListItems: [
            {name: 'منجزة', value: 'completed'},
            {name: 'غير منجزة', value: 'uncompleted'},
            {name: 'متأخرة', value: 'late'},
            {name: 'مستحقة', value: 'due'}
        ]
    }
]