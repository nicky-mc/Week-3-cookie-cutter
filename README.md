# Week 3 Project cookie cutter game and reflection.

Well this was a complex project. first i seemed to have named it cookie cutter instead of cookie clicker.
I began with the idea of what i was envisioning, unfortunately that then drew my focus for longer than it should have. so once I had a barebones option menu and audio and buttons as required I moved to game functionality.
I then stopped and first concentrated on having cookie counter increase with each cookie click. Once I got this working. I then got to work setting the "Yeetset"(reset) button. For this I had to do some research across various sites and inspection of other versions of the game to understand and find functions that I could adapt for my requirements.
This inclded a incremental increase per second of cookie count. as well as adding a increase dependant on how many auto clicks you buy.
I then put in the function to fetch the upgrade store or "cookie pawn shop", after reading one of the stretch goals og including and error function I researched how to include this.
I then followed up with crteate Element to allow the JavaScript to place this inside the page.
Once I had this working I realised that there was an error with the sfx for the buttons when the autoclick was purchased preventing the sound from working. I had to then do further reasearch to put in a debounce function to prevent this happening.
Then it was to check I had completed all requirements and any stretch goals

1. I managed to fecth the data from the api into a dropodown menu that shows the upgrades and costs
   I've attempted to insert some code that implemnts these upgrades
2. functions are seemingly effective and have reusability
3. event handlers and listeners used to allow interactivity
4. I've managed to save cookie count into local storage.
5. I seem to have successfullu used interval to allow for an increase of timer.

# Stretch goal attempts

1. I've added sounds to the cookie and reset buttons as well as a background track using gifs for the buttons
2. I've attempted to use a catch function to implement error handling.
3. I've implemented an option menu that allows for a volume adjsut ment, to pl;ay or pause music and toggle light and dark themes.
   Feed back on the effectiveness of my upgrade functionality would allow me to adapt and improve going forwards.
   Amongst the sources that "saved my bacon" were geeks for geeks, w3, mdn, sheCodes, broCode on youtube.

Because I shifted my focus from design to functionality I feel it let my design slip a bit and it is fairly plain but functional.
I found consolidating all the functions most difficult making sure functions that required interaction with other functions did as needed. as well as not being able to figure out why music doesn't play on loading despite attempting to in various ways,
Main error I got was the autoclick effecting my cookie click button, thankfully after research I descovered debounce effectively not allowing the function to access it's "turbo" mode.

I'm pleased with what I created and consolodating lessons in class and my own research to achieve it.
