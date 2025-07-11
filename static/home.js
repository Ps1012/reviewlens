const inputContainer = document.querySelector(".container .input-block");

function makeFile(filename) {
  // Create a container div
  const container = document.createElement("div");
  container.classList.add("svg-container");

  // Create the SVG element
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("xmlns", svgNS);
  svg.setAttribute("height", "80");
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("viewBox", "0 0 256 170");

  // Create the <g> element
  const g = document.createElementNS(svgNS, "g");

  // Create the first path
  const path1 = document.createElementNS(svgNS, "path");
  path1.setAttribute("style", "fill: var(--header-svg-color)");
  path1.setAttribute(
    "d",
    "M71 8h80.9v29.1c0 2.2 1.8 4 4 4h30V47h8v-9.1c0-1.6-.6-3.1-1.7-4.2L161.1 1.8C160 .6 158.4 0 156.8 0H68c-2.8 0-5 2.2-5 5v42h8V8Zm88.9 4 20.5 21h-20.5V12Z"
  );

  // Create the second path
  const path2 = document.createElementNS(svgNS, "path");
  path2.setAttribute("style", "fill: var(--header-svg-color)");
  path2.setAttribute("fill-rule", "evenodd");
  path2.setAttribute(
    "d",
    "M185.9 161.9H71V59h-8v105.9c0 2.8 2.2 5 5 5h120.9c2.8 0 5-2.2 5-5V59h-8v102.9ZM103 63.3c.7.8 2 .9 2.8.2 1.8-1.6 4.6-3.2 8-4.5h-8.7c-.7.5-1.3 1-1.9 1.5-.9.7-.9 2-.2 2.8Zm49.5.1c.8-.8.7-2.1-.1-2.8l-1.8-1.5h-7.7c2.4 1.1 4.7 2.6 6.8 4.5.7.6 2 .6 2.8-.2Zm-41.1 51.7c-2.6-6.1-3.7-12.8-1.1-18.8 2.9-6.7 8.6-9.6 14.3-10.4 2.9-.4 5.7-.3 8.1.1 2.4.4 4.3 1.1 5.2 1.7 4.7 3.1 9.5 7.7 8.6 16.1-.1 1.1.7 2.1 1.8 2.2 1.1.1 2.1-.7 2.2-1.8 1.1-10.6-5.1-16.5-10.4-19.9-1.6-1-4-1.8-6.7-2.3-2.8-.5-6-.6-9.3-.1-6.7 1-13.8 4.5-17.4 12.8-3.2 7.4-1.7 15.4 1.1 21.9 2.8 6.6 7 12.2 9.8 15.2.7.8 2 .9 2.8.1.8-.7.9-2 .1-2.8-2.6-2.7-6.5-7.9-9.1-14ZM128 71.5c4.4-.1 11.3 1.2 17.5 4.9 6.3 3.8 12 10.2 13.9 20.3 1.2 6.1.7 10.7-1.2 13.9-1.9 3.2-5.1 4.6-8.3 4.6-3.2 0-6.5-1.3-9.1-3.3-2.6-2.1-4.7-5-5.3-8.5-.8-4.7-4.7-7.4-8.6-7.3-2 0-3.8.7-5.2 2.1-1.5 1.4-2.6 3.6-2.8 7-.4 6.6 3.6 12.4 8.7 16.8 2.5 2.1 5.1 3.9 7.4 5.1 2.3 1.2 4 1.8 4.6 1.9 1.1.1 1.8 1.1 1.7 2.2-.1 1.1-1.1 1.8-2.2 1.7-1.3-.2-3.6-1.1-6-2.4-2.4-1.3-5.4-3.2-8.1-5.6-5.5-4.7-10.7-11.7-10.1-20.1.2-4.1 1.7-7.3 3.9-9.5s5.1-3.3 7.9-3.3c5.6-.1 11.4 3.8 12.6 10.6.4 2.3 1.9 4.4 3.9 6 2 1.6 4.5 2.5 6.6 2.5 2.1 0 3.8-.8 4.9-2.7 1.2-2 1.8-5.5.7-11.1-1.7-8.7-6.6-14.2-12.1-17.5-5.6-3.4-11.7-4.5-15.4-4.4h-.1c-5.3-.2-17.6 2.1-24.3 12.1-3.2 5-4.3 11.2-4.2 17.2.1 6 1.4 11.5 2.5 14.6.4 1-.2 2.1-1.2 2.5-1 .4-2.1-.2-2.5-1.2-1.2-3.5-2.6-9.4-2.7-15.8-.1-6.4 1-13.5 4.9-19.4C108 73.8 122 71.3 128 71.5Zm5.8 42.5c3.1 3.6 8.7 6.6 18.6 6 1.1-.1 2 .8 2.1 2 0 1.1-.8 2-1.9 2.1-10.9.6-17.8-2.7-21.9-7.4-4-4.7-5-10.4-4.7-14.3 0-1.1 1-2 2.1-1.9 1.1 0 2 1 1.9 2.1-.2 3.1.6 7.7 3.8 11.4ZM95.2 83.5c-.5 1-1.8 1.3-2.7.7-1-.6-1.3-1.8-.7-2.7 4-6.5 17-19 38.2-19 18 0 30.5 12.6 34.7 18.9.6.9.3 2.2-.6 2.8-.9.6-2.2.3-2.8-.6-3.8-5.7-15.2-17.1-31.3-17.1-19.6 0-31.4 11.5-34.8 17Z"
  );

  // Create the third path
  const path3 = document.createElementNS(svgNS, "path");
  path3.setAttribute("style", "fill: #86aaf9");
  path3.setAttribute("d", "M185.9 47H0v12h256V47h-70.1Z");

  // Append paths to <g>
  g.appendChild(path1);
  g.appendChild(path2);
  g.appendChild(path3);

  // Append <g> to SVG
  svg.appendChild(g);

  //   create file name
  let p = document.createElement("p")
  p.appendChild(document.createTextNode(filename["name"]));

//   delete svg

const svgNS1 = "http://www.w3.org/2000/svg";
const svg1 = document.createElementNS(svgNS1, "svg");
svg1.setAttribute("xmlns", svgNS1);
svg1.setAttribute("class", "delete");
svg1.setAttribute("fill", "none");
svg1.setAttribute("viewBox", "0 0 24 24");
svg1.setAttribute("stroke-width", "1.5");
svg1.setAttribute("stroke", "currentColor");

// Create the path element
const path = document.createElementNS(svgNS, "path");
path.setAttribute("stroke-linecap", "round");
path.setAttribute("stroke-linejoin", "round");
path.setAttribute(
  "d",
  "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
);

// Append path to SVG
svg1.appendChild(path);
svg1.addEventListener("click",()=>{
    container.remove();
        document.querySelector(".container .file-icon").style.display = "block";
        inputContainer.style.display = "none";
        document.getElementById("submit-file").style.display = "none"
        document.getElementById("file").style.justifyContent = "center"
        fileMake = false;
})


  // Create label
//   const label = document.createElement("label");
//   label.textContent = "Column name :";

  // Create input field
  const input = document.createElement("input");
  input.type = "text";
//   input.id = "col-input";
  input.placeholder = "Column Name";

  input.addEventListener("keydown",(event)=>{
    if(event.key == "Enter" && input.value.length > 1){
      let columnValue =  document.querySelector(".container #file .input-block input").value;
      window.location.href  = `/col?columnName=${columnValue}`;
    }
  })

  // Append elements to container
  container.appendChild(svg);
  container.appendChild(p);
  container.appendChild(svg1);
//   container.appendChild(label);
  container.appendChild(input);

  // Append container to body (or another parent element)
  inputContainer.appendChild(container);
}
