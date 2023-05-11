export const editAvatarButton = document.querySelector('.profile__edit-avatar-button');
export const editProfileButton = document.querySelector('.profile__edit-profile-button');
export const addPlaceButton = document.querySelector('.profile__add-place-button');


export const editAvatarPopupSelector = '.popup_type_edit-avatar';
export const editProfilePopupSelector = '.popup_type_edit-profile';
export const addPlacePopupSelector = '.popup_type_add-place';
export const deletePlacePopupSelector = '.popup_type_delete-place';
export const cardPreviewPopupSelector = '.popup_type_place-preview';
export const cardListSelector = '.places__list';


export const userInfoConfig = {
  avatarProfileSelector: '.profile__avatar',
  nameProfileSelector: '.profile__name',
  jobProfileSelector: '.profile__job',
  avatarDisplayedClass: 'profile__avatar_displayed'
};

export const cardConfig = {
  cardTemplate: '#card',
  placeSelector: '.places__place',
  trashButtonSelector: '.places__trash-button',
  placePhotoSelector: '.places__place-photo',
  placeNameSelector: '.places__place-name',
  likeButtonSelector: '.places__like-button',
  likeCountSelector: '.places__like-count',
  likeButtonActiveClass: 'places__like-button_active',
  trashButtonActiveClass: 'places__trash-button_active'
};

export const popupConfig = {
  avatarProfileSelector: '.profile__avatar',
  nameProfileSelector: '.profile__name',
  jobProfileSelector: '.profile__job',
  formSelector: '.form',
  formInputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  popupContainerSelector: '.popup__container',
  cardPreviewPhotoSelector: '.popup__preview-photo',
  cardPreviewCapSelector: '.popup__preview-cap',
  closeButtonSelector: 'popup__close-button',
  openedPopupClass: 'popup_opened',
  growClass: 'grow',
  shrinkClass: 'shrink'
};

export const validationConfig = {
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_type_error',
  errorMessageClass: 'form__input-error',
  submitSelector: '.form__submit',
  disabledSubmitClass: 'form__submit_disabled'
};

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'af360c33-d15e-4b2e-ba9a-b82afcdc9fcb',
    'content-type': 'application/json'
  }
};