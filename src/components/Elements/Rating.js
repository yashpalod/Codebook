import { useMemo } from "react";

export const Rating = ({ rating }) => {
    let ratingArray = useMemo(() => {
        const filledStarsCount = Math.min(5, Math.max(0, rating))
        return Array.from({ length: 5 }, (_, index) => index < filledStarsCount)
    }, [rating])

    return (
        <>
            {ratingArray.map((value, index) => (
                value ? (
                    <i key={index} className="text-lg by bi-star-fill text-yellow-500 mr-1"></i>
                ) : (
                    <i key={index} className="text-lg by bi-star text-yellow-500 mr-1"></i>
                )
            ))}
        </>
    )
}
