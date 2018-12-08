/*

1. Hide the spoiler on page load
2. When the button is pressed, show the spoiler text, 
hide the reveal spoiler button 
*/
$('.spoiler').on('click','button',((event)=>{
	$('.spoiler button').hide();
	$('.spoiler span').show();
}));


const $button = $('<button>Reveal Spoiler</button>');
$('.spoiler').append($button);
$('.spoiler span').hide();
