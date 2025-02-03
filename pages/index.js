import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

//Constants

const cardData1 = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const cardData2 = {
  name: "Lake Louise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
};

const cardData3 = {
  name: "Bald Mountains",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
};

const cardData4 = {
  name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
};

const cardData5 = {
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
};

const cardData6 = {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
};

const initialCards = [
  cardData1,
  cardData2,
  cardData3,
  cardData4,
  cardData5,
  cardData6,
];

// const testCard = {
//   name: "Yosemite Valley",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
// };

/** Elements */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#profile-edit-form"); //Lets see any changes

const popupContainers = document.querySelectorAll(".modal__container");

const cardAddButton = document.querySelector(".profile__add-button");
const cardAddModal = document.querySelector("#add-card-modal");
const cardAddCloseButton = document.querySelector("#add-card-close-button");
const cardAddForm = document.querySelector("#card-add-form"); /////Lets see making sure I didnt use this somewhere else important
const cardTitleInput = document.querySelector("#card-place-input");
const cardURLInput = document.querySelector("#card-url-input");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector(".modal__preview-image");
const previewImageClose = document.querySelector("#modal__preview-close");
const previewImageDescrip = document.querySelector(
  ".modal__preview-description"
);

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardListEl = document.querySelector(".cards__list");

/**         Validations */

const validationSettings = {
  formSelector: ".js-modal-form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// const editFormElement = profileEditModal.querySelector("#profile-edit-form");
// const addFormElement = cardAddModal.querySelector("#card-add-form");

/** Functions */

function handleImageClick(cardData) {
  previewImage.src = cardData.link;
  previewImage.alt = cardData.name;
  previewImageDescrip.textContent = cardData.name;
  // console.log(previewImageDescrip.value);
  openPopup(previewImageModal);
}

function closePopup(modal) {
  document.removeEventListener("keyup", handleEscape);
  document.removeEventListener("click", clickModal);
  modal.classList.remove("modal_opened");
  modal.classList.add("modal_removed");
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  modal.classList.remove("modal_removed");
  document.addEventListener("keyup", handleEscape);
  document.addEventListener("click", clickModal);
}

/**  Functions for eventListener functions */

// let escapeModal = function (modal) {
//   document.addEventListener(
//     "keydown",
//     (e) => {
//       if (e.key === "Escape") {
//         closePopup(modal);
//         console.log("Yup");
//       }
//     }
//     // { once: true }
//   );
// };

function handleEscape(evt) {
  const openedPopup = document.querySelector(".modal_opened");
  if (evt.key === "Escape") {
    closePopup(openedPopup);
    console.log("Yup");
  }
}

function clickModal(evt) {
  const openedPopup = document.querySelector(".modal_opened");
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
}

// window.addEventListener("keyup", (e) => {
//   if (e.key === "Escape") {
//     closePopup(profileEditModal);
//     closePopup(cardAddModal);
//     closePopup(previewImageModal);
//   }
// });

// document.addEventListener("click", (e) => {
//   if (e.target === profileEditModal) {
//     closePopup(profileEditModal);
//     closePopup(cardAddModal);
//     closePopup(previewImageModal);
//   }
// });

// profileEditModal.addEventListener("click", (e) => {
//   if (e.target === profileEditModal && e.target !== popupContainer) {
//     closePopup(profileEditModal);
//   }
// });

// cardAddModal.addEventListener("click", (e) => {
//   if (e.target === cardAddModal && e.target !== popupContainer) {
//     closePopup(cardAddModal);
//   }
// });

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTextEl = cardElement.querySelector(".card__text");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const deleteButton = cardElement.querySelector(".card__delete-button");
//   cardTextEl.textContent = cardData.name;
//   cardImageEl.src = cardData.link;
//   cardImageEl.alt = cardData.name;
//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });
//   deleteButton.addEventListener("click", () => {
//     cardElement.remove();
//   });
//   cardImageEl.addEventListener("click", () => {
//     previewImage.src = cardData.link;
//     previewImage.alt = cardData.name;
//     previewImageDescrip.textContent = cardData.name;
//     // console.log(previewImageDescrip.value);
//     openPopup(previewImageModal);
//     // handleImageClick(cardData);
//   });
//   return cardElement;
// } Old way of creating cards

function createCard(cardData, cardSelector, handleImageClick) {
  const createdCard = new Card(cardData, cardSelector, handleImageClick);
  return createdCard.getView();
}

function addCardFormSubmit(evt) {
  evt.preventDefault();
  // const name = cardTitleInput.value;
  // const link = cardURLInput.value;
  const cardDataSubmit = {
    name: "",
    link: "",
  };
  cardDataSubmit.name = cardTitleInput.value;
  cardDataSubmit.link = cardURLInput.value;
  evt.target.reset();
  // renderCard({ name, link }, cardListEl);
  // closePopup(cardAddModal);
  // const newCardSubmit =

  cardListEl.prepend(
    createCard(cardDataSubmit, "#card-template", handleImageClick)
  );
  closePopup(cardAddModal);
}

// function renderCard(cardData, wrapper) {   ///my old render card function, now useless
//   const cardElement = getCardElement(cardData);
//   wrapper.prepend(cardElement);
// }

/** Event Listeners */

previewImageClose.addEventListener("click", () => {
  closePopup(previewImageModal);
});

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
});

// initialCards.forEach((cardData) => {
//   renderCard(cardData, cardListEl);
// });

//adding a new card

initialCards.forEach((cardData) => {
  // const newCard = createCard(cardData, "#card-template", handleImageClick);

  cardListEl.prepend(createCard(cardData, "#card-template", handleImageClick));
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddModal);
});

cardAddCloseButton.addEventListener("click", () => {
  closePopup(cardAddModal);
});

cardAddForm.addEventListener("submit", addCardFormSubmit);

// const protypeCard = new Card(testCard, "#card-template", handleImageClick);
// protypeCard.getView();
// cardListEl.prepend(protypeCard._cardElement);  Adding a new card test

// Enable validation

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

const addFormValidator = new FormValidator(validationSettings, cardAddForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();
