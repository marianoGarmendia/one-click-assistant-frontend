// Recuadro de color que aparece sobre el bloque o texto donde pasamos el mouse
const hoverLayer = document.createElement("div");
hoverLayer.setAttribute("id", "hover_layer");
hoverLayer.classList.add("hover_layer");
document.body.appendChild(hoverLayer);

// UI de presentacion para OneClick Assistant
const layerPresentation = document.createElement("div");
layerPresentation.setAttribute("id", "layer_presentation");
layerPresentation.classList.add("layer_presentation");

layerPresentation.innerHTML = `
      <h3>Hola! Soy OneClick Dev Assistant!</h3>
      <h4>Con sólo 1 click podés obtener más información de lo que quieras</h4>
      <p>Pasa por arriba con el mouse sobre el texto y dale click o simplemente seleccionalo ,Te daré información relacionada y explicaciones de lo que estas buscando!</p>
      <div style="width: 100%, display: flex,
          flex-direction: column,
          justify-content: center">
      <div id="close_layer_presentation" class="close_layer_presentation">X</div>
      </div> 
`;

document.body.appendChild(layerPresentation);

const typeWriter = document.createElement("p");
const typeWriterContainer = document.createElement("div");
typeWriterContainer.style.width = "fit-content";
typeWriterContainer.appendChild(typeWriter);
typeWriter.classList.add("typewriter");

// typeWriterContainer.classList.add("typewriter_box");
typeWriter.textContent =
  "Claro! , buscando información sobre lo que necesitas, dame unos segundos";
