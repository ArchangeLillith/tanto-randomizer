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
							{/* Currently, I don't have all of the cards scanned and the ones I do
							have scanned were found on the{" "}
							<a href="https://tanto-cuore.fandom.com/wiki/Tanto_Cuore_Wiki">
								Tanto Cuore Wiki
							</a>
							. This means that as I start scanning cards in, the "created" card
							that feature random maid images from the internet will be replaced
							with the actual card, making it easier to see all the info at a
							glance. This also, unfortunetly, makes it harder to see which set
							the maids are from. To combat this, I'm going to add a colored
							heart above each maid that cooresponds to the set they come from.
							<br />
							<br />
							While I know I like the card view, some of my friend prefered the
							list view as they were used to it. Thankfully sonce I had the data
							already from the cards I threw together a list view as well for
							people that have been used to the view from{" "}
							<a href="https://nekomusume.net/tc/">nekosume's</a> randomizer! I
							also expanded on that, cause I'm a nerd, and added a 'stats' view
							that is a MUCH larger list allowing a user to see exactly what the
							cards they're getting do - from beer maid to chambermaid to
							requiring events or remenescences, I've added whatever I can think
							of. Plus, if a card doens't have one of the columns, that column
							doesn't exist so you don't see useless info! */}
						</div>
					</div>
				</Modal>
			)}
		</footer>
	);
};

export default Footer;
