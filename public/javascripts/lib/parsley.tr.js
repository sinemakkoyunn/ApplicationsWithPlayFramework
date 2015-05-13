// ParsleyConfig definition if not already set
window.ParsleyConfig = window.ParsleyConfig || {};
window.ParsleyConfig.i18n = window.ParsleyConfig.i18n || {};

// Define then the messages
window.ParsleyConfig.i18n.tr = $.extend(window.ParsleyConfig.i18n.tr || {}, {
  defaultMessage: "Bu değer geçersiz görünüyor.",
  type: {
    email:        "Geçerli bir e-posta adresi girmelisiniz.",
    url:          "Geçerli bir URL girmelisiniz.",
    number:       "Geçerli bir sayı girmelisiniz.",
    integer:      "Geçerli bir tamsayı girmelisiniz.",
    digits:       "Bu alan rakamlardan oluşmalıdır.",
    alphanum:     "Bu alan rakamlardan ve alfabetik karakterlerden oluşmalıdır."
  },
  notblank:       "Bu alanı boş bırakamazsınız.",
  required:       "Bu alan gereklidir.",
  pattern:        "Bu değer geçersiz görünüyor.",
  min:            "Bu alan %s değerine eşit ya da büyük olmalıdır.",
  max:            "Bu alan %s değerine eşit ya da küçük olmalıdır.",
  range:          "Bu alanın değeri %s ile %s arasında olmalıdır.",
  minlength:      "Bu alan çok kısa. %s karaktere eşit ya da fazla olmalıdır.",
  maxlength:      "Bu alan çok uzun. %s karaktere eşit ya da küçük olmalıdır.",
  length:         "Bu alanın karakter sayısı %s ile %s arasında olmalıdır.",
  equalto:        "Değerler eşit olmalıdır."
});

// If file is loaded after Parsley main file, auto-load locale
if ('undefined' !== typeof window.ParsleyValidator)
  window.ParsleyValidator.addCatalog('tr', window.ParsleyConfig.i18n.tr, true);
