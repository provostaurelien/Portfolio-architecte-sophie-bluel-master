// Appel API pour récupération des catégories
export async function recupererCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();
    return categories; // Retourne les catégories pour pouvoir les réutiliser
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    throw error; // Propager l'erreur pour qu'elle soit gérée ailleurs si nécessaire
  }
}

// Appel API pour récupération des images

export async function recupererImages() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const images = await response.json();
    return images; // Retourne les images pour les réutiliser
  } catch (error) {
    console.error("Erreur lors de la récupération des images :", error);
    throw error; // Propager l'erreur pour gestion éventuelle
  }
}

// Appel API pour suppression des images
export async function supprimerImage(imageId, token) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return true; // Suppression réussie
    } else {
      console.error(
        "Erreur lors de la suppression de l'image :",
        response.statusText
      );
      return false; // Erreur côté serveur
    }
  } catch (error) {
    console.error("Erreur lors de la requête DELETE :", error);
    return false; // Erreur dans la requête
  }
}

// Appel API pour ajout d'image

export async function ajouterImage(formData, token) {
  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.status === 201) {
      return true; // Indique que l'ajout a réussi
    } else {
      console.error("Erreur lors de l'ajout :", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire :", error);
    return false;
  }
}
