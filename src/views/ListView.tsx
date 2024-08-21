import React, { useState } from "react";
import { Card } from "../utils/types";

interface ListViewProps {
	finalTown: Card[];
}

const ListView: React.FC<ListViewProps> = ({ finalTown }) => {
	const [showLotsOfStats, setShowLotsOfStats] = useState(false);
	function showStats() {
		setShowLotsOfStats(!showLotsOfStats);
	}

	const columns = [
		{
			key: "cardID",
			label: "ID",
			className: "list-view-ID",
			shouldShow: true,
		},
		{
			key: "name",
			label: "Name",
			className: "list-view-Name",
			shouldShow: true,
		},
		{
			key: "purchasePrice",
			label: "Cost",
			className: "list-view-Cost",
			shouldShow: true,
		},
		{
			key: "victoryPoints",
			label: "VP",
			className: "list-view-VP",
			shouldShow: finalTown.some((card) => card.victoryPoints),
		},
		{
			key: "love",
			label: "LoveGive",
			className: "list-view-Love-Give",
			shouldShow: finalTown.some((card) => card.love),
		},
		{
			key: "cardDraw",
			label: "CardDraw",
			className: "list-view-Card-Draw",
			shouldShow: finalTown.some((card) => card.cardDraw),
		},
		{
			key: "servings",
			label: "Servings",
			className: "list-view-Card-Draw",
			shouldShow: finalTown.some((card) => card.servings),
		},
		{
			key: "employs",
			label: "Employs",
			className: "list-view-Card-Draw",
			shouldShow: finalTown.some((card) => card.employs),
		},
		{
			key: "chamberMaid",
			label: "Chambermaid",
			className: "list-view-Chambermaid",
			shouldShow: finalTown.some((card) => card.chamberMaid),
		},
		{
			key: "crescentSister",
			label: "Sister",
			className: "list-view-Sister",
			shouldShow: finalTown.some((card) => card.crescentSister),
		},
		{
			key: "beerMaid",
			label: "Beer Maid",
			className: "list-view-Beer-maid",
			shouldShow: finalTown.some((card) => card.beerMaid),
		},
		{
			key: "eventRequired",
			label: "ReqEvents",
			className: "list-view-Events-required",
			shouldShow: finalTown.some((card) => card.eventRequired),
		},
		{
			key: "reminescenceRequired",
			label: "Req Rems",
			className: "list-view-Rem-required",
			shouldShow: finalTown.some((card) => card.reminescenceRequired),
		},
		{
			key: "employEffect",
			label: "Employ Effect",
			className: "list-view-Employ-effect",
			shouldShow: finalTown.some((card) => card.employEffect),
		},
		{
			key: "employEffect",
			label: "Employ Effect",
			className: "list-view-Employ-effect",
			shouldShow: false,
		},
		{
			key: "promo",
			label: "Promo",
			className: "list-view-Promo",
			shouldShow: finalTown.some((card) => card.promo),
		},
	];

	const calculateGridTemplateColumns = () => {
		const nameColumnWidth = "200px"; // Adjust this width as needed
		const flexibleColumns = columns.filter(
			(col) => col.key !== "name" && col.shouldShow
		);
		const flexibleColumnCount = flexibleColumns.length;

		// Set a fixed width for "Name" column and flexible width with extra space for other columns
		const flexibleColumnWidth = `minmax(150px, auto)`; // Adjust the minimum width as needed
		return `${flexibleColumnWidth} ${nameColumnWidth} ${flexibleColumnWidth} ${"1fr ".repeat(
			flexibleColumnCount - 2
		)}`.trim();
	};

	if (showLotsOfStats) {
		return (
			<div className="lots-of-stats-container">
				<div
					className="grid-container"
					style={{ gridTemplateColumns: calculateGridTemplateColumns() }}
				>
					{/* Data Columns as Rows */}
					{columns.map(({ key, label, className, shouldShow }) =>
						shouldShow ? (
							<div key={key} className="data-column">
								{/* Column Header */}
								<div className={"header " + className}>{label}</div>
								{/* Column Data */}
								{finalTown.map((card, index) => {
									const value = card[key as keyof Card];
									return (
										<div key={index} className={className + " " + card.set}>
											{typeof value === "boolean"
												? value
													? "✔"
													: "-"
												: value === 0
												? "-"
												: value}
										</div>
									);
								})}
							</div>
						) : // Looks odd, col is shown or null which removes it's space
						null
					)}
				</div>
				<div className="stats-button-container">
					<button
						className="button-74 stats-button"
						role="button"
						onClick={() => setShowLotsOfStats(false)}
					>
						<span className="text">
							WAIT NO THATS A LOT OF STATS TAKE ME BACK
						</span>
					</button>
				</div>
			</div>
		);
	}
	return (
		<div className="tile-box">
			<div className="list-view-wrapper">
				<div className="grid-wrapper">
					<div className="list-view-grid list-view-name-col">
						<div className="list-view-col-header">Name:</div>
						{finalTown.map((card) => (
							<div
								className={[
									card.set,
									"list-view-card",
									"list-view-name",
									card.chamberMaid && "card-is-chambermaid",
									(card.victoryPoints || card.stackingVP) && "card-has-vp",
									//REFACTOR for attack cards card.thirdProperty && "third-property-class", // Example for a third property
								]
									.filter(Boolean)
									.join(" ")}
								key={card.name}
							>
								{card.name}
							</div>
						))}
					</div>
					<div className="list-view-grid list-view-price-col">
						<div className="list-view-col-header">Price:</div>
						{finalTown.map((card) => (
							<div
								className={`${card.set} list-view-card list-view-price`}
								key={`${card.name}-${card.purchasePrice}`}
							>
								{card.purchasePrice}
							</div>
						))}
					</div>
					<div className="legend-for-list-view">
						<div className="list-view-col-header legend-header">Legend:</div>
						<div className="card-has-vp legend-line">
							Font color: Card has VP indicator
						</div>
						<div className="card-is-chambermaid legend-line">
							Underline: Card is a chambermaid
						</div>
					</div>
				</div>
			</div>
			<div className="button-container stats-button">
				<button
					className="button-75 stats-button"
					role="button"
					onClick={showStats}
				>
					<span className="text">I like stats</span>
				</button>
			</div>
		</div>
	);
};

export default ListView;
