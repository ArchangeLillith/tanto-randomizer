//Don't need the typing React.FC because we don't need access to all that gies use because the component is so simple
const Tile = ({ title }: { title: string }) => {
	return <div className="title-wrapper">{title}</div>;
};

export default Tile;
