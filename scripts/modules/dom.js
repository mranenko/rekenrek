/**
 *  Dom class
 */

export default class Dom {
  static createElement(elementType, elementAttributes) {
    elementType = elementType || 'div';
    elementAttributes = elementAttributes || {};

    /* create dom element */
    const element = document.createElement(elementType);

    /* add attributes */
    Object.keys(elementAttributes).forEach(key => {
      element.setAttribute(key, elementAttributes[key]);
    });

    return element;
  }
}
