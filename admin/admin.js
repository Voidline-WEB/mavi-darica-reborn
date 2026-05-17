let selectedCard = null;

const contextMenu = document.getElementById("contextMenu");
const modal = document.getElementById("modal");

const titleInput = document.getElementById("titleInput");
const descInput = document.getElementById("descInput");

/* SAĞ TIK */
document.addEventListener("contextmenu", (e) => {
  const card = e.target.closest(".news-card");

  if(card){
    e.preventDefault();
    selectedCard = card;

    contextMenu.style.display = "flex";
    contextMenu.style.left = e.pageX + "px";
    contextMenu.style.top = e.pageY + "px";
  }
});

/* DIŞA TIKLAYINCA KAPAT */
document.addEventListener("click", () => {
  contextMenu.style.display = "none";
});

/* HABER SİL */
document.getElementById("deleteBtn").addEventListener("click", () => {
  if(selectedCard){
    selectedCard.remove();
  }
});

/* HABER DÜZENLE */
document.getElementById("editBtn").addEventListener("click", () => {
  if(!selectedCard) return;

  titleInput.value = selectedCard.querySelector("h3").innerText;
  descInput.value = selectedCard.querySelector("p").innerText;

  modal.style.display = "flex";
});

/* HABER EKLE */
document.getElementById("addNewsBtn").addEventListener("click", () => {
  selectedCard = null;
  titleInput.value = "";
  descInput.value = "";
  modal.style.display = "flex";
});

/* KAYDET */
document.getElementById("saveBtn").addEventListener("click", () => {

  if(selectedCard){
    selectedCard.querySelector("h3").innerText = titleInput.value;
    selectedCard.querySelector("p").innerText = descInput.value;
  } else {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <h3>${titleInput.value}</h3>
      <p>${descInput.value}</p>
    `;
    document.getElementById("newsGrid").appendChild(card);
  }

  modal.style.display = "none";
});

/* MODAL KAPAT */
function closeModal(){
  modal.style.display = "none";
}