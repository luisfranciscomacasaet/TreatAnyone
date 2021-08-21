//===========================================================================
//=================================INFORMATION===============================
//
// Data is stored under fixtures
//
//    Registration data: Account_Data.json
//    Notes: Please update EmailUsed every after successfull registration
//
//    Add address data: Add_Address_Data.json
//    Notes: Please update EmailUsed to what to match with the email used in
//           Account_Data.json
//===========================================================================
//===========================================================================


describe('Create an account email error handling validation', function(){
   
    it('Open site',function(){
      
        cy.visit("http://automationpractice.com/index.php")

        cy.url().should('include', 'automationpractice')
    
    })

    it('Check if Email is left empty' ,function(){
        cy
            .get(Cypress.env('Login_Signin_Nav'))
            .click()
        
        cy
            .get(Cypress.env('Create_acc_email'))
            .click()
            .type(" ")

        cy
            .get(Cypress.env('Create_acc_create_btn'))
            .click()

        cy
            .get(Cypress.env('Login_Create_Account_Error_Container'))
            .should(($Checking) => {
                expect($Checking).to.contain("Invalid email address.")

            })    
        cy
            .get(Cypress.env('Create_acc_email'))
            .should(($CSSval) => {

                expect($CSSval).to.have.css('color', 'rgb(241, 51, 64)')
                expect($CSSval).to.have.css('background-image', 'url("http://automationpractice.com/themes/default-bootstrap/img/icon/form-error.png")')

            })
    })
    it('Check if Email has invalid format' ,function(){
        cy.reload()
        
        cy
            .get(Cypress.env('Create_acc_email'))
            .click()
            .type("Invalid email format")

        cy
            .get(Cypress.env('Create_acc_create_btn'))
            .click()
            
        cy
            .get(Cypress.env('Login_Create_Account_Error_Container'))
            .should(($Checking) => {
                expect($Checking).to.contain("Invalid email address.")

            })
        cy
            .get(Cypress.env('Create_acc_email'))
            .should(($CSSval) => {

                expect($CSSval).to.have.css('color', 'rgb(241, 51, 64)')
                expect($CSSval).to.have.css('background-image', 'url("http://automationpractice.com/themes/default-bootstrap/img/icon/form-error.png")')

            })
    })
    it('Check for existing registered email.' ,function(){
        cy.reload()
        
        cy
            .get(Cypress.env('Create_acc_email'))
            .click()
            .type("luisfrancisco.macasaet@gmail.com")

        cy
            .get(Cypress.env('Create_acc_create_btn'))
            .click()
            
        cy
            .get(Cypress.env('Login_Create_Account_Error_Container'))
            .should(($Checking) => {
                expect($Checking).to.contain("An account using this email address has already been registered.")

            })
        cy
            .get(Cypress.env('Create_acc_email'))
            .should(($CSSval) => {

                expect($CSSval).to.have.css('color', 'rgb(53, 179, 63)')
                expect($CSSval).to.have.css('background-image', 'url("http://automationpractice.com/themes/default-bootstrap/img/icon/form-ok.png")')

            })
    })
})
describe('Create an account creation error handling validation', function(){
    it('Open site',function(){
      
        cy.visit("http://automationpractice.com/index.php")

        cy.url().should('include', 'automationpractice')
    
    })
    it('Leaving all fields empty' ,function(){
        cy
            .get(Cypress.env('Login_Signin_Nav'))
            .click()
        
        cy
            .get(Cypress.env('Create_acc_email'))
            .click()
            .type("test123@tester.com")

        cy
            .get(Cypress.env('Create_acc_create_btn'))
            .click()

        cy
            .get(Cypress.env('Create_acc_add_Register'))
            .click()
    })
    it('Validating required fields' ,function(){
        
        cy
            .get(Cypress.env('Create_acc_add_Error_Container'))
            .should(($Checking) => {
                expect($Checking).to.contain("You must register at least one phone number.")
                expect($Checking).to.contain("lastname is required.")
                expect($Checking).to.contain("firstname is required.")
                expect($Checking).to.contain("passwd is required.")
                expect($Checking).to.contain("address1 is required.")
                expect($Checking).to.contain("city is required.")
                expect($Checking).to.contain("This country requires you to choose a State.")
                expect($Checking).to.contain("It must follow this format: 00000")
            })
    })


})

describe('Login error handling validation', function(){
   let Email = "luisfrancisco.macasaet@gmail.com"
    it('Open site',function(){
      
        cy.visit("http://automationpractice.com/index.php")

        cy.url().should('include', 'automationpractice')
    
    })
    it('Login with email only',function(){
        cy.reload()

        cy.login(Email, " ")
        cy
            .get(Cypress.env('Login_Login_Error_Container'))
            .should(($Checking) => {
                expect($Checking).to.contain("Password is required.")
            })
        cy.url().should('include', 'authentication')
    })
    it('Login with password only',function(){
        cy.reload()

        cy.login(" ", "password123")
        cy
            .get(Cypress.env('Login_Login_Error_Container'))
            .should(($Checking) => {
                expect($Checking).to.contain("An email address required.")
            })
        cy.url().should('include', 'authentication')
    })
    it('Login with invalid email address',function(){
        cy.login("Invalid email", "password123")
        
        cy
            .get(Cypress.env('Login_Login_Error_Container'))
            .should(($Checking) => {
                expect($Checking).to.contain("Invalid email address.")
            })
        cy.url().should('include', 'authentication')
    })
    
    it('Login with unregistered account',function(){
        
        cy.reload()

        cy.login("Unregistered@email.com", "password123")
        cy
            .get(Cypress.env('Login_Login_Error_Container'))
            .should(($Checking) => {
                expect($Checking).to.contain("Authentication failed.")
            })
        cy.url().should('include', 'authentication')
    })

})

