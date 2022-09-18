import {animate, animateChild, group, query, state, style, transition, trigger} from "@angular/animations";

export const collapse =
    trigger('collapse', [
        state('close', style({
            height: 0,
            overflow: 'hidden',
            visibility: 'hidden'
        })),
        state('open', style({
            overflow: 'visible',
        })),
        transition('close<=>open', animate('150ms'))
    ]);

export const slideDown = 
    trigger('slideDown', [
        transition(':enter', [
            style({
                top: '-10%',
                opacity: '0' 
            }),
            animate('250ms ease-out')
        ]),
        transition(':leave', [
            animate('250ms ease-out', style({ top: '-10%', opacity: 0}))
        ])
        
    ])
export const fadeIn = 
    trigger('fadeIn', [
        transition(':enter', [
            style({ opacity: 0}),
            animate('250ms ease-out')
        ]),
        transition(':leave', [
            animate('350ms ease-out', style({ opacity: 0}))
        ])
    ])

export const zoomOut =
    trigger('zoomOut', [
        transition(
            ':enter', [
                style({ transform: 'scale(0)', opacity: 0 }),
                animate('200ms ease-out')
            ]
        ),
        transition(
            ':leave', [
                animate('200ms ease-out', style({ opacity: 0, transform: 'scale(0)' })),
            ]
        ),
    ])

export const loadingBtn = 
    trigger('loadingBtn', [
        state('expand', style({
            'padding-left': '2.5rem'
        })),
        state('shrink', style({})),
        transition('expand<=>shrink', animate('150ms ease'))
    ])

export const ladingBtnSpin =
    trigger('ladingBtnSpin', [
        transition(':enter', [
            style({ opacity: 0}),
            animate('150ms 50ms ease-out')
        ]),
        transition(':leave', [
            animate('50ms ease-out', style({ opacity: 0}))
        ])
    ])
export const container = 
    trigger('container', [
        transition(':leave', [
            query('@*', [animateChild()], { optional: true })
        ])
    ]);

export const stepper =
trigger('stepper', [
    transition(':increment', [
        // query(':enter', style({ transform: 'translateX(-100%)'}), { optional: true }),
        // query(':leave', style({ display: 'none' }), { optional: true }),
        
        query('.show', style({ transform: 'translateX(-100%)'}), { optional: true }),
        query('.hide', style({ visibility: 'hidden', height: '0px' }), { optional: true }),
        
        group([
            // query(':enter', [
            //     animate('250ms linear', style({ transform: 'translateX(0)' }))
            // ], { optional: true }),

            query('.show', [
                animate('250ms linear', style({ transform: 'translateX(0)' }))
            ], { optional: true }),
            
            // query(':leave', [
            //     animate('300ms linear', style({ transform: 'translateX(100%)' }))
            // ], { optional: true })
        ])
    ]),

    transition(':decrement', [
        // query(':enter', style({ transform: 'translateX(100%)' }), { optional: true }),
        // query(':leave', style({ display: 'none' }), { optional: true }),

        query('.show', style({ transform: 'translateX(100%)'}), { optional: true }),
        query('.hide', style({ visibility: 'hidden', height: '0px' }), { optional: true }),

        group([
            // query(':enter', [
            //     animate('200ms linear', style({ transform: 'translateX(0)' }))
            // ], { optional: true }),

            query('.show', [
                animate('200ms linear', style({ transform: 'translateX(0)' }))
            ], { optional: true }),
            
            // query(':leave', [
            //     animate('300ms linear', style({ transform: 'translateX(-100%)' }))
            // ], { optional: true })
        ])
    ])
])
