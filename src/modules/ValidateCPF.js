export default class ValidateCPF {
  constructor(CPFsended) {
    
    Object.defineProperty(this, "cleanCPF", {
      writable: false,
      enumerable: false,
      configurable: false,
      value: CPFsended.replace(/\D+/g, ""),
    });
  }
  
  ifSequells() {
    return this.cleanCPF.charAt(0).repeat(11) === this.cleanCPF; 
  }
  generateNewCPF() {
    const CPFwithoutDigit = this.cleanCPF.slice(0, -2);
    const digito1 = ValidateCPF.generateDigit(CPFwithoutDigit); 
    const digito2 = ValidateCPF.generateDigit(CPFwithoutDigit + digito1); 
    this.newCPF = CPFwithoutDigit + digito1 + digito2 
  }
  
  static generateDigit(CPFwithoutDigit) {
    let total = 0; 
    let reverse = CPFwithoutDigit.length + 1; 
    for (let stringNumerica of CPFwithoutDigit) {
      total += reverse * Number(stringNumerica);
      reverse--; 
    }
    const digit = 11 - (total % 11) 
    return digit <= 9 ? String(digit) : '0' 
  }
  
  valida() {
    if (!this.cleanCPF) return false; 
    if (typeof this.cleanCPF !== "string") return false; 
    if (this.cleanCPF.length !== 11) return false; 
    if (this.ifSequells()) return false; 
    if (!this.generateNewCPF()) 

    return this.newCPF === this.cleanCPF 
  }
}





