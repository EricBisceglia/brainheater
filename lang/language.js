/*********************************************************************************************************************/
/*                                                                                                                   */
/* string_translate   Returns a translated string.                                                                   */
/*                                                                                                                   */
/* language_load      Determines which language to use.                                                              */
/* language_change    Changes the language.                                                                          */
/* language_apply     Rewrites all text in the current language.                                                     */
/*                                                                                                                   */
/*********************************************************************************************************************/

/**
 * Returns a translated string.
 *
 * @param   {string}  key     The string name to translate.
 * @param   {object}  values  Values replacing placeholders (eg. {number}).
 *
 * @returns {string}
 */

function string_translate(key, values = {})
{
  // Fetch the translation entry for the requested key
  const entry = translations[key];

  // Try to translate it in the current language, otherwise fallback to english
  const text = entry?.[language.current] ?? entry?.en ?? key;

  // Replace any placeholders with their values
  return text.replace(/\{(\w+)\}/g, function(match, name)
  {
    return values[name] === undefined ? match : String(values[name]);
  });
}




/**
 * Determines which language to use.
 *
 * @returns {void}
 */

function language_load()
{
  // Check for a saved language in the browser's local storage
  try
  {
    const saved = localStorage.getItem('brainheater-language');
    if(saved === 'en' || saved === 'fr')
    {
      language.current = saved;
      return;
    }
  }
  catch(error)
  {
    console.warn('Could not load the language preference.', error);
  }

  // Read browser languages in order of preference
  const preferred = navigator.languages && navigator.languages.length
                  ? navigator.languages
                  : [navigator.language || 'en'];

  // Iterate through the preferred languages
  for(const preference of preferred)
  {
    // Match regional variants to their base language
    const code = preference.toLowerCase().split('-')[0];

    // Set the language if it matches a supported code
    if(code === 'en' || code === 'fr')
    {
      language.current = code;
      return;
    }
  }

  // Default to english if no preferred language was found
  language.current = 'en';
}




/**
 * Changes the language.
 *
 * @param   {string}  code  The selected language.
 *
 * @returns {void}
 */

function language_change(code)
{
  // Only allow switching to english or french
  if(code !== 'en' && code !== 'fr')
    return;

  // Update the current language
  language.current = code;

  // Save the selected language in the browser's local storage
  try
  {
    localStorage.setItem('brainheater-language', code);
  }
  catch(error)
  {
    console.warn('Could not save the language preference.', error);
  }

  // Update the page to the new language
  language_apply();
}




/**
 * Rewrites all text in the current language.
 *
 * @returns {void}
 */

function language_apply()
{
  // Set the document's language attribute to the current language
  document.documentElement.lang = language.current;

  // Translate all translatable elements on the page
  for(const element of document.querySelectorAll('[data-i18n]'))
    element.textContent = string_translate(element.dataset.i18n);

  // Flip the language selector to the current language
  document.getElementById('language_select').value = language.current;

  // Translate the current level's name
  const level = levels[game.level];
  document.getElementById('level_name').textContent = string_translate(level.name);

  // Redraw the level selector in the current language
  level_select_draw();
}