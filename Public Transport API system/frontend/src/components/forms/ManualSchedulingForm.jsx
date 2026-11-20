import { FormSubmitButton } from "./SubmitButtons";
import { getLocalDate } from "../../mock_data/date";
import { CalendarDays } from "lucide-react";
import ScheduleInput from "./ScheduleInput";

export default function ManualScheduling({onSubmit, data, onChange}) {
    return (
        <form className="space-y-6" onSubmit={onSubmit}>
            {/* Date */}
            <ScheduleInput 
                labelText="Select date" inputProps={{
                    id: "schedule-date",
                    name: "date",
                    type: "date",
                    value: data.date,
                    min: getLocalDate(),
                    onChange: onChange,
                    required: true
                }}
            />

            <ScheduleInput
                labelText="Select departure time"
                inputProps={{
                    id: "schedule-time",
                    name: "time",
                    type: "time",
                    value: data.time,
                    onChange: onChange,
                    required: true
                }}
            />
            <FormSubmitButton>Schedule Trip</FormSubmitButton>
        </form>
    )
}