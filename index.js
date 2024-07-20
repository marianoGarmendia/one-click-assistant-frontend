document.body.style.cursor = "pointer";

layerPresentation.style.transform = "translateY(-100%)";
// Elemento que selecciona el bloque por donde paso el mouse
const hoverLayerEl = document.querySelector("#hover_layer");

document.addEventListener("mouseover", (e) => {
  // Obtengo la posicion del elemento en cuestion en relacion al documento
  const targetRect = e.target.getBoundingClientRect();

  hoverLayer.style.width = `${targetRect.width}px`;
  hoverLayer.style.height = `${targetRect.height}px`;
  hoverLayer.style.top = `${targetRect.top + window.scrollY}px`;
  hoverLayer.style.left = `${targetRect.left + window.scrollX}px`;
});
// Layer de presentacion de la extensión
const layerPresentationEl = document.querySelector("#layer_presentation");

window.addEventListener("load", () => {
  layerPresentation.style.transition = "all ease-in-out 500ms";
  layerPresentation.style.transform = "translateY(0%)";
});

const closePresentationBtn = document.getElementById(
  "close_layer_presentation"
);
closePresentationBtn.addEventListener("click", () => {
  layerPresentation.style.transform = "translateY(-100%)";
  addListnerToDom();
});

const closeBox = document.createElement("div");

closeBox.innerHTML = "X";
closeBox.style.fontWeight = "bold";
closeBox.style.color = "white";
closeBox.style.position = "absolute";
closeBox.style.width = "40px";
closeBox.style.right = "0";
closeBox.setAttribute("id", "close_box");

closeBox.addEventListener("click", () => {
  box.style.transition = "all ease-in-out 500ms";
  box.style.transform = "translateY(-100%)";
});

const box = document.createElement("div");
const paragraph = document.createElement("p");
box.appendChild(paragraph);

box.style.position = "fixed";
box.style.top = "0";
box.style.right = "0";
box.style.left = "0";
box.style.fontWeight = "500";
box.style.color = "white";
box.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
box.style.padding = "20px 50px";
box.style.textAlign = "center";
box.style.opacity = "0.8";
box.style.zIndex = "5000000";
box.style.display = "flex";
box.style.flexDirection = "column";
box.style.justifyContent = "center";
box.style.alignItems = "center";

document.body.appendChild(box);
box.style.transform = "translateY(-100%)";

box.appendChild(closeBox);
// Obtiene el texto seleccionado por el cursor
function selectText() {
  const selection = document.getSelection();
  const selectText = selection.toString();

  return selectText;
}

// Fetching a mi api con el IA SDK de Vercel
async function fetchingTranslate({ inputText }) {
  const respTranslate = await fetch(
    `https://one-click-assistant.onrender.com/assistant`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        textToEvaluated: inputText,
      }),
    }
  );

  return respTranslate;
}

// Capturo la seleccion del texto
document.addEventListener("selectionchange", selectText);

function addListnerToDom() {
  document.addEventListener("click", async (e) => {
    // Si clickea en el boton para cerrar la caja de traducción

    if (
      e.target.id === "close_box" ||
      e.target.id === "close_layer_presentation"
    )
      return;

    let textToTranslate = "";
    const text = selectText();

    if (text === null || text === undefined) return;

    if (text === "") {
      textToTranslate = e.target.textContent;
    } else {
      textToTranslate = text;
    }

    if (
      textToTranslate === "" ||
      textToTranslate === null ||
      textToTranslate === undefined
    )
      return;

    // Cambio el parrafo por el contenedor del typewriter
    box.removeChild(paragraph);
    box.appendChild(typeWriterContainer);
    box.style.transform = "translateY(0%)";

    // llamada fetch para traducir el texto

    try {
      const responseFetchTranslate = await fetchingTranslate({
        inputText: textToTranslate,
      });

      const res = await responseFetchTranslate.json();
      const { output } = res;

      box.removeChild(typeWriterContainer);
      paragraph.textContent = output;
      box.appendChild(paragraph);
    } catch (error) {
      console.log("Algo salio mal", error);
    }
  });
}
