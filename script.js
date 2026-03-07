
// Saber quando o botão foi clicado
// Pegar o texto do input
// Colocar esse texto na tela
//conseguir editar o texto
//conseguir excluir a tarefa
//impedir mais de 9 tarefas e string vazia


const botaoAdicionar = document.querySelector("#botao-adicionar")
let ul = document.querySelector(".lista-tarefas")
let input = document.querySelector("input")

botaoAdicionar.addEventListener("click", () => {
    let texto = input.value.trim() //usando trim() pela primiera vez (serve pra tirar espaços antes e depois do texto)

    if (texto === "") {
        alert("Digite uma tarefa antes de adicionar.");
        return;
    }                                                                        //preciso validar antes de criar a <li/>

    if (ul.children.length >=10) {
        alert("Limite de 9 tarefas atingido.");
        return;
    }

    const li = document.createElement("li")

    li.innerHTML = texto + '<div class="acoes"><img src="fotos/edit-icon.svg" alt="Editar" class="edit-icon"><span class="excluir">X</span></div>'

    document.querySelector("ul").appendChild(li)

    input.value = ""

})

ul.addEventListener("click", (evento) => {
    if (evento.target.className ==="excluir"){
        const x = evento.target
        const liRemove = x.parentNode.parentNode
        liRemove.remove()
    }
    if (evento.target.className === "edit-icon"){
        const editar = evento.target
        const liEdite = editar.parentNode.parentNode
        const textoEditado = liEdite.firstChild.textContent.trim()
        const novoInput = document.createElement("input")
        novoInput.type = "text"
        novoInput.value = textoEditado
        novoInput.classList.add("input-edicao")
        liEdite.firstChild.replaceWith(novoInput) //usando replaceWith() pela primeira vez (ele remove o nó do DOM e coloca outro no lugar)

        novoInput.focus()

        novoInput.addEventListener("blur", () => {  //usando blur pela primeira vez (esse evento dispara quando o elemento perde o foco, usuario clica fora ou em outro campo, usado aqui para salvar a edição)
            const novoTexto = document.createTextNode(novoInput.value)
            novoInput.replaceWith(novoTexto)
        })
        
        novoInput.addEventListener("keydown", (evento) => {
            if (evento.key === "Enter") {
                novoInput.blur()
            }
        })
    }
})

