import { expect } from 'chai';
import HomePage from '../pageobjects/home.page.js';
import { Utils } from '../../resources/utils/utils.js';

describe('Stranger Things items app, Exercice A: Funcional Tests', () => {

  beforeEach(async () => {
    await browser.reloadSession();
});
  
  let textOfAddedItem = 'The kids are playing Dungeons and Dragons Game'

  it('1. should add a new scene to the list', async () => {
    await HomePage.open('#');
    const initialElementCount = await HomePage.countElementsInList();

    await HomePage.addNewItemToTheList(textOfAddedItem);
    await HomePage.waitForElementCountToUpdate(initialElementCount);
        
    const updatedElementCount = await HomePage.countElementsInList();

    expect(updatedElementCount).to.equal(initialElementCount + 1);
  });

  it('2. should edit an existing item', async () => {
    await HomePage.open('#');
    const elementPositionToEdit = 0;
    const editedText = await new Utils().generateRandomString(10);
    const initialText = await HomePage.getTextOfElementList(elementPositionToEdit);

    await HomePage.editElementTextOfList(elementPositionToEdit, editedText);
    await HomePage.waitForElementTextUpdate(initialText,elementPositionToEdit);

    const updatedText = await HomePage.getTextOfElementList(elementPositionToEdit);

    expect(updatedText).to.not.equal(initialText);
    expect(updatedText).to.equal(editedText);
  });

  it('3. should be delete the created item', async () => {
    await HomePage.open('#');

    const InitialElementsInList = await HomePage.countElementsInList()

    await HomePage.deleteElementOfList(textOfAddedItem);
    await HomePage.waitForElementBeDeleted(textOfAddedItem);
    
    const FinalElementsInList = await HomePage.countElementsInList()

    expect(InitialElementsInList).to.equal(FinalElementsInList + 1);

  });

  it('4. It should not allow enter more than 300 characters description', async () => {
    await HomePage.open('#');
    const upperMaxCharacterString = await  new Utils().generateRandomString(301);
    const limitMaxCharacterString = await  new Utils().generateRandomString(300);

    await HomePage.completeItemDetails(upperMaxCharacterString);
    expect(await HomePage.isButtonCreateItemAvariable()).to.be.false;

    await HomePage.completeItemDetails(limitMaxCharacterString);
    expect(await HomePage.isButtonCreateItemAvariable()).to.be.true;
 
  });

  it('5. It should exists an item with the text “Creators: Matt Duffer, Ross Duffer', async () => {
    await HomePage.open('#');
    const textToFind = 'Creators: Matt Duffer, Ross Duffer';
    expect(await HomePage.isTextInList(textToFind)).to.be.true;
  });

});
