module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberField: '#number',
    messageField: '#comment',
    cvvCodeField: '.card-code-input #code',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportiveMode: 'div=Supportive',
    businessMode: 'div=Business',
    paymentMethodButton: '.pp-text',
    addCardButton: '//div[starts-with(text(), "Add card")]',  
    submitButton: 'button=submit',
    linkButton: 'button=Link',
    orderButton: 'span=Enter the number and order',
    blanketAndHandkerchiefsButton: '.switch-input',
    iceCreamButton: 'div=+',
    iceCreamQty: 'div=2',
    blanketButton: '.switch',
    // Modals
    phoneNumberModal: '.modal',
    soundProofCurtain: 'div=Soundproof curtain',
    paymentMethodModal: '.modal',
    addingACardModal: 'div=section active unusual',
    carSearchModal: '.modal',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    selectSupportiveMode: async function () {
        const supportiveMode = await $(this.supportiveMode);
        await supportiveMode.waitForDisplayed();
        await supportiveMode.click();
    },
    selectBusinessMode: async function () {
        const businessMode = await $(this.businessMode);
        await businessMode.waitForDisplayed();
        await businessMode.click();  
    },
    writeMessageToDriver: async function (message) {
        const messageField = await $(this.messageField);
        await messageField.waitForDisplayed();
        await messageField.setValue(message);
    },
    addingCreditCard: async function (number, code) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.waitForDisplayed();
        await cardNumberField.setValue(number);
        const codeField = await $(this.cvvCodeField);
        await codeField.waitForDisplayed();
        await codeField.setValue(code);
        await browser.keys('Tab');
        const nextButton = await $(this.linkButton);
        await nextButton.waitForClickable();
        await nextButton.click();
    },
    orderingABlanketAndHandkerchiefs: async function () {
        const blanketAndHandkerchiefsButton = await $(this.blanketButton);
        await blanketAndHandkerchiefsButton.waitForDisplayed();
        await blanketAndHandkerchiefsButton.click();
    },
    orderingTwoIceCreams: async function () {
        const iceCreamButton = await $(this.iceCreamButton);
        await iceCreamButton.waitForDisplayed();
        await iceCreamButton.click();
        await iceCreamButton.click();
        const iceCreamQty = await $(this.iceCreamQty);
        await iceCreamQty.waitForDisplayed();
    },
    enterTheOrder: async function () {
        const orderButton = await $(this.orderButton);
        await orderButton.waitForClickable();
        await orderButton.click();
    }
    }