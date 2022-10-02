import {
    trigger,
    transition,
    style,
    query,
    group,
    animate
} from '@angular/animations';

export const slider = 
    trigger('routeAnimations', [
        transition('entityList => entityDetail', slideTo('right')),
        transition('entityDetail => entityList', slideTo('left')),
        transition('entityDetail => initiativeDetail', slideTo('right')),
        transition('initiativeDetail => entityDetail', slideTo('left')),
        transition('entityDetail => kpiDetail', slideTo('right')),
        transition('kpiDetail => entityDetail', slideTo('left')),
        transition('entityDetail => objectiveDetail', slideTo('right')),
        transition('objectiveDetail => entityDetail', slideTo('left')),

        transition('objectiveList => objectiveDetail', slideTo('right')),
        transition('objectiveDetail => objectiveList', slideTo('left')),
        transition('objectiveDetail => kpiDetail', slideTo('right')),
        transition('kpiDetail => objectiveDetail', slideTo('left')),
        transition('objectiveDetail => initiativeDetail', slideTo('right')),
        transition('initiativeDetail => objectiveDetail', slideTo('left')),

        transition('programList => programDetail', slideTo('right')),
        transition('programDetail => programList', slideTo('left')),

        transition('kpiList => kpiDetail', slideTo('right')),
        transition('kpiDetail => kpiList', slideTo('left')),
        
        transition('initiativeList => initiativeDetail', slideTo('right')),
        transition('initiativeDetail => initiativeList', slideTo('left')),

        transition('portfolioList => portfolioDetail', slideTo('right')),
        transition('portfolioDetail => portfolioList', slideTo('left')),
        
        
        
    ]);


function slideTo(direction: string) {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                [direction]: 0,
                width: '100%',
                'z-index': -1
            })
        ], optional),
        query(':enter', [
            style({ [direction]: '-100%' })
        ], optional),
        group([
            query(':leave', [
                animate('400ms ease', style({ [direction]: '100%' }))
            ], optional),
            query(':enter', [
                animate('400ms ease', style({ [direction]: getEnd(direction) }))
            ], optional)
        ])
    ];
}

function getEnd(dir: string): string {
    if (dir === 'left') return '-1%';
    return '1%';
}