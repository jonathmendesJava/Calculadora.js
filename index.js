const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

document.querySelectorAll('.charKey').forEach(function(charKeyBnt){ //para cada um botão .charKey
    charKeyBnt.addEventListener('click', function(){
        const value = charKeyBnt.dataset.value //acessar valor do butão (data-value). dataset serve para acessar essa parte.
        input.value += value // atribuindo o value acessado no data-value ao input
    })
})

document.getElementById('clear').addEventListener('click', function(){
    input.value = '' //limpando input quando clicado em clear
    input.focus() //metodo serve para focar no input assim que limpo o cursor volta ao input automaticamente, voce n precisa clicar para digitar novamente no input.
})

input.addEventListener('keydown', function(ev){
    ev.preventDefault()

    if(allowedKeys.includes(ev.key)){ //if para filtrar teclas no input. Restringindo apenas aquelas que vamos usar no array.
        input.value += ev.key // se tecla inserida, estiver incluva no nosso array(caracter valido), inserir manualmente no valor.
        return
    }
    if(ev.key === 'Backspace'){ //if para apagar numeros indesejados no input
        input.value = input.value.slice(0, -1) //se input por backspace,(silce = cortar caracter) valor sera cortado pelo slice e retornar porção especifica caracter inicial e enviar -1, excluir o ultimo.
    }
    if(ev.key === 'Enter'){
        calculate()
    }
})

document.getElementById('equal').addEventListener('click', calculate) // passando diretamente a funcao de calcular

function calculate(){
    const result = eval(input.value); //função perigosa para usuarios, podendo passar scripts pelo input.
    resultInput.value = result
}

document.getElementById('copyToClipboard').addEventListener('click', function(ev){
    const button = ev.currentTarget
    if(button.innerText === 'Copy'){
        button.innerText = 'Copied!' //quando copiado, mudado o texto para copied
        button.classList.add('success') //mudando a cor para tbm para algo ja deixado no style
        navigator.clipboard.writeText(resultInput.value) //copiando o valor do resultado usando funçao do window de copia clipboard.writeText para texto
    }
})

document.getElementById('themeSwitcher').addEventListener('click', function(){ //trocando tema do calc
     if(main.dataset.theme === 'dark'){  //se cor estiver em dark
        root.style.setProperty('--bg-color', '#f1f5f9') //mudando as variaveis do css para a troca do tema
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#26834a')
        main.dataset.theme = 'light' //mudando para claro
     }else{ //senao
        root.style.setProperty('--bg-color', '#212529') //alternando para o padrão
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--primary-color', '#4dff91')
        main.dataset.theme = 'dark' //mudando para escuro
     }
})