import { Card } from "../../utils/types";
import CardProperty from "./CardProperty";
import svgIcons from "../../utils/svgIcons";

interface CardProps {
	card: Card;
	genericMaidUrl?: string;
}

const CardStructure = (props: CardProps) => {
	const card: CardProps["card"] = props.card;

	//Return the card image if we have it
	if (card.pictureUrl) {
		return (
			<div className="card-background">
				<img
					className="originalCardImage"
					src={`${card.pictureUrl}`}
					alt={`${card.name}`}
					width="220px"
					height="310px"
				/>
			</div>
		);
	}

	//If not, we build the card
	return (
		<div className={`card-background ${card.set}`}>
			<div className="single-card-grid">
				<div className={`purchasePrice ${card.set}`}>{card.purchasePrice}</div>
				<div className={`name ${card.set}`}>{card.name}</div>
				{card.victoryPoints > 0 && (
					<div className={`VP ${card.set}`}>{card.victoryPoints}</div>
				)}
				<div className={`${card.set} image`}>
					<img src={`${props.genericMaidUrl}`} />
				</div>
				<div className={`bottomSection ${card.set}`}>
					<CardProperty
						card={card}
						property={card.cardDraw}
						icon={svgIcons.svgPropertyIcons.cardDraw}
						cssName="card-draw"
					/>
					{card.employEffect && <div className="effects">EFFECTS</div>}
					<CardProperty
						card={card}
						property={card.servings}
						icon={svgIcons.svgPropertyIcons.servings}
						cssName="servings"
					/>
					<CardProperty
						card={card}
						property={card.love}
						icon={svgIcons.svgPropertyIcons.love}
						cssName="love"
					/>
					<CardProperty
						card={card}
						property={card.employs}
						icon={svgIcons.svgPropertyIcons.employs}
						cssName="employs"
					/>
				</div>
			</div>
		</div>
	);
};

export default CardStructure;
