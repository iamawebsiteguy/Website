let buttons = [];
let buttonsnumber = -1;

let merge1 = {
    "1": "💧 water",
    "2": " 🔥 fire"
};

const text1 = document.getElementById("daniel1");
const text2 = document.getElementById("daniel2");
const mijn_craft = document.getElementById("mijncraft");
const one = document.getElementById("one");
const two = document.getElementById("two");
const tree = document.getElementById("tree");
let z_index_one = parseInt(window.getComputedStyle(one).zIndex);
let z_index_two = parseInt(window.getComputedStyle(two).zIndex);
const click = document.getElementById("click");
const clicker = document.getElementById("clicker");
const switchButton = document.getElementById("switch");
let switched = "nee";
const item1 = document.getElementById("item1");

let craft_inhoud = ["🔥 fire"];
craft_inhoud.push("💧 water");

one.innerText = craft_inhoud[1].trim();
two.innerText = craft_inhoud[0].trim();

setTimeout(() => {
    if (merge1["2"].trim() === two.innerText.trim() && merge1["1"].trim() === one.innerText.trim()) {
        console.log("klopt");
    } else {
        console.log("fout");
    }
}, 50);

function merge() {
    if (merge1["1"].trim() === one.innerText.trim() && merge1["2"].trim() == two.innerText.trim()) {
        return "🪨 stone";
    }
}

mijn_craft.addEventListener("click", function () {
    text1.style.display = "none";
    text2.style.display = "none";
    mijn_craft.style.display = "none";
    one.style.display = "inline";
    two.style.display = "inline";
    click.style.display = "none";
    one.style.left = "50px";
    one.style.top = "50px";
    two.style.left = "150px";
    two.style.top = "150px";
    switchButton.style.display = "inline";
});

let isDraggingOne = false;
let isDraggingTwo = false;
let isDraggingItemOne = false;

function startDragOne() {
    isDraggingOne = true;
    z_index_one = z_index_one + 1;
    one.style["z-index"] = z_index_one;
}

function startDragTwo() {
    isDraggingTwo = true;
    z_index_two = z_index_two + 1;
    two.style["z-index"] = z_index_two;
}

function startDragItemOne(event) {
    isDraggingItemOne = true;
    event.target.style["z-index"] = 1000;
}

function drag(event) {
    if (!isDraggingOne && !isDraggingTwo && !isDraggingItemOne) return;

    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;

    if (isDraggingOne) {
        one.style.left = `${clientX - one.offsetWidth / 2}px`;
        one.style.top = `${clientY - one.offsetHeight / 2}px`;
    }

    if (isDraggingTwo) {
        two.style.left = `${clientX - two.offsetWidth / 2}px`;
        two.style.top = `${clientY - two.offsetHeight / 2}px`;
    }

    if (isDraggingItemOne) {
        buttons.forEach(button => {
            if (button.style["z-index"] == 1000) {
                button.style.left = `${clientX - button.offsetWidth / 2}px`;
                button.style.top = `${clientY - button.offsetHeight / 2}px`;
            }
        });
    }
}

function endDrag() {
    if (isDraggingOne) {
        isDraggingOne = false;
        z_index_one = z_index_one - 1;
        one.style["z-index"] = z_index_one;
        handleMerge();
    }

    if (isDraggingTwo) {
        isDraggingTwo = false;
        z_index_two = z_index_two - 1;
        two.style["z-index"] = z_index_two;
        handleMerge();
    }

    if (isDraggingItemOne) {
        isDraggingItemOne = false;
        const draggedButton = buttons.find(button => button.style["z-index"] == 1000);
        if (draggedButton) draggedButton.style["z-index"] = "";
        
    }
}

item1.addEventListener("click", function() {
    const newButton = document.createElement("button");
    newButton.textContent = "💧 water";
    
    const randomX = Math.random() * (window.innerWidth - 100);
    const randomY = Math.random() * (window.innerHeight - 50);

    newButton.style.position = "absolute";
    newButton.style.left = `${randomX}px`;
    newButton.style.top = `${randomY}px`;

    document.body.appendChild(newButton);

    buttons.push(newButton);
    buttonsnumber++;
    
    newButton.addEventListener("mousedown", startDragItemOne);
    newButton.addEventListener("touchstart", startDragItemOne);
});

one.addEventListener("mousedown", startDragOne);
one.addEventListener("touchstart", startDragOne);
two.addEventListener("mousedown", startDragTwo);
two.addEventListener("touchstart", startDragTwo);

document.body.addEventListener("mousemove", drag);
document.body.addEventListener("touchmove", drag);
document.body.addEventListener("mouseup", endDrag);
document.body.addEventListener("touchend", endDrag);

click.addEventListener("click", function () {
    text1.style.display = "none";
    text2.style.display = "none";
    mijn_craft.style.display = "none";
    click.style.display = "none";
    clicker.style.display = "inline";
    stats.style.top = "87%";
    stats.style.display = "inline";
});

function handleMerge() {
    let left1 = one.style.left;
    let top1 = one.style.top;
    left1 = left1.replace("px", "");
    top1 = top1.replace("px", "");
    left1 = Math.floor(left1);
    top1 = Math.floor(top1);
    let left2 = two.style.left;
    let top2 = two.style.top;
    left2 = left2.replace("px", "");
    top2 = top2.replace("px", "");
    left2 = Math.floor(left2);
    top2 = Math.floor(top2);
    let bignumber1 = "";
    let smallnumber1 = "";
    let difference1 = "";
    let bignumber2 = "";
    let smallnumber2 = "";
    let difference2 = "";
    if (left1 > left2) {
        bignumber2 = parseInt(left1);
        smallnumber2 = parseInt(left2);
        difference2 = bignumber2 - smallnumber2;
    } else if (left2 > left1) {
        bignumber2 = parseInt(left2);
        smallnumber2 = parseInt(left1);
        difference2 = bignumber2 - smallnumber2;
    } else if (left1 === left2) {
        difference2 = parseInt(0);
    }
    if (top1 > top2) {
        bignumber1 = parseInt(top1);
        smallnumber1 = parseInt(top2);
        difference1 = bignumber1 - smallnumber1;
    } else if (top2 > top1) {
        bignumber1 = parseInt(top2);
        smallnumber1 = parseInt(top1);
        difference1 = bignumber1 - smallnumber1;
    } else if (top2 === top1) {
        difference1 = parseInt(0);
    }
    if (difference1 <= 30 && difference2 <= 30) {
        one.style.display = "none";
        two.innerText = merge();
        one.style.top = "-100px";
        one.style.left = "-100px";
    } else if (difference1 <= 15 && difference2 <= 15) {
        two.style.display = "none";
        one.innerText = merge();
        two.style.top = "-100px";
        two.style.left = "-100px";
    }
}

switchButton.addEventListener("click", function() {
  if (switched == "ja") {
    switched = "nee"
    switchButton.innerText = "Items"
    one.style.display = "inline";
    two.style.display = "inline";
    item1.style.display = "none";
  }
  else if (switched == "nee") {
    switched = "ja"
    switchButton.innerText = "Game"
    one.style.display = "none";
    two.style.display = "none";
    item1.style.display = "inline";
  }
})