export class EnumValueUtility {
    static toHex(style: string) {
        switch (style) {
            case 'gray-1':
                return '#d1d5db';
            case 'gray-2':
                return '#9ca3af';
            case 'gray-3':
                return '#6b7280';
            case 'gray-4':
                return '#4b5563';
            case 'red-1':
                return '#fca5a5';
            case 'red-2':
                return '#f87171';
            case 'red-3':
                return '#ef4444';
            case 'yellow-1':
                return '#fde047';
            case 'yellow-2':
                return '#facc15';
            case 'yellow-3':
                return '#eab308';
            case 'orange-1':
                return '#fdba74';
            case 'orange-2':
                return '#fb923c';
            case 'orange-3':
                return '#f97316';
            case 'green-1':
                return '#4ade80';
            case 'green-2':
                return '#22c55e';
            case 'green-3':
                return '#16a34a';
            case 'blue-1':
                return '#93c5fd';
            case 'blue-2':
                return '#60a5fa';
            case 'blue-3':
                return '#3b82f6';
            case 'teal-1':
                return '#5eead4';
            case 'teal-2':
                return '#2dd4bf';
            case 'teal-3':
                return '#14b8a6';
            case 'indigo-1':
                return '#a5b4fc';
            case 'indigo-2':
                return '#818cf8';
            case 'indigo-3':
                return '#6366f1';
            case 'theme-blue-1':
                return '#8ebbeb';
            case 'theme-blue-2':
                return '#5197df';
            case 'theme-blue-3':
                return '#2b7bcc';
            case 'theme-teal-1':
                return '#61e7e2';
            case 'theme-teal-2':
                return '#31d0cf';
            case 'theme-teal-3':
                return '#19babc';
            default:
                return '#e3e3e3';
        }
    }
}