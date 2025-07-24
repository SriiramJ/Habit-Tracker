import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { useCategoryStore } from "@/store/categoryStore";
import { Card } from "@/components/ui/Card";

export default function CategoryPage(){
    const {categories, loading} = useCategoryStore()

    return(
         <ProtectedRoute>
            <div className="max-w-2xl mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-6 text-blue-600">Categories</h2>
                <Card>
                    {loading ? (
                        <div>Loading categories...</div>
                    ): categories.length === 0 ?(
                        <div className="text-gray-500">No categories found.</div>
                    ):(
                        <ul className="space-y-2">
                            {categories.map((cat)=>(
                                <li key={cat._id} className="font-medium">{cat.name}</li>
                            ))}
                        </ul>
                    )}
                </Card>
            </div>
         </ProtectedRoute>
    )
}