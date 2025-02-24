import { recupererCategories } from './api.js';
import { recupererImages } from './api.js';
import { logout } from "./admin.js";


// fonction pour récupérer les filtres à partir de l'api et les afficher dans les boutons


async function afficherCategories() {
  try {
    const categories = await recupererCategories();
    
    const buttonContainer = document.getElementById("filtre");
    buttonContainer.innerHTML = '';

    // Ajouter le bouton "Tous"
    const boutonTous = document.createElement("button");
    boutonTous.classList.add("btn", "Tous", "active");
    boutonTous.type = "button";
    boutonTous.textContent = "Tous";
    buttonContainer.appendChild(boutonTous);

    // Ajouter les boutons pour chaque catégorie
    categories.forEach((category) => {
      const bouton = document.createElement("button");
      let className = category.name
        .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
        .replace(/&/g, 'and'); // Remplacer les "&" par "and"

      bouton.classList.add("btn", className);
      bouton.type = "button";
      bouton.textContent = category.name;
      buttonContainer.appendChild(bouton);
    });
  } catch (error) {
    console.error("Erreur lors de l'affichage des catégories :", error);
  }
}



async function afficherImages() {
  try {
    const images = await recupererImages();
    
    const container = document.querySelector(".gallery");
    container.innerHTML = ""; // Vide le contenu existant

    images.forEach(image => {
      const fig = document.createElement("figure");
      const imgelement = document.createElement("img");
      imgelement.src = image.imageUrl;
      imgelement.alt = image.title;
      imgelement.className = image.category.name;

      const figcaption = document.createElement("figcaption");
      figcaption.innerText = image.title;

      fig.appendChild(imgelement);
      fig.appendChild(figcaption);
      container.appendChild(fig);
    });

    return images;

  } catch (error) {
    console.error("Erreur lors de l'affichage des images :", error);
  }
}





// Fonction générique pour filtrer et afficher les images
function afficherImagesFiltrees(images, categorie) {
  let imagesFiltrees;
  //Gestion des catégories avec if pour le bouton tous
  if (categorie) {
    imagesFiltrees = images.filter(function (image) {
      return image.category.name === categorie;
    });
  } else {
    imagesFiltrees = images;
  }

  const container = document.querySelector(".gallery");
  container.innerHTML = ""; // Vide le contenu existant

  // Ajouter les images filtrées au DOM
  imagesFiltrees.forEach(function (image) {
    const fig = document.createElement("figure");

    const imgelement = document.createElement("img");
    imgelement.src = image.imageUrl;
    imgelement.alt = image.title;
    imgelement.className = image.category.name;

    const figcaption = document.createElement("figcaption");
    figcaption.innerText = image.title;

    fig.appendChild(imgelement);
    fig.appendChild(figcaption);
    container.appendChild(fig);
  });
}

// Fonction pour gérer le clic sur les boutons et mettre à jour la classe "active"
function gererCliqueBouton(button, images, categorie) {
  button.addEventListener("click", function () {
    // Supprimer la classe active de tous les boutons
    const boutons = document.querySelectorAll(".btn");
    boutons.forEach(function (act) {
      act.classList.remove("active");
    });

    // Ajouter la classe active au bouton cliqué
    button.classList.add("active");

    // Afficher les images filtrées
    afficherImagesFiltrees(images, categorie);
  });
}

export async function filtre() {
  const images = await afficherImages();

  const btnObjets = document.querySelector(".Objets");
  const btnAppartements = document.querySelector(".Appartements");
  const btnHotels = document.querySelector(".Hotels-and-restaurants");
  const btnTous = document.querySelector(".Tous");

  // Gérer les clics pour chaque bouton en appelant la fonction précéndente pour le button active
  gererCliqueBouton(btnObjets, images, "Objets");
  gererCliqueBouton(btnAppartements, images, "Appartements");
  gererCliqueBouton(btnHotels, images, "Hotels & restaurants");
  gererCliqueBouton(btnTous, images, null); // null pour afficher toutes les images
}

// Appel des fonctions
afficherCategories();
filtre();
