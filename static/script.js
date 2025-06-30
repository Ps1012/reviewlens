// this is tab button
let fileTab = document.getElementsByClassName("file-tab")[0];
let searchTab = document.getElementsByClassName("search-tab")[0];
// below two are the pages for the tab
let fileItem = document.getElementById("file");
let searchItem = document.getElementById("search");
// this is the input[type="file"] tag which is hidden
let fileUploaded = document.getElementById("uploadfile");
// // this shows the file that has been selected
// let showSelected = document.getElementById("selectedFile");
// this takes input of the column name which has reviews after the file has been selected
let inputColumnName = document.getElementById("col-input");
let inputColumnBlock = document.getElementsByClassName("input-block")[0];
// check condition for to be uploaded or not
let readyUploaded = false;
//theme set to false means it is dark theme
let theme = false;
// this is for responsive, when in mobile , mobile options will be shown in menu bar
let headerOption = false;
// selecting the root values of css
const root = document.querySelector(":root");
// sidebar
let sidebar = document.getElementsByClassName("sidebar")[0];
let sidebarVal = false;
// login
let login = false;
// current file name
let currentFile = "";

// check for user login
let val = localStorage.getItem("login");
if (val != null) {
  login = true;
  document.getElementsByClassName("sign-success")[0].style.display = "block";
  document.getElementsByClassName("sign-failed")[0].style.display = "none";
  document
    .getElementById("mob-his")
    .children[0].setAttribute(
      "d",
      "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
    );
  if (localStorage.getItem("theme") == "1") {
    switchTheme();
  }
}

