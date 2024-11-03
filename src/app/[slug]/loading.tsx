import { Spinner } from "@/components/Spinner";

export default function Loading() {
    return (
        <div className="h-full grid place-content-center">
            <Spinner size="large" className="stroke-violet-900" />
        </div>
    )
}