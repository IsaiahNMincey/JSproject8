const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {  
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('should set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const fromField = await $(page.fromField);
        const toField = await $(page.toField);
        await expect (fromField).toHaveValue('East 2nd Street, 601');
        await expect (toField).toHaveValue('1300 1st St');
    })

    it ('should select supportive mode', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportiveMode();
        await expect($(page.soundProofCurtain)).toBeExisting();    
    })

    it ('should fill in the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectBusinessMode();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it ('should write a message for the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectBusinessMode();
        await page.writeMessageToDriver('Hurry');
        const messageField = await $(page.messageField);
        await expect (messageField).toHaveValue('Hurry');
    })

    it ('should add a credit card', async () =>{
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const cardNumber = helper.getCardNumber();
        const codeNumber = helper.getCodeNumber();
        await page.addingCreditCard(cardNumber, codeNumber);
        await expect($('div=Card')).toBeExisting();
    })

    it ('should add a blanket and handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportiveMode();
        await page.orderingABlanketAndHandkerchiefs();
        await expect($(page.blanketAndHandkerchiefsButton)).toBeChecked();
    })

    it ('should order 2 Ice creams', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportiveMode();  
        await page.orderingTwoIceCreams();
        await expect($(page.iceCreamQty)).toBeExisting();
    })

    it ('car search modal should appear', async () =>{
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportiveMode();  
        await page.enterTheOrder();
        const carSearchModal = await $(page.carSearchModal);
        await expect (carSearchModal).toBeExisting();
    })
})