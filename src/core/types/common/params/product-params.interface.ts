export interface LiqPayProductParams {
  /**
   * __EN:__ Information to add data to the payment. For example: `"External information for payments"`
   *
   * __UK:__ Інформація для додавання даних до платежу. Наприклад: `«External information for payments»`
   */
  info?: string;

  /**
   * __EN:__ Product category. Maximum length `25` characters
   *
   * __UK:__ Категорія товару. Максимальна довжина `25` символів
   */
  product_category?: string;

  /**
   * __EN:__ Product description. Maximum length `500` characters.
   *
   * __UK:__ Опис товару. Максимальна довжина `500` символів
   */
  product_description?: string;

  /**
   * __EN:__ Product name. Maximum length `100` characters.
   *
   * __UK:__ Назва товару. Максимальна довжина `100` символів
   */
  product_name?: string;

  /**
   * __EN:__ Product page address. Maximum length `510` characters
   *
   * __UK:__ Адреса сторінки з товаром. Максимальна довжина `510` символів
   */
  product_url?: string;
}
