//Pulled out for readability, was a long type for a short component and muddied it imo
type TileBoxProps = {
	enabledClass: string;
	children: React.ReactNode;
};

const TileBox: React.FC<TileBoxProps> = ({ enabledClass, children }) => (
	<div className={`tile-box ${enabledClass}`}>{children}</div>
);

export default TileBox;
