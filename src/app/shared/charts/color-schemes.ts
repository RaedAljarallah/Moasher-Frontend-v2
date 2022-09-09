import {Color, ScaleType} from "@swimlane/ngx-charts";

export const financialColorScheme: Color = {
    name: 'financial',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#1EADB1', '#D3D3D3']
}

export const financialPlanColorScheme: Color = {
    name: 'financialPlan',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#D3D3D3', '#2E323A', '#1EADB1', '#EF4444']
}

export const overTimeColorScheme: Color = {
    name: 'overTime',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#1EADB1', '#D3D3D3']
}

export const progressColorScheme: Color = {
    name: 'progress',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#1EADB1', '#D3D3D3', '#2E323A']
}