import ReviewCard from "./ReviewCard";

// dummy data for the reviews
const reviews = [
    {
        name: "Arnold W.H.",
        review: "The pasta was incredible, I loved te service.",
        rating: 4.5
    },
    {
        name: "Alex J.",
        review: "The buns were a little too salty and ruined the taste.",
        rating: 2
    },
    {
        name: "Emma T.",
        review: "A wonderful atmosphere with authentic italian dishes",
        rating: 5
    },
    {
        name: "James K.",
        review: "Excellent service and delicious food",
        rating: 3.9
    }
]

export default function ReviewSection() {
    return (
        <section className="mt-10 px-8">
            <button
                className="
                    mb-6 rounded-full bg-[#5B2F18] px-6 py-3 font-semibold
                    text-orange-300 shadow-lg
                "
            >
                What do our customers say?
            </button>
            <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide">
                {reviews.map((review) => (
                    <ReviewCard key={review.name} {...review} />
                ))}
            </div>
        </section>
    )
}