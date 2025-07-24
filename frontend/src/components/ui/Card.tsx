import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>{
    shadow?: boolean
    padding?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({className, children, shadow = true, padding = true, ...props},ref)=>{
        return(
            <div
            ref={ref}
            className={cn(
                "bg-white rounded-lg",
                shadow && "shadow",
                padding && "p-4",
                className
            )}
            {...props}
            >{children
            }</div>
        )
    }
)

Card.displayName = "Card"