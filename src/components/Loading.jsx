import { Spinner } from '@/components/ui/spinner.jsx'

export function Loading({ message = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Spinner className="size-8"/>
            <p>{message}</p>
        </div>
    )
}