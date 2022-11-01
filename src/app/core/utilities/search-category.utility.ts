import {SearchCategory} from "../models/data-types/search-category.data-type";

export class SearchCategoryUtility {
    static parse(category: string): string {
        if (category === SearchCategory.Entity) return 'الجهات';
        if (category === SearchCategory.Program) return 'البرامج';
        if (category === SearchCategory.KPI) return 'مؤشرات الأداء';
        if (category === SearchCategory.Initiative) return 'المبادرات';
        
        return '';
    }
    
    static getLink(category: string, id: string): string {
        if (category === SearchCategory.Entity) return `entities/${id}`;
        if (category === SearchCategory.Program) return `programs/${id}`;
        if (category === SearchCategory.KPI) return `kpis/${id}`;
        if (category === SearchCategory.Initiative) return `initiatives/${id}`;
        
        return '';
    }
}