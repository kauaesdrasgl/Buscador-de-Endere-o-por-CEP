async function buscarCEP() {
    const cep = document.getElementById('cep').value;
    const resultadoDiv = document.getElementById('resultado');

    resultadoDiv.innerHTML = "Buscando...";

    if (cep.length !== 8) {
        resultadoDiv.innerHTML = "Por favor, digite um cep válido cm 8 números.";
        return;
    }

    try {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.erro) {
            resultadoDiv.innerHTML = "CEP não encontrado.";
        } else {
            resultadoDiv.innerHTML = `
            <p><strong>Logradouro:</strong> ${dados.logradouro}</p>
            <p><strong>Bairro:</strong> ${dados.bairro}</p>
            <p><strong>Cidade:</strong> ${dados.localidade} - ${dados.uf}</p>`;

            document.getElementById('cep').value = '';
            document.getElementById('cep').focus();
        
        }
    } catch (erro) {
        resultadoDiv.innerHTML = "Erro ao conectar na API. Tente novamente mais tarde";
        console.error(erro);
    }
}

function limparTudo() {
    document.getElementById('cep').value = '';
    document.getElementById('resultado').innerHTML = ''
    document.getElementById('cep').focus();
}
