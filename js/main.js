const TypeWriter = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;


}

//Type Method
TypeWriter.prototype.type = function () {
    //Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    //check if deleting

    if (this.isDeleting) {
        //remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    }
    else {
        //add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    //insert txt into elements
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial type speed
    let typeSpeed = 300;

    if (this.isDeleting) {
        typeSpeed /= 2;
    }
    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {

        //make pause at end
        typeSpeed = this.wait;

        //Set delete to true
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {

        this.isDeleting = false;
        //move to next word
        this.wordIndex++;
        //pause before start typing
        typeSpeed = 500;

        setTimeout(() => this.type(), typeSpeed);


    }






    setTimeout(() => this.type(), 500)
}

//Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

//Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    //Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

