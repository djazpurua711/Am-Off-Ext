let functionEnabled;
let index;
let elements;
let observer = new MutationObserver(function(mutations) {
	checkForOffersClass();
});
let btn = document.createElement('button');

function init() {
	observer.observe(document.body, { childList: true, subtree: true });
	formatToggleButton();
	functionEnabled = false;
	checkForOffersClass();
}

function checkForOffersClass() {
	elements = document.querySelectorAll('[data-testid="merchantOfferListAddButton"]');
	if (elements.length > 0) {
		index = 0;
		btn.style.display = 'block';
	} else {
		btn.style.display = 'none';
	}
}

function clickNextElement() {
	// Immediately return when functionEnabled is false
	if (!functionEnabled) return;
	if (index < elements.length) {
		elements[index].click();
		index++;
		setTimeout(clickNextElement, 2000);
	}
}

// Create and style the toggle button
function formatToggleButton() {
	btn.style.display = 'none';
	btn.id = 'tm-toggle-btn';
	btn.textContent = 'Auto-Click Offers';
	btn.style.position = 'fixed';
	btn.style.top = '150px';
	btn.style.right = '10px';
	btn.style.zIndex = '9999';
	btn.style.padding = '5px 10px';
	btn.style.backgroundColor = '#44ff44';
	btn.style.color = 'white';
	btn.style.border = 'none';
	btn.style.borderRadius = '4px';
	btn.style.cursor = 'pointer';

	// Toggle function on button click
	btn.addEventListener('click', function() {
		functionEnabled = !functionEnabled;
		this.textContent = functionEnabled ? 'Stop' : 'Auto-Click Offers';
		this.style.backgroundColor = functionEnabled ? '#ff4444' : '#44ff44';
		clickNextElement();
	});

	document.body.appendChild(btn);
}

if (document.readyState == "complete" || document.readyState == "loaded" || document.readyState == "interactive") {
	init();
} else {
	window.addEventListener("DOMContentLoaded", init());
};
