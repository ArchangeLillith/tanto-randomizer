import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import Modal from "./Modal";

const Footer = () => {
	const [showModal, setShowModal] = useState(false);

	const handleOpenModal = () => {
		setShowModal(true);
	};
	const handleCloseModal = () => {
		setShowModal(false);
	};
	return (
		<footer className="footer">
			<div className="footer-inner-container">
				<button className="button-74 about-button" onClick={handleOpenModal}>
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
			{showModal && (
				<Modal onClose={handleCloseModal}>
					<h2 className="modal-title">About the site~</h2>
					<div className="modal-text-wrapper">
						<div>
							Welcome to my Tanto Cuore Randomizer! I created this originally
							for myself and friends but figured since we use it, you might too.
							I took heavy inspiration from{" "}
							<a
								className="modal-link"
								href="https://nekomusume.net/tc/"
								target="_blank"
							>
								nekosume's
							</a>{" "}
							randomizer, but found I wanted more options, like slanting the
							town in a certain way. I also wanted to see what my town would
							look like at a glance—a picture is worth a thousand words, as they
							say! <br />
							<br />I do have some of my own ideas for what I'd like to see
							expanded upon and added to this site, but if you have suggestions
							or want to help with the project, feel free to reach out to me on
							<a
								className="modal-link"
								href="https://github.com/ArchangeLillith"
								target="_blank"
							>
								{" "}
								GitHub!
							</a>
							<br />
							<br />
							<span style={{ color: "white" }}>Nerd talk warning:</span>
							<br />
							For this site, I used Vite with React, allowing me to really break
							down different elements into small components and build from
							there. TypeScript was my language of choice, as it provided much
							more type safety than vanilla JS, which I felt helped a lot with
							managing state. The filter is saved in a global context handled by
							useContext hooks from React and managed by a reducer function. I
							also use React's modal/portal function for this very box, and a
							couple of libraries to assist with style-related tasks (handling
							errors and clean rendering of specific elements). Styling was all
							hand-done in vanilla CSS, and I used a few React Icons sprinkled
							throughout the site to give it a bit of sparkle.
						</div>
					</div>
				</Modal>
			)}
		</footer>
	);
};

export default Footer;
