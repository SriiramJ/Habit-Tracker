import * as React from "react"
import { cn } from "@/lib/utils"

interface ModalProps{
    open: boolean
    onClose: ()=> void
    title?: string
    children: React.ReactNode
    size: "sm" | "md" | "lg"
}

export function Modal({open, onClose, title, children, size = "md"}: ModalProps){
    if(!open) return null

    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl"
    }
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className={cn("bg-white roundedd-lg shadow-lg p-6 w-full",sizeClasses[size],
                "relative")} role="dialog" aria-modal="true">

                    {/* Close Button */}
                    <button 
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
                    aria-label="Close"
                    >
                        &times;
                    </button>
                    {/*Title*/}
                    {title &&(
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">{title}</h2>
                    )}
                    {/* Content */}
                    <div>{children}</div>
                </div>
        </div>
    )
}