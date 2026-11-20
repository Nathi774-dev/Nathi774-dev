export default function UserDetailCard({ icon: Icon, detail, title }) {
    return (
        <div className="flex items-center gap-4 rounded-2xl bg-white p-5">
            <div className="rounded-xl bg-orange-100 p-3">
                <Icon className="text-[#d66b35]" />
            </div>
            <div>
                <p className="text-sm text-stone-500">
                    {title}
                </p>
                <p className="font-semibold text-stone-800">
                    {detail}
                </p>
            </div>
        </div>
    )
}