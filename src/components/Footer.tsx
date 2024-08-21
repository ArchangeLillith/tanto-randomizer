import { FaHeart } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-inner-container">
				<button className="about-button">
					About the site
				</button>
				<div>
					My{" "}
					<a href="https://github.com/ArchangeLillith/tanto-randomizer-frontend">
						GitHub
					</a>{" "}
					where all the code for this site is stored, feel free to poke around~
				</div>
				<div className="heart-container">
					<div
						className="rounded-circle px-1"
						style={{ color: " rgb(250, 146, 163)" }}
					>
						<FaHeart />
					</div>
					<div
						className="rounded-circle px-1"
						style={{ color: " rgb(250, 146, 163)" }}
					>
						<FaHeart />
					</div>
					<div
						className="rounded-circle px-1"
						style={{ color: "rgb(250, 146, 163)" }}
					>
						<FaHeart />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
