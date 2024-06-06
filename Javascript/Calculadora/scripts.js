const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
display.value = "0";

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.id === "=") {
            try { display.value = eval(display.value); }
            catch { display.value = "ERROR"; }
        } else if (btn.id === "ac") {
            display.value = "0";
        } else if (btn.id === "de") {
            display.value = display.value.slice(0, -1);
        } else {
            if (display.value !== "0" && display.value !== "ERROR")
                display.value = display.value += btn.id;
            else
                display.value = btn.id;
        }
    })
})

/* const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.id === "="){
            display.value = eval(display.value);
        } else if (btn.id === "ac"){
            display.value = "";
        } else if (btn.id === "de"){
            display.value = display.value.slice(0, -1);
        } else {
            display.value = display.value += btn.id;
        }
    })
}) */