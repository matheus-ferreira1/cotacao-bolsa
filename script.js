function fillForm(dados) {
    if (dados.change_percent < 0) {
        document.getElementById('variacao').className = 'goRed';
        document.getElementById('cotacao').className = 'goRed'
    } else {
        document.getElementById('variacao').className = 'goGreen'
        document.getElementById('cotacao').className = 'goGreen'
    }
    document.getElementById('nome').value = dados.name;
    document.getElementById('cotacao').value = ` R$ ${dados.price}`;
    document.getElementById('variacao').value = `${dados.change_percent}%`;
    document.getElementById('lastUpdate').value = dados.updated_at
}

async function fazerCotacao() {
    let papel = document.getElementById('papel').value

    const url = `https://api.hgbrasil.com/finance/stock_price?format=json-cors&key=9211c9ea&symbol=${papel}`

    if (papel == '') {
        alert('Por favor, insira um ativo')
    } else {
        let request = new XMLHttpRequest()
        request.open("GET", url, false)
        request.send()
        let bruto =  JSON.parse(request.responseText)
        let dadosRaw = bruto.results
        let dados = Object.values(dadosRaw)
        dados = dados[0]
       // console.log(dados)
        if (dados.hasOwnProperty('error')) {
            alert('Ativo não encontrado')
        } else {
            fillForm(dados)
        }
    }
}

function clearAll() {
    document.getElementById('papel').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('cotacao').value = '';
    document.getElementById('variacao').value = '';
    document.getElementById('lastUpdate').value = '';
}