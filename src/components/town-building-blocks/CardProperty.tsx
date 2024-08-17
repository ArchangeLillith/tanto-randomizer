import { Card } from "../../utils/types";

interface CardPropertyProps {
	card: Card;
	property: number;
	icon: React.ReactNode;
	cssName: string;
}

const CardProperty: React.FC<CardPropertyProps> = ({
	card,
	property,
	icon,
	cssName,
}) => (
	<>
		{property > 0 && (
			<div className={`${cssName} ${card.set}`}>
				<div className={`hasValue ${card.set}`}>+{property}</div>
				<div className={`iconEnabled ${card.set}`}>{icon}</div>
			</div>
		)}

		{property === 0 && (
			<div className={`${cssName} ${card.set}`}>
				<div className={`hasNoValue ${card.set}`}>+0</div>
				<div className={`iconDisabled ${card.set}`}>{icon}</div>
			</div>
		)}
	</>
);

export default CardProperty;
