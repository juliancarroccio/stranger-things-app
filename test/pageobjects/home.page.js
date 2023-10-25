import { $ } from '@wdio/globals'
import Page from './page.js'
import path from 'path'

class HomePage extends Page{

    get inputImage() {
        return $('#inputImage');
    }

    get textArea() {
        return $('textarea[name="text"]');
    }

    get createItemButton() {
        return $('button*=Create Item');
    }

    get updateItemButton() {
        return $('button*=Update Item');
    }

    get confirmDeleteButton() {
        return $('button*=Yes, delete it!');
    }

    get confirmationDeleteMessage() {
        return $('p=¿Are you shure you want to delete this item?');
    }

    async uploadImage(filePath) {
        const absolutePath = path.resolve(filePath);
        await this.inputImage.setValue(absolutePath);
    }

    async inputItemText(text) {
        await this.textArea.clearValue();
        await this.textArea.setValue(text);
    }

    async clickOnCreateItem() {
        await this.createItemButton.click();
    }

    async isButtonCreateItemAvariable() {
        return await this.createItemButton.getAttribute('disabled') === null;
      }

    async clickOnUpdateItem() {
        await this.updateItemButton.click();
    }

    async clickconfirmDelete() {
        await this.confirmDeleteButton.click();

    }

    async countElementsInList() {
        const elementsInList = $$('.media');
        return await elementsInList.length;
    }

    async completeItemDetails(text) {
        await this.uploadImage('resources/media/img-test.jpg');
        await this.inputItemText(text);
    }

    async addNewItemToTheList(text) {
        await this.completeItemDetails(text)
        await this.clickOnCreateItem();
    }

    async waitForElementCountToUpdate(initialCount) {
        await browser.waitUntil(
            async () => {
                const currentCount = await this.countElementsInList();
                return currentCount === initialCount + 1;
            },
            {
                timeout: 100000,
                timeoutMsg: 'Expected the element count to increase by 1',
                interval: 500
            }
        );
    }

    async waitForElementTextUpdate(initialText, index) {
        await browser.waitUntil(
            async () => {
                const currentText = await this.getTextOfElementList(index);
                return currentText !== initialText;
            },
            {
                timeout: 100000,
                timeoutMsg: 'Expected the element text changed',
                interval: 500
            }
        );
    }

    async waitForElementBeDeleted(textOfElement){
        await browser.waitUntil(
            async () => {
                const isTextInList = await this.getIndexOfStoryText(textOfElement);
                return isTextInList === -1;
            },
            {
                timeout: 100000,
                timeoutMsg: 'Expected the element be deleted',
                interval: 500
            }
        );
    }

    async getElementOfList(position){
        const elements = $$('.media-list li');
        if (await elements.length === 0) {
            throw new Error('The list is empty, elements cant be accessed.');
        }
        return elements[position];
    }

    async getTextOfElementList(position){
        const storyElements = $$('p.story.ng-binding');
        return  await storyElements[position].getText()
    }

    async getIndexOfStoryText(text){
        const storyElements = $$('p.story.ng-binding');
        for (let i = 0; i < await storyElements.length; i++) {
            const element = storyElements[i];
            const elementText = await element.getText();
            if (elementText === text) {
                console.log(`Text "${text}" found at index ${i}.`);
                return i;
            }
        }
        console.log(`Text "${text}" not found in list.`);
        return -1;
    }

    async isTextInList(text){
        const indexReturned = await this.getIndexOfStoryText(text)
        return indexReturned === -1 ? false : true;
    }

    async isTextAreaEmpty() {
        const textarea = this.textArea;
        return textarea.getValue() === '';
    }
    
    async clickEditButtomOfElement(index){
        const listItem = $$('.media-body')[index];
        const editButton = listItem.$('button=Edit');
        
        if (editButton.isExisting()) {
            await editButton.waitForClickable({ timeout: 10000 });
            await editButton.click();
        } else {
            console.error('The "Edit" button was not found in the specified element.');
        }
    }

    async clickDeleteButtomOfElement(index){
        const listItem = $$('.media-body')[index];
        const deleteButton = listItem.$('button=Delete');
        
        if (deleteButton.isExisting()) {
            await deleteButton.click();
        } else {
            console.error('The "Delete" button was not found in the specified element.');
        }
    }

    async editElementTextOfList(index, textToInput){
        await this.clickEditButtomOfElement(index);
        await this.inputItemText(textToInput);
        await this.clickOnUpdateItem();
        
    }

    async deleteElementOfList(text){
        const elementIndex = await this.getIndexOfStoryText(text);
        await this.clickDeleteButtomOfElement(elementIndex);
        await this.clickconfirmDelete();
    }

    async getTextOfDeleteConfirmationMessage() {
        return this.confirmationDeleteMessage.getText();
    }

    async isButtonEditVisible(index){
        const listItem = $$('.media-body')[index];
        const editButton = listItem.$('button=Edit');
        
        return await editButton.isDisplayed();
    }

    async isButtonDeleteVisible(index){
        const listItem = $$('.media-body')[index];
        const deleteButton = listItem.$('button=Delete');
        
        return await deleteButton.isDisplayed();
    }

    async isUpdateItemButtonVisible() {
        const updateItemButton = this.updateItemButton;
        return updateItemButton.isDisplayed();
    }

    async getWidthOfImage(index) {
        const width = await browser.execute((index) => {
          const images = document.querySelectorAll('img');
          if (index < images.length) {
            return images[index].width;
          }
          return null;
        }, index);

        return width;
    }
}

export default new HomePage();
