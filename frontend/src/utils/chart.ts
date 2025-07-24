// Prepare data for a line chart showing daily progress (e.g, streaks or completion)
export function getDailyProgressChartData(
    progressList:{date:string; completed: boolean}[],
    startDate: string,
    endDate: string
): {labels: string[]; data:number[]}{
    const labels: string[] = []
    const data: number[] = []
    const start = new Date(startDate)
    const end = new Date(endDate)

    // Create a map for quick lookup
    const progressMap = new Map(
        progressList.map((p)=> [new Date(p.date).toISOString().split("T")[0],p.completed ? 1 : 0])
    )

    for(
        let d = new Date(start);
        d <= end;
        d.setDate(d.getDate() + 1)
    ){
        const dateStr = d.toISOString().split("T")[0];
        labels.push(dateStr)
        data.push(progressMap.get(dateStr)|| 0)
    }
    return {labels, data}
}

// Prepare data for a bar chart showing monthly completion rates
export function getMonthlyCompletionChartData(
    progressList: {date: string; completionRate: number}[]
): {labels: string[]; data: number[]}{
    const monthlyTotals: {[month:string]: {total:number;count: number}} = {}

    progressList.forEach((p)=>{
        const date = new Date(p.date);
        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,"0")}`
        if(!monthlyTotals[month]){
            monthlyTotals[month] = {total: 0,count: 0}
        }
        monthlyTotals[month].total += p.completionRate
    })

    const labels = Object.keys(monthlyTotals).sort()
    const data = labels.map(
        (month) => +(monthlyTotals[month].total/monthlyTotals[month].count).toFixed(2)
    )
    return{labels,data}
}

// Prepare data for a pie chart showing habit/goal category distribution
export function getCategoryDistributionChartData(
    items: {category: string}[]
): {labels: string[]; data: number[]}{
    const categoryCount:{ [category:string]: number } = {}
    
    items.forEach((item)=>{
        categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
    });

    const labels = Object.keys(categoryCount)
    const data = labels.map((cat)=> categoryCount[cat])
    return {labels, data}
}