document.getElementById("submit-file").addEventListener("click",async ()=>{
    let columnValue =  document.querySelector(".container #file .input-block input").value;
    if(columnValue.length > 1){
      window.location.href  = `/col?columnName=${columnValue}`;
    }
})
  
  var fileMake = false;

  function uploadFile() {
    fileUploaded.click();
    fileUploaded.addEventListener("change", async () => {
      const file = fileUploaded.files[0];
      var formData = new FormData();
    formData.append("file", file);
    try {
      let response = await fetch("/", {
        method: "POST",
        body: formData,
      });
      console.log(response);
      // waiting for the result
      // const result = await response.json();
      document.querySelector(".container .file-icon").style.display = "none";
      inputContainer.style.display = "flex"
      document.getElementById("submit-file").style.display = "block"
      document.getElementById("file").style.justifyContent = "space-around"
      document.getElementById("file").style.rowGap = "45px";
      if(!fileMake){
        makeFile(file);
        fileMake = true;
      }

      fileUploaded.value = ""
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  });
}

// this is the choose file icon button on header
document
  .getElementsByClassName("choose")[0]
  .addEventListener("mousedown", () => {
    uploadFile();
  });
// this is the choose file button on body page
document
  .getElementsByClassName("choose")[1]
  .addEventListener("mousedown", () => {
    // syntax : http://localhost:8000/file?name=<a.csv>&column=<abcd>
    if (readyUploaded) {
      if (inputColumnName.value != "") {
        let his = localStorage.getItem("history", "");
        // 1 as a prefix means a file was uploaded not a search is performed
        let currFile = currentFile.split("/")[1];
        if (his != "") {
          his += ";;;" + "1;;" + currFile;
          localStorage.setItem("history", his);
        } else {
          localStorage.setItem("history", +"1;;" + currFile);
        }
        window.location.href = `/file?name=${currFile}&column=${inputColumnName.value}`;
      }
    } else {
      uploadFile();
    }
  });
// this is the choose file icon for on mobile page header menu button
document
  .getElementsByClassName("choose")[2]
  .addEventListener("mousedown", () => {
    uploadFile();
  });

// this is file tab button
fileTab.addEventListener("click", () => {
  fileTab.setAttribute("class", "file active");
  searchTab.setAttribute("class", "search");
  fileItem.style.display = "grid";
  searchItem.style.display = "none";
});
// this is file tab button
searchTab.addEventListener("click", () => {
  searchTab.setAttribute("class", "search active");
  fileTab.setAttribute("class", "file");
  fileItem.style.display = "none";
  searchItem.style.display = "flex";
});

document.getElementsByClassName("theme")[0].addEventListener("click", () => {
  switchTheme();
});
document.getElementsByClassName("theme")[1].addEventListener("click", () => {
  switchTheme();
});
function switchTheme() {
  theme = !theme;
  if (theme) {
    localStorage.setItem("theme", "1");
    root.style.setProperty("--bg-color", "#fff");
    root.style.setProperty("--title-color", "#0B4DDA");
    // root.style.setProperty("--inp-place", " #8997A9");
    root.style.setProperty("--header-bg", "#ECEEF4");
    root.style.setProperty("--header-svg-color", "#222");
    root.style.setProperty("--search-bar-bg", " #fff");
  } else {
    localStorage.setItem("theme", "0");
    root.style.setProperty("--bg-color", " #161625");
    root.style.setProperty("--title-color", " #86AAF9");
    root.style.setProperty("--header-bg", " #2F3D5C");
    root.style.setProperty("--header-svg-color", "#93A2BA");
    root.style.setProperty("--search-bar-bg", "#232C42");
    // root.style.setProperty("--inp-place", " #8997A9");
  }
}

// header search icon while in mobile mode
document
  .getElementsByClassName("search-icon")[0]
  .addEventListener("click", () => {
    document.getElementsByClassName("search")[0].style.display = "flex";
  });
// header search close button in mobile mode
document
  .getElementsByClassName("search-close")[0]
  .addEventListener("click", () => {
    document.getElementsByClassName("search")[0].style.display = "none";
  });

let optionTimeout;
// header menu button in mobile mode
document.getElementsByClassName("option")[0].addEventListener("click", () => {
  try {
    clearTimeout(optionTimeout);
  } catch {}
  headerOption = !headerOption;
  if (headerOption) {
    document.getElementById("option").style.display = "flex";
    optionTimeout = setTimeout(() => {
      headerOption = !headerOption;
      document.getElementById("option").style.display = "none";
    }, 2500);
  } else {
    document.getElementById("option").style.display = "none";
  }
});

function sign() {
  document.getElementsByClassName("black")[0].style.display = "block";
  document.getElementsByClassName("login")[0].style.display = "flex";
}
document.getElementsByClassName("close")[0].addEventListener("click", () => {
  document.getElementsByClassName("black")[0].style.display = "none";
  document.getElementsByClassName("login")[0].style.display = "none";
});

// clicking signin buttons
let signButton = document.getElementsByClassName("sign-go");
for (let i of signButton) {
  i.addEventListener("click", () => {
    if (login) {
      sidebarSwitch();
    } else {
      sign();
    }
  });
}


// clicking input which has to be searched buttons searching here...........
// let searchButton = document.getElementsByClassName("searchInput");
document.getElementById("search-submit").addEventListener("click",()=>{
  let his = localStorage.getItem("history", "");
  // 0 as a prefix means it was searching using word not a file was uploaded
  searchItem = document.getElementsByClassName("searchInput")[0].value;
  if (his != "") {
    his += ";;;" + "0;;" + searchItem;
    localStorage.setItem("history", his);
  } else {
    localStorage.setItem("history", +"0;;" + searchItem);
  }
  let comapany = document.querySelectorAll(".container #search details input");
  let company_value = ""
  comapany.forEach((inputs)=>{
    company_value += inputs.value + ",;,"
  })
  if(company_value.split(",;,").join("") == ""){
    window.location.href = `/single?name=${searchItem}`
  }else{
    if(searchItem.length > 1){
      window.location.href = `/search?topic=${searchItem}&company=${company_value}`;
    }
  }
})
document.getElementById("sign-log").addEventListener("click", () => {
  let a = document.getElementById("sign-name").value;
  let b = document.getElementById("sign-pass").value;
  if (a != "" && b != "") {
    localStorage.setItem("login", a + ";;;" + b);
    localStorage.setItem("history", "");
    document.getElementsByClassName("black")[0].style.display = "none";
    document.getElementsByClassName("login")[0].style.display = "none";
    document.getElementsByClassName("sign-success")[0].style.display = "block";
    document.getElementsByClassName("sign-failed")[0].style.display = "none";
    document
      .getElementById("mob-his")
      .children[0].setAttribute(
        "d",
        "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      );
  }
});

function sidebarSwitch() {
  sidebarVal = !sidebarVal;
  if (sidebarVal) {
    sidebar.style.display = "flex";
    setTimeout(() => {
      sidebar.style.right = "0";
    }, 10);
  } else {
    sidebar.style.right = "-308px";
    setTimeout(() => {
      sidebar.style.display = "none";
    }, 500);
  }
}

let touchstartX = 0;
let touchendX = 0;

function checkDirection() {
  if (touchendX > touchstartX && touchendX - touchstartX > 15) {
    sidebarSwitch();
  }
}

sidebar.addEventListener("touchstart", (e) => {
  touchstartX = e.changedTouches[0].screenX;
});

sidebar.addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  checkDirection();
});

