const CautionTile = () => {
	return (
		<div className="tile-box warning-box">
			<div className="warning-header-wrapper">CAUTION</div>
			<div>
				The option(s) above will be enforced regardless of other options. The
				filter will do it's best to pick from cards that match your other
				options, but will override them and pick cards that fulfill the filters
				above, disregarding all else if need be. <br />
				<br />
				This includes slants, banned cards, and maids that require other cards
				(ie you've selected no events, but the filter may randomly pick a maid
				that works with events).
			</div>
		</div>
	);
};

export default CautionTile;
