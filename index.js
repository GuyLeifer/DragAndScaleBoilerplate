const main = document.getElementById("main");
const header = document.getElementById("header");
const playground = document.getElementById("playground")

let isResizing = false;

header.addEventListener("mousedown", mousedown);

function mousedown(e) {
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  let prevX = e.clientX;
  let prevY = e.clientY;

  let oldX = e.clientX;
  let oldY = e.clientY;

  function mousemove(e) {
    if (!isResizing) {
      let newX = prevX - e.clientX;
      let newY = prevY - e.clientY;

      const rectMain = main.getBoundingClientRect();
      const rectPlayground = playground.getBoundingClientRect();

        if(rectMain.right < rectPlayground.right && rectMain.left > rectPlayground.left) {
            main.style.left = rectMain.left - newX + "px";
        }
        
      if(rectMain.bottom < rectPlayground.bottom && rectMain.top > rectPlayground.top) {
          main.style.top = rectMain.top - newY + "px";
        }

      prevX = e.clientX;
      prevY = e.clientY;
    }
  }

  
  function mouseup() {
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }
}

const resizers = document.querySelectorAll(".resizer");
let currentResizer;

for (let resizer of resizers) {
  resizer.addEventListener("mousedown", mousedown);

  function mousedown(e) {
    currentResizer = e.target;
    isResizing = true;

    let prevX = e.clientX;
    let prevY = e.clientY;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      const rectMain = main.getBoundingClientRect();
    //   const rectPlayground = playground.getBoundingClientRect();

      if (currentResizer.classList.contains("se")) {
        main.style.width = rectMain.width - (prevX - e.clientX) + "px";
        main.style.height = rectMain.height - (prevY - e.clientY) + "px";
      } else if (currentResizer.classList.contains("sw")) {
        main.style.width = rectMain.width + (prevX - e.clientX) + "px";
        main.style.height = rectMain.height - (prevY - e.clientY) + "px";
        main.style.left = rectMain.left - (prevX - e.clientX) + "px";
      } else if (currentResizer.classList.contains("ne")) {
        main.style.width = rectMain.width - (prevX - e.clientX) + "px";
        main.style.height = rectMain.height + (prevY - e.clientY) + "px";
        main.style.top = rectMain.top - (prevY - e.clientY) + "px";
      } else {
        main.style.width = rectMain.width + (prevX - e.clientX) + "px";
        main.style.height = rectMain.height + (prevY - e.clientY) + "px";
        main.style.top = rectMain.top - (prevY - e.clientY) + "px";
        main.style.left = rectMain.left - (prevX - e.clientX) + "px";
      }

      prevX = e.clientX;
      prevY = e.clientY;
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
      isResizing = false;
    }
  }
}