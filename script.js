class Calculator{
    constructor(prevopTextElement, curropTextElement) {
        this.prevopTextElement = prevopTextElement
        this.curropTextElement = curropTextElement
        this.clear()
      }
    
      clear() {
        this.currop = ''
        this.prevop = ''
        this.operation = undefined
      }
    
    delete(){
        this.currop = this.currop.toString().slice(0, -1)


    }
    appendNumber(number) {
        if (number === '.' && this.currop.includes('.')) return
        this.currop = this.currop.toString() + number.toString()
      }
      chooseOperation(operation) {
        if (this.currop === '') return
        if (this.prevop !== '') {
          this.compute()
        }
        this.operation = operation
        this.prevop = this.currop
        this.currop = ''
      } 
         compute()
    {
        let computation
        const prev = parseFloat(this.prevop)
        const current = parseFloat(this.currop)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '*':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          default:
            return
        }
        this.currop = computation
        this.operation = undefined
        this.prevop = ''
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    updateDisplay(){
        this.curropTextElement.innerText=this.currop
        this.getDisplayNumber(this.currop)

        if (this.operation != null) {
            this.prevopTextElement.innerText =
              `${this.getDisplayNumber(this.prevop)} ${this.operation}`
          } else {
            this.prevopTextElement.innerText = ''
          }
      
    }
}
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevopTextElement = document.querySelector('[data-previous-operand]')
const curropTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(prevopTextElement, curropTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })
  
  





