import ValidaCPF from "./ValidateCPF";

export default class FormValidate {
    constructor() {
        this.form = document.querySelector('.form')
        this.events(); 
    }
   
    events(){
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e)
            this.saveForm()
        })
    }
    
    handleSubmit(e){
        e.preventDefault();
        const validField = this.validFields();
        const validPassword = this.validPasswords()

    
        if(validField && validPassword){
            alert('Membership sended')

        }
        
    }
    
    validPasswords(){
        let valid  = true 
        const password = this.form.querySelector('.password')
        const cpassword = this.form.querySelector('.c-password')
        
        if (password.value !== cpassword.value){
            this.createError(password, 'passwords do not match') 
            this.createError(cpassword, 'passwords do not match')
            return valid = false 
        }
        
        if(password.value.length < 6 || password.value.length > 12){
            this.createError(password, 'invalid password') 
            return valid = false
        }

        return valid 
    }

    
    validFields(){
        let valid = true 

        
        for(let errorText of this.form.querySelectorAll('.error-text')){
            errorText.remove() 
        }
        
        for(let field of this.form.querySelectorAll('.validate')) {
            const label = field.previousElementSibling.innerText 
            if(!field.value) {
                this.createError(field, `The field ${label} cannot be blank.`) 
                valid = false 
            }

            
            if(field.classList.contains('cpf')){ 
                if(!this.ValidateCPF(field)) valid = false
            }
            
            if(field.classList.contains('user')){
                if(!this.validadeUser(field)) valid = false
            }
        }
        return valid 
    }
    
    validadeUser(field){ 
        const user = field.value  
        let valid = true 
        if(user.length < 3 || user.length > 12){
            this.createError(field, 'invalid user') 
            return valid = false 
        }
        
        if(!user.match(/^[a-zA-Z0-9]+$/g)){
            this.createError(field, 'invalid user')
            return valid = false
        }

        return valid 
    }

    
    ValidateCPF(field) {
        const cpf = new ValidaCPF(field.value)
        
        if(!cpf.valida()){
            this.createError(field, 'invalid CPF') 
            return false 
        }

        return true
    }
     
    createError(field, msg) {
        const div = document.createElement('div') 
        div.innerHTML = msg; 
        div.classList.add('error-text') 
        field.insertAdjacentElement('afterend', div) 
    }

    saveForm(){
        const formValues = this.form.querySelectorAll('input');
        const formValuesText = [];
        
        for(let values of formValues){ 
            let valuesText = values.value 
            formValuesText.push(valuesText) 
        }

        //agora criamos o json dessa forma 
        const formJSON = JSON.stringify(formValuesText)
        localStorage.setItem('Members', formJSON)  
    }
    

}