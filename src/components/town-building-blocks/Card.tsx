import { ESet } from "../../utils/types";

//Refactor throw card in a util file
interface CardProps {
	card: Card;
	genericMaidUrl?: string;
}

//When card coems back from data bse, we type cast to this to ensure that the thingies are speled correctly

interface Card {
	name: string;
	cardDraw: number;
	employs: number;
	purchasePrice: number;
	servings: number;
	employEffect: boolean;
	love: number;
	victoryPoints: number;
	set: ESet;
	pictureUrl?: string;
}

const Card = (props: CardProps) => {
	const card: CardProps["card"] = props.card;
	return (
		<>
			{card.pictureUrl ? (
				<div className="single-card-grid">
					<img
						className="originalCardImage"
						src={`${card.pictureUrl}`}
						alt={`${card.name}`}
						width="220px"
						height="310px"
					/>
				</div>
			) : (
				<>
					<div>
						<div className={`card-background ${card.set}`}>
							<div className="single-card-grid">
								<div className={`purchasePrice ${card.set}`}>
									{card.purchasePrice}
								</div>
								<div className={`name ${card.set}`}>{card.name}</div>
								{card.victoryPoints && (
									<div className={`VP ${card.set}`}>{card.victoryPoints}</div>
								)}
								<div className={`${card.set} image`}>
									<img src={`${props.genericMaidUrl}`} />
								</div>
								<div className={`bottomSection ${card.set}`}>
									{card.cardDraw > 0 && (
										<div className={`card-draw ${card.set}`}>
											<div className={`valueCardDrawHasValue ${card.set}`}>
												+{card.cardDraw}
											</div>
											<div className={`iconCardDrawEnabled ${card.set}`}>
												<svg
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
													<g
														id="SVGRepo_tracerCarrier"
														strokeLinecap="round"
														strokeLinejoin="round"
													></g>
													<g id="SVGRepo_iconCarrier">
														<path d="M17,4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2H15a2,2,0,0,0,2-2ZM5.5,7a1,1,0,1,1,1-1A1,1,0,0,1,5.5,7Zm4,7c-1,1-3,2-3-1s3-4,3-4,3,1,3,4S10.5,15,9.5,14Zm4,5a1,1,0,1,1,1-1A1,1,0,0,1,13.5,19Z"></path>
														<path d="M20,3H19V20a2,2,0,0,1-2,2h3a2,2,0,0,0,2-2V5A2,2,0,0,0,20,3Z"></path>
													</g>
												</svg>
											</div>
										</div>
									)}

									{card.cardDraw === 0 && (
										<div className={`card-draw ${card.set}`}>
											<div className={`valueCardDrawIsZero ${card.set}`}>
												+0
											</div>
											<div className={`iconCardDrawDisabled ${card.set}`}>
												<svg
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
													<g
														id="SVGRepo_tracerCarrier"
														strokeLinecap="round"
														strokeLinejoin="round"
													></g>
													<g id="SVGRepo_iconCarrier">
														<path d="M17,4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2H15a2,2,0,0,0,2-2ZM5.5,7a1,1,0,1,1,1-1A1,1,0,0,1,5.5,7Zm4,7c-1,1-3,2-3-1s3-4,3-4,3,1,3,4S10.5,15,9.5,14Zm4,5a1,1,0,1,1,1-1A1,1,0,0,1,13.5,19Z"></path>
														<path d="M20,3H19V20a2,2,0,0,1-2,2h3a2,2,0,0,0,2-2V5A2,2,0,0,0,20,3Z"></path>
													</g>
												</svg>
											</div>
										</div>
									)}

									{card.employEffect && <div className="effects">EFFECTS</div>}
									{card.servings > 0 && (
										<div className={`servings ${card.set}`}>
											<div className={`${card.set} valueServingsHasValue`}>
												+{card.servings}
											</div>
											<div className={`${card.set} iconServingsEnabled`}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 512 512"
												>
													<path d="M480 96c17.7 0 32 14.3 32 32s-14.3 32-32 32l-208 0 0-64 208 0zM320 288c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0zm64-64c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l48 0c17.7 0 32 14.3 32 32zM288 384c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0zm-88-96l.6 0c-5.4 9.4-8.6 20.3-8.6 32c0 13.2 4 25.4 10.8 35.6C177.9 364.3 160 388.1 160 416c0 11.7 3.1 22.6 8.6 32l-8.6 0C71.6 448 0 376.4 0 288l0-61.7c0-42.4 16.9-83.1 46.9-113.1l11.6-11.6C82.5 77.5 115.1 64 149 64l27 0c35.3 0 64 28.7 64 64l0 88c0 22.1-17.9 40-40 40s-40-17.9-40-40l0-56c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 56c0 39.8 32.2 72 72 72z" />
												</svg>
											</div>
										</div>
									)}

									{card.servings === 0 && (
										<div className={`${card.set} servings`}>
											<div className={`valueServingsIsZero ${card.set}`}>
												+0
											</div>
											<div className={`iconServingsDisabled ${card.set}`}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 512 512"
												>
													<path d="M480 96c17.7 0 32 14.3 32 32s-14.3 32-32 32l-208 0 0-64 208 0zM320 288c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0zm64-64c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l48 0c17.7 0 32 14.3 32 32zM288 384c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0zm-88-96l.6 0c-5.4 9.4-8.6 20.3-8.6 32c0 13.2 4 25.4 10.8 35.6C177.9 364.3 160 388.1 160 416c0 11.7 3.1 22.6 8.6 32l-8.6 0C71.6 448 0 376.4 0 288l0-61.7c0-42.4 16.9-83.1 46.9-113.1l11.6-11.6C82.5 77.5 115.1 64 149 64l27 0c35.3 0 64 28.7 64 64l0 88c0 22.1-17.9 40-40 40s-40-17.9-40-40l0-56c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 56c0 39.8 32.2 72 72 72z" />
												</svg>
											</div>
										</div>
									)}
									{card.love > 0 && (
										<div className={`${card.set} love`}>
											<div className={`${card.set} valueLoveHasValue`}>
												+{card.love}
											</div>
											<div className={`${card.set} iconLoveEnabled`}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 512 512"
												>
													<path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
												</svg>
											</div>
										</div>
									)}
									{card.love === 0 && (
										<div className={`love ${card.set}`}>
											<div className={`valueLoveIsZero ${card.set}`}>+0</div>
											<div className={`${card.set} iconLoveDisabled`}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 512 512"
												>
													<path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
												</svg>
											</div>
										</div>
									)}
									{card.employs > 0 && (
										<div className={`${card.set} employs`}>
											<div className={`${card.set} valueEmploysHasValue`}>
												+{card.employs}
											</div>
											<div className={`iconEmploysEnabled ${card.set}`}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 448 512"
												>
													<path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
												</svg>
											</div>
										</div>
									)}
									{card.employs === 0 && (
										<div className={`${card.set} employs`}>
											<div className={`${card.set} valueEmploysIsZero`}>+0</div>
											<div className={`${card.set} iconEmploysDisabled`}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 448 512"
												>
													<path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
												</svg>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Card;
