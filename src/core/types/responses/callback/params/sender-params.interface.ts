export interface LiqPaySenderParams {
  /**
   * __EN:__ Sender's first name
   *
   * __UK:__ Ім'я відправника
   */
  sender_first_name: string;

  /**
   * __EN:__ Sender's last name
   *
   * __UK:__ Прізвище відправника
   */
  sender_last_name: string;

  /**
   * __EN:__ Sender's phone number
   *
   * __UK:__ Телефон відправника
   */
  sender_phone: string;

  /**
   * __EN:__ Sender's bank
   *
   * __UK:__ Банк відправника
   */
  sender_card_bank: string;

  /**
   * __EN:__ Country of the sender's card. Numeric __ISO 3166-1__ code
   *
   * __UK:__ Країна картки відправника. Цифровий __ISO 3166-1__ код
   */
  sender_card_country: string;

  /**
   * __EN:__ Sender's card
   *
   * __UK:__ Карта відправника
   */
  sender_card_mask2: string;

  /**
   * __EN:__ Sender's IBAN
   *
   * __UK:__ IBAN відправника
   */
  sender_iban: string;

  /**
   * __EN:__ Sender's card type MC/Visa
   *
   * __UK:__ Тип картки відправника MC/Visa
   */
  sender_card_type: string;

  /**
   * __EN:__ Sender card token
   *
   * __UK:__ Token картки відправника
   */
  card_token: string;
}
