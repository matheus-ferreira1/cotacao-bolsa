let btnCotacao = document.querySelector('#btnCotacao') 
let btnClear = document.querySelector('#btnClear')
let ibov = document.querySelector('.ibov')
let ifix = document.querySelector('.ifix')
let btc = document.querySelector('.btc')
let dowjones = document.querySelector('.dowjones')
let nasdaq = document.querySelector('.nasdaq')


btnCotacao.addEventListener('click', fazerCotacao)
btnClear.addEventListener('click', clearAll)

function pageFirstRender() {
    const url1 = `https://api.hgbrasil.com/finance/?format=json-cors&key=9211c9ea`
    let request = new XMLHttpRequest()
        request.open("GET", url1, false)
        request.send()
    let bruto =  JSON.parse(request.responseText)
    let rawData = bruto.results
    
    console.log(rawData)

    ibov.innerHTML = `
        <h4>IBOV</h4>
        <h5>${new Intl.NumberFormat().format(rawData.stocks.IBOVESPA.points.toFixed(2))}</h5>
        <h5>${rawData.stocks.IBOVESPA.variation.toFixed(2)}%</h5>
    `
    ifix.innerHTML = `
        <h4>IFIX</h4>
        <h5>${new Intl.NumberFormat('pt-BR').format(rawData.stocks.IFIX.points.toFixed(2))}</h5>
        <h5>${rawData.stocks.IFIX.variation.toFixed(2)}%</h5>
    `
    btc.innerHTML = `
        <h4>Bitcoin</h4>
        <h5>R$ ${new Intl.NumberFormat('pt-BR').format(rawData.bitcoin.mercadobitcoin.last.toFixed(2))}</h5>
        <h5>${rawData.bitcoin.mercadobitcoin.variation.toFixed(2)}%</h5>
    `
    dowjones.innerHTML = `
        <h4>Dow Jones</h4>
        <h5>${new Intl.NumberFormat().format(rawData.stocks.DOWJONES.points.toFixed(2))}</h5>
        <h5>${rawData.stocks.DOWJONES.variation.toFixed(2)}%</h5>
    `
    nasdaq.innerHTML = `
        <h4>Nasdaq</h4>
        <h5>${new Intl.NumberFormat().format(rawData.stocks.NASDAQ.points.toFixed(2))}</h5>
        <h5>${rawData.stocks.NASDAQ.variation.toFixed(2)}%</h5>
    `
}

function fillForm(dados) {
    if (dados.change_percent < 0) {
        document.getElementById('variacao').className = 'goRed';
        document.getElementById('cotacao').className = 'goRed'
    } else {
        document.getElementById('variacao').className = 'goGreen'
        document.getElementById('cotacao').className = 'goGreen'
    }
    document.getElementById('nome').value = dados.name;
    document.getElementById('cotacao').value = `R$ ${dados.price}`;
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
            alert('Ativo n??o encontrado')
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

// var options = {
//     chart: {
//       type: 'line'
//     },
//     series: [{
//       name: 'sales',
//       data: [30,40,35,50,49,60,70,91,125]
//     }],
//     xaxis: {
//       categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
//     }
//   }
  
//   var chart = new ApexCharts(document.querySelector("#chart"), options);
  
//   chart.render();