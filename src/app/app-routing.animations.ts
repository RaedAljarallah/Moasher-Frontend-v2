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
        transition('* => isLeft', slideTo('left')),
        transition('* => isRight', slideTo('right')),
        transition('isRight => *', slideTo('left')),
        transition('isLeft => *', slideTo('right'))
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
        ]),
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