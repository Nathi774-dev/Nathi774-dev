import { CalendarDays } from "lucide-react"

export default function ScheduleInput({ labelText, inputProps, onChange }) {
    return (
        <div>
            <label 
                htmlFor="schedule-date"
                className="mb-2 block text-sm font-semibold text-gray-700"
            >
                {labelText}
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-700 px-3">
                <CalendarDays size={19} className="text-green-600" />
                <input 
                    {...inputProps}
                    onChange={onChange}
                    className="w-full py-3 outline-none"
                />
            </div>
        </div>
    )
}