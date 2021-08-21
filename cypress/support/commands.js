Cypress.Commands.add('login', (Uname, Pword) => { 

    cy
        .get(Cypress.env('Login_Signin_Nav'))
        .click()
    cy
        .get(Cypress.env('Login_email'))
        .type(Uname)
        .should('have.value', Uname)
    //------------------------------------------------
    cy
        .get(Cypress.env('Login_password'))
        .type(Pword)
        .should('have.value', Pword)
    //------------------------------------------------
    cy
        .get(Cypress.env('Login_Signin'))
        .click()
    //------------------------------------------------

})

Cypress.Commands.add('PreRegister', (Email) => { 
    
    cy
        .get(Cypress.env('Sign_in_btn'))
        .click()

    cy
        .get(Cypress.env('Create_acc_email'))
        .type(Email)
        .should('have.value', Email)

    cy
        .get(Cypress.env('Create_acc_create_btn'))
        .click()
})

Cypress.Commands.add('PersonalInformation_Input', (Title, Firstname, Lastname, Email, Password, DB_Day, DB_Month, DB_Year, NewsLetter, SpecialOffers) => { 

    //Title
    if(Title == "Mr"){

    cy
        .get(Cypress.env('Create_acc_TitleMr'))
        .click()

    }else{

    cy
        .get(Cypress.env('Create_acc_TitleMrs'))
        .click()
    }
    //Firstname
    cy
        .get(Cypress.env('Create_acc_FirstName'))
        .type(Firstname)
        .should('have.value', Firstname)

    //Lastname
    cy
        .get(Cypress.env('Create_acc_LastName'))
        .type(Lastname)
        .should('have.value', Lastname)
    //Email
    cy
        .get(Cypress.env('Create_acc_RegEmail'))
        .click()
        .should('have.value', Email)

    //Password
    cy
        .get(Cypress.env('Create_acc_password'))
        .type(Password)
        .should('have.value', Password)
    //Date of birth   DB_Day, DB_Month, DB_Year
    cy
        .get(Cypress.env('Create_acc_bdate_Day'))
        .select(DB_Day)

    cy
        .get(Cypress.env('Create_acc_bdate_Month'))
        .select(DB_Month)

    cy
        .get(Cypress.env('Create_acc_bdate_Year'))
        .select(DB_Year)
    //Newsletter & Special Offers    NewsLetter, SpecialOffers
    if(NewsLetter == "1")
    {
        cy
        .get(Cypress.env('Create_acc_Newsletter'))
        .click()
    }
    if(SpecialOffers == "1")
    {
        cy
        .get(Cypress.env('Create_acc_Offers'))
        .click()

    }


})

Cypress.Commands.add('AddressInformation_Input', (Firstname, Lastname, Company, Add1, Add2, City, State, Zipcode, Country, AddInfo, PhoneNum, MobilePhone, Allias) => {

     //Firstname
     cy
        .get(Cypress.env('Create_acc_add_FirstName'))
        .clear()
        .type(Firstname)
        .should('have.value', Firstname)

     //Lastname
     cy
        .get(Cypress.env('Create_acc_add_LastName'))
        .clear()
        .type(Lastname)
        .should('have.value', Lastname)

     //Company
     cy
        .get(Cypress.env('Create_acc_add_Company'))
        .clear(Company)
        .type(Company)
        .should('have.value', Company)

     //Address1
     cy
        .get(Cypress.env('Create_acc_add_Address1'))
        .type(Add1)
        .should('have.value', Add1)

     //Address2
     if(Add2 != null)
     {
        cy
        .get(Cypress.env('Create_acc_add_Address2'))
        .type(Add2)
        .should('have.value', Add2)
     }

     //City
     cy
        .get(Cypress.env('Create_acc_add_City'))
        .type(City)
        .should('have.value', City)
    //Country
      cy
      .get(Cypress.env('Create_acc_add_Country'))
      .select(Country)

     //State
     cy
        .get(Cypress.env('Create_acc_add_State'))
        .select(State)
        
     //Zipcode
     cy
        .get(Cypress.env('Create_acc_add_ZipCode'))
        .type(Zipcode)
        .should('have.value', Zipcode)
       

     //Additional information
     if(AddInfo != null)
     {
        cy
        .get(Cypress.env('Create_acc_add_AddInfo'))
        .type(AddInfo)
        .should('have.value', AddInfo)
     }
     //Phone
     cy
     .get(Cypress.env('Create_acc_add_HomePhone'))
     .type(PhoneNum)
     .should('have.value', PhoneNum)

     //MobilePhone
     cy
     .get(Cypress.env('Create_acc_add_MobilePhone'))
     .type(MobilePhone)
     .should('have.value', MobilePhone)

     //Allias
     cy
     .get(Cypress.env('Create_acc_add_Allias'))
     .clear()
     .type(Allias)
     .should('have.value', Allias)

     //Register - button
     
})

Cypress.Commands.add('Navigate_MyAddress', () => { 

    cy
    .get(Cypress.env('Home_MyAddress'))
    .click()
})

Cypress.Commands.add('Logout', () => { 

    cy
    .get(Cypress.env('Home_Signout'))
    .click()

    cy.log('Logout successful!')
    
})