describe('New user registration', function(){

    it('Open site',function(){
      
        cy.visit("http://automationpractice.com/index.php")

        cy.url().should('include', 'automationpractice')
    
    })

    for(let i = 0; i < 3; i++)
    {

    it('Account creation | Iteration: '+(i+1),function(){
    cy
    .fixture('Account_Data')
    .then(Account_Data => {
        
        cy.PreRegister(Account_Data.User_Accounts[i].EmailUsed)
        

        //Adding Address information
        cy.log('Inputting personal information')
        cy.PersonalInformation_Input(
            Account_Data.User_Accounts[i].Title, 
            Account_Data.User_Accounts[i].Firstname, 
            Account_Data.User_Accounts[i].Lastname, 
            Account_Data.User_Accounts[i].EmailUsed, 
            Account_Data.User_Accounts[i].Password, 
            Account_Data.User_Accounts[i].DB_Day, 
            Account_Data.User_Accounts[i].DB_Month, 
            Account_Data.User_Accounts[i].DB_Year, 
            Account_Data.User_Accounts[i].NewsLetter, 
            Account_Data.User_Accounts[i].SpecialOffers
            )
        
        //Adding Address information
        cy.log('Inputting address information')
        cy.AddressInformation_Input(
            Account_Data.User_Accounts[i].Firstname, 
            Account_Data.User_Accounts[i].Lastname, 
            Account_Data.User_Accounts[i].Company,
            Account_Data.User_Accounts[i].Add1, 
            Account_Data.User_Accounts[i].Add2, 
            Account_Data.User_Accounts[i].City, 
            Account_Data.User_Accounts[i].State, 
            Account_Data.User_Accounts[i].Zipcode, 
            Account_Data.User_Accounts[i].Country, 
            Account_Data.User_Accounts[i].AddInfo,
            Account_Data.User_Accounts[i].PhoneNum, 
            Account_Data.User_Accounts[i].MobilePhone, 
            Account_Data.User_Accounts[i].Allias
            )
        cy
        .get(Cypress.env('Create_acc_add_Register'))
        .click()

        cy.url().should('include', 'my-account')
        cy.Logout()

    })
})  

}
})

describe('Update user address', function(){
    
    before(() => {
      
        cy.visit("http://automationpractice.com/index.php")
    
    })
    for(let i = 0; i < 3; i++)
    {
      
        it('Login using account: Iteration: '+(i+1), function(){
            cy
            .fixture('Add_Address_Data')
            .then(Acc => {
             cy.login(
                 Acc.User_Accounts[i].EmailUsed, 
                 Acc.User_Accounts[i].Password
                 )
            })

        })

        it('Navigate to MY ADDRESS',function(){

            cy.Navigate_MyAddress()

        })

        it('Add new address to ', function(){
           
            
            cy
                .get(Cypress.env('Home_AddNewAddress'))
                .click()
            cy
            .fixture('Add_Address_Data')
            .then(Acc => {
                cy.log('Adding address to '+Acc.User_Accounts[i].EmailUsed)
                cy.log('Name: '+Acc.User_Accounts[i].Firstname,+' '+Acc.User_Accounts[i].Lastname)
               
                //Adding Address information
                cy.AddressInformation_Input(
                    Acc.User_Accounts[i].Firstname, 
                    Acc.User_Accounts[i].Lastname, 
                    Acc.User_Accounts[i].Company, 
                    Acc.User_Accounts[i].Add1, 
                    Acc.User_Accounts[i].Add2, 
                    Acc.User_Accounts[i].City, 
                    Acc.User_Accounts[i].State, 
                    Acc.User_Accounts[i].Zipcode, 
                    Acc.User_Accounts[i].Country, 
                    Acc.User_Accounts[i].AddInfo,
                    Acc.User_Accounts[i].PhoneNum, 
                    Acc.User_Accounts[i].MobilePhone, 
                    Acc.User_Accounts[i].Allias
                    )

            })

            cy
            .get(Cypress.env('Add_Address_Save'))
            .click()

        })

        it('Validating newly added address', function(){
            cy
            .fixture('Add_Address_Data')
            .then(Acc => {

                cy
                .get(Cypress.env('Address_Added_Container'))
                .should(($p) => {
                    expect($p).to.contain(Acc.User_Accounts[i].Allias)
                    expect($p).to.contain(Acc.User_Accounts[i].Firstname)
                    expect($p).to.contain(Acc.User_Accounts[i].Lastname)
                    expect($p).to.contain(Acc.User_Accounts[i].Company)
                    expect($p).to.contain(Acc.User_Accounts[i].PhoneNum)
                    expect($p).to.contain(Acc.User_Accounts[i].MobilePhone)

                 }) 

                
            })
            cy.Logout()

        })
    }

})

