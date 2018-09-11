const cards = document.querySelectorAll('.memory-card');
var counting = 0;
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add('flip');


	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
		}

		secondCard = this;
		lockBoard = true;

		checkForMatch();
		}

		function checkForMatch() {
			if (firstCard.dataset.framework === secondCard.dataset.framework) {
			   disableCards();
			   return;
			 }

			 unflipCards();
		}

		function disableCards() {
			counting++;

			firstCard.removeEventListener('click', flipCard);
			secondCard.removeEventListener('click', flipCard);

			if (counting === 6) {

				window.setTimeout(function(){modal.style.display = "block";}, 1500);
				

				span.onclick = function() {
    				modal.style.display = "none";
				}

			}
			resetBoard();
		}

		function unflipCards() {

			setTimeout(() => {
				firstCard.classList.remove('flip');
				secondCard.classList.remove('flip');


				resetBoard();
			}, 1300);
		}

		function resetBoard() {
			[hasFlippedCard, lockBoard] = [false, false];
			[firstCard, secondCard] = [null, null];
		
		}
		(function shuffle() {
			cards.forEach(card => {
				let ramdomPos = Math.floor(Math.random() * 12);
				card.style.order = ramdomPos;
			});
		})();



cards.forEach(card => card.addEventListener('click', flipCard));
