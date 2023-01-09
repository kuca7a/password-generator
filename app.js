const slider = document.getElementById("password-range");
const output = document.getElementById("password-length");

slider.oninput = function(){
    output.innerHTML = this.value;
}