// Components
import { Badge } from "./ui/badge";

export default function GameDetailsBadges({ details }: { details: GameDetailsBadge[] }) {
    return (
        <div className="flex flex-wrap gap-3">
            {details.map(detail => (
                <Badge
                    key={detail.title}
                    className="flex gap-2 rounded-full py-2 px-4 border-violet-50"
                >
                    { detail.icon }
                    <div>
                        <span className="text-sm">
                            <span className="text-violet-600">{ detail.title }</span>: <span className="text-violet-900 font-bold">{ detail.value }</span>
                        </span>
                    </div>
                </Badge>
            ))}
        </div>
    )
}