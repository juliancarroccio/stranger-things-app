import { expect } from 'chai';
import HomePage from '../pageobjects/home.page.js';
import { Utils } from '../../resources/utils/utils.js';

describe('Stranger Things items app, Exercice B: Funcional test of bugs reported', () => {

    beforeEach(async () => {
        await browser.reloadSession();
    });

    it('1. Delete item popup message should say sure', async () => {
        await HomePage.open('#');
        const textOfAddedItem = await  new Utils().generateRandomString(10);
        const initialElementCount = await HomePage.countElementsInList();

        await HomePage.addNewItemToTheList(textOfAddedItem);
        await HomePage.waitForElementCountToUpdate(initialElementCount);
    
        const elementIndex = await HomePage.getIndexOfStoryText(textOfAddedItem);
        await HomePage.clickDeleteButtomOfElement(elementIndex);
        const confirmationDeleteMessage = await HomePage.getTextOfDeleteConfirmationMessage();
            
    
        expect(confirmationDeleteMessage).to.not.include("shure");
        expect(confirmationDeleteMessage).to.include("sure");
    });

    it('2. When are editing an element and then deleting it, the text of the deleted element and the Update button should not be displayed', async () => {
        await HomePage.open('#');
        
        const indexTestElement = 0;
        const initialElementCount = await HomePage.countElementsInList();
        const textOfElement = await HomePage.getTextOfElementList(indexTestElement);

        await HomePage.clickEditButtomOfElement(indexTestElement);
        await HomePage.deleteElementOfList(textOfElement);
        await HomePage.waitForElementBeDeleted(initialElementCount);

        expect(await HomePage.isTextAreaEmpty()).to.be.true;
        expect(await HomePage.isUpdateItemButtonVisible()).to.be.false;
    });

    it('3. Image of list loose standard size when the description is a long word', async () => {
        await HomePage.open('#');

        const textOfAddedItemOne = await  new Utils().generateRandomString(300);
        const initialElementCount = await HomePage.countElementsInList();
        const indexElementPreviousyCharged = 0;

        await HomePage.addNewItemToTheList(textOfAddedItemOne);
        await HomePage.waitForElementCountToUpdate(initialElementCount);
        const elementIndexOne = await HomePage.getIndexOfStoryText(textOfAddedItemOne);
        const widthImageAddedWithLongDescription = await HomePage.getWidthOfImage(elementIndexOne);

        const widthImagePrevioslyCharged = await HomePage.getWidthOfImage(indexElementPreviousyCharged);

        expect(widthImageAddedWithLongDescription).to.equal(widthImagePrevioslyCharged);
    });
});