// calling history tab
document
  .getElementsByClassName("hist-call")[0]
  .addEventListener("click", () => sidebarSwitch());

const historyTabs = document.getElementsByClassName("hist")[0];

function createHistoryFile(name) {
  // Create the main container div
  const container = document.createElement("div");

  // Create the paragraph element
  const paragraph = document.createElement("p");

  // Create the first SVG element
  const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg1.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg1.setAttribute("fill", "none");
  svg1.setAttribute("viewBox", "0 0 24 24");
  svg1.setAttribute("stroke-width", "1.5");
  svg1.setAttribute("stroke", "currentColor");

  // Create the path for the first SVG
  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute("stroke-linecap", "round");
  path1.setAttribute("stroke-linejoin", "round");
  path1.setAttribute(
    "d",
    "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  );
  svg1.appendChild(path1);

  // Add text content and append the first SVG to the paragraph
  paragraph.appendChild(svg1);
  paragraph.appendChild(document.createTextNode(name));

  // Create the second SVG element
  const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg2.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg2.setAttribute("fill", "none");
  svg2.setAttribute("viewBox", "0 0 24 24");
  svg2.setAttribute("stroke-width", "1.5");
  svg2.setAttribute("stroke", "currentColor");
  svg2.classList.add("del");
  svg2.addEventListener("click", () => {
    container.remove();
  });

  // Create the path for the second SVG
  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("stroke-linecap", "round");
  path2.setAttribute("stroke-linejoin", "round");
  path2.setAttribute(
    "d",
    "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  );
  svg2.appendChild(path2);

  // Append the paragraph and the second SVG to the main container
  container.appendChild(paragraph);
  container.appendChild(svg2);
  historyTabs.appendChild(container);
}

function createHistorySearch(name) {
  // Create the main container div
  const container = document.createElement("div");

  // Create the paragraph element
  const paragraph = document.createElement("p");

  // Create the first SVG element
  const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg1.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg1.setAttribute("fill", "none");
  svg1.setAttribute("viewBox", "0 0 24 24");
  svg1.setAttribute("stroke-width", "1.5");
  svg1.setAttribute("stroke", "currentColor");
  svg1.classList.add("size-6");

  // Create the path for the first SVG
  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute("stroke-linecap", "round");
  path1.setAttribute("stroke-linejoin", "round");
  path1.setAttribute(
    "d",
    "m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  );
  svg1.appendChild(path1);

  // Add text content and append the first SVG to the paragraph
  paragraph.appendChild(svg1);
  paragraph.appendChild(document.createTextNode(name));

  // Create the second SVG element
  const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg2.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg2.setAttribute("fill", "none");
  svg2.setAttribute("viewBox", "0 0 24 24");
  svg2.setAttribute("stroke-width", "1.5");
  svg2.setAttribute("stroke", "currentColor");
  svg2.classList.add("del");
  svg2.addEventListener("click", () => {
    container.remove();
  });
  // Create the path for the second SVG
  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("stroke-linecap", "round");
  path2.setAttribute("stroke-linejoin", "round");
  path2.setAttribute(
    "d",
    "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  );
  svg2.appendChild(path2);

  // Append the paragraph and the second SVG to the main container
  container.appendChild(paragraph);
  container.appendChild(svg2);
  historyTabs.appendChild(container);
}

// Loading history here
if (login) {
  let his = localStorage.getItem("history");
  if (his != "") {
    his = his.split(";;;");
    for (let i of his) {
      i = i.split(";;");
      if (i.length == 1) {
        i = i[0].replace("NaN", "");
        if (i.includes(".")) {
          createHistoryFile(i);
        } else {
          createHistorySearch(i);
        }
      }
      else if (i[0] == "0") {
        createHistorySearch(i[1]);
      } else {
        createHistoryFile(i[1]);
      }
    }
  } else {
    let p = document.createElement("p");
    p.setAttribute("class", "empty");
    p.appendChild(
      document.createTextNode(
        "Nothing to show here... Please start an activity to record history"
      )
    );
    historyTabs.appendChild(p);
  }
}

document.getElementById("bottom-clear").addEventListener("click", () => {
  historyTabs.textContent = "";
  localStorage.setItem("history", "");
});
document.getElementById("bottom-out").addEventListener("click", () => {
  localStorage.removeItem("login");
  window.location.reload();
});



gsap.to(".container .title p span",{
  y: 0,
  duration: .7,
  stagger: 0.03,
  ease: "elastic.out(1,0.3)",
})