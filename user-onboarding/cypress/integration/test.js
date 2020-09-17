describe('Testing for Sign Up page', () => {

   beforeEach('visit local host', () => {

      cy.visit('http://localhost:3001/')

   })
      

   it('show the proper elements', () => {

      cy.get('input[name="name"]')
         .should('exist')
      
      cy.get('input[name="email"]')
         .should('exist')
      
      cy.get('input[name="password"]')
         .should('exist')

      cy.get('input[name="termStatus"]')
         .should('exist')

      cy.get('button[type="submit"]')
         .should('exist')

   })

   it('type and check and in the inputs', () => {

      cy.get('input[name="name"]')
         .should('have.value', '')
         .type('Joseph Kim')
         .should('have.value', 'Joseph Kim')
      
      cy.get('input[name="email"]')
         .should('have.value', '')
         .type('sunkist5691@gmail.com')
         .should('have.value', 'sunkist5691@gmail.com')
      
      cy.get('input[name="password"]')
         .should('have.value', '')
         .type('12345672323')
         .should('have.value', '12345672323')

      cy.get('input[name="termStatus"]')
         .check()
         .should('be.checked')
      
      cy.get('button[type="submit"]')
         .should('not.be.disabled')

   })

   it('Submit button enable to clicked after every inputs are filled out', () => {

      // Name Input
      cy.get('button[type="submit"]').should('be.disabled')
      cy.get('input[name="name"]').type('Joseph Kim')
      cy.get('button[type="submit"]').should('be.disabled')
      
      // Email Input
      cy.get('button[type="submit"]').should('be.disabled')
      cy.get('input[name="email"]').type('sunkist5691@gmail.com')
      cy.get('button[type="submit"]').should('be.disabled')

      // Password Input
      cy.get('button[type="submit"]').should('be.disabled')
      cy.get('input[name="password"]').type('12345672323')
      cy.get('button[type="submit"]').should('be.disabled')

      // Term Input
      cy.get('button[type="submit"]').should('be.disabled')
      cy.get('input[name="termStatus"]').check().should('be.checked')
      cy.get('button[type="submit"]').should('not.be.disabled')

      cy.get('button[type="submit"]').click()

   })

})