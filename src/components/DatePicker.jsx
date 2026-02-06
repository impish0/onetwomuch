import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover.jsx'
import { Calendar } from '@/components/ui/calendar.jsx'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { format } from 'date-fns'

export function DatePicker({ value, onChange, placeholder = "Pick a date" }) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                className="justify-start font-normal">
                <CalendarIcon />
                {value ? format(value, "PPP") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                />
            </PopoverContent>
        </Popover>
    )
}