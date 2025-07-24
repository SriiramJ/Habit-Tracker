// Type for a category
export interface Category{
    _id: string
    name: string
    description?: string
    habitIds?:string[]
    goalIds?:string[]
    createdAt?:string
    updateAt?:string
}

// Format category name (capitalize first letter)
export function formatCategoryName(name:string):string{
    if(!name) return ""
    return name.charAt(0).toUpperCase()+name.slice(1)
}

// Find a category by ID from a list
export function findCategoryById(categories:Category[],id:string):Category| undefined{
    return categories.find((cat)=> cat._id === id)
}

// Get category names from a list of IDs
export function getCategoryNamesByIds(categories: Category[], ids:string[]):string[]{
    return ids
    .map((id)=>{
        const cat = categories.find((c)=> c._id === id)
        return cat ? cat.name : ""
    })
    .filter((name)=> name)
}

// Group habits / goals by category
export function groupByCategory<T extends {categoryIds?: string[]}>(
    items: T[],
    categories:Category[]
):Record<string,T[]>{
    const grouped: Record<string, T[]> = {}
    categories.forEach((cat)=>{
        grouped[cat.name] = items.filter((item)=>
        item.categoryIds?.includes(cat._id))
    })
    return grouped
}