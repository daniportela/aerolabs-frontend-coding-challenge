import { Badge } from "./ui/badge";

export default function GameDetailsBadges({ details }: { details: GameDetailsBadge[] }) {
    return (
        details.map(detail => (
            <Badge>
                { detail.icon }
                <div>
                    <span>{ detail.title }: { detail.value }</span>
                </div>
            </Badge>
        ))
    )
}