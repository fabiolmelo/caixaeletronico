const test = require('tape')
const caixaEletronico = require('../model/CaixaEletronico');

function testInstanciaCaixaEletronico(){
    test('Criar Instancia do Caixa Eletrônico com 1 nota de cada valor', (t) => {
        const novoCaixa = new caixaEletronico.CaixaEletronico(1,1,1,1);
        t.assert(novoCaixa.saldoAtualDoCaixa() === 180, "Instancia do caixa criado corretamente.");
        t.end()  
    })    
}

function testAtualizarSaldoCaixaEletronico(){
    test('Testar a função de Atualizar Saldo e verificar se o cálculo do saldo está correto', (t) => {
        const novoCaixa = new caixaEletronico.CaixaEletronico(10,10,10,10);
        t.assert(novoCaixa.atualizarSaldoDoCaixa([[100,10],[50,10],[20,10],[10,10]]) === 1800, "Saldo atualizado corretamente");
        t.end()  
    })
}

function testSacarValorMaiorQueDisponível(){
    test('Sacar valor maior que disponível', (t) => {
        const novoCaixa = new caixaEletronico.CaixaEletronico(1,1,1,1);
        t.assert(novoCaixa.sacar(250) === false, "Não permite sacar valor maior que o saldo");
        t.end()  
    })  
}

function testSacarValorIndisponivelPelaFaltaDeCedula(){
    test('Sacar valor disponível pelo saldo mas indisponível por falta de cédula', (t) => {
        const novoCaixa = new caixaEletronico.CaixaEletronico(0,1,0,1); 
        t.assert(novoCaixa.sacar(40) === false, "Não permite sacar valor R$40, tendo R$60 de saldo mas apenas notas de R$50 e R$10 no caixa");
        t.end()  
    })  
}

function testSacar(){
    test('Iniciando caixa com R$ 180,00, sendo 1 nota de cada valor, e testando a saída de notas menores após retiradas de notas maiores', (t) => {
        const novoCaixa = new caixaEletronico.CaixaEletronico(1,1,1,1);        
        
        // sacando a única nota de R$ 100,00
        t.assert(novoCaixa.sacar(100) === true, "Saque de R$ 100,00 efetuado");
        var infoNotas = novoCaixa.infoNotas();
        t.assert(JSON.stringify(infoNotas) === JSON.stringify([ [ 100, 0, 1 ], [ 50, 1, 0 ],[ 20, 1, 0 ], [ 10, 1, 0 ] ]), 
            "Retirado-se 1 nota de R$ 100, sobrando 1 nota de cada outro valor");

        // sacando a única nota de R$ 50,00
        t.assert(novoCaixa.sacar(50) === true, "Saque de R$ 50,00 efetuado");
        infoNotas = novoCaixa.infoNotas();
        t.assert(JSON.stringify(infoNotas) === JSON.stringify([ [ 100, 0, 0 ], [ 50, 0, 1 ],[ 20, 1, 0 ], [ 10, 1, 0 ] ]), 
            "Retirado-se 1 nota de R$ 50, sobrando 1 nota de cada outro valor menor");

        // sacando a única nota de R$ 20,00
        t.assert(novoCaixa.sacar(20) === true, "Saque de R$ 20,00 efetuado");
        infoNotas = novoCaixa.infoNotas();
        t.assert(JSON.stringify(infoNotas) === JSON.stringify([ [ 100, 0, 0 ], [ 50, 0, 0 ],[ 20, 0, 1 ], [ 10, 1, 0 ] ]), 
            "Retirado-se 1 nota de R$ 20, sobrando 1 nota de R$ 10");

        // sacando a nota de R$ 10,00 restante
        t.assert(novoCaixa.sacar(10) === true, "Saque de R$ 10,00 efetuado");
        infoNotas = novoCaixa.infoNotas();        
        t.assert(JSON.stringify(infoNotas) === JSON.stringify([ [ 100, 0, 0 ], [ 50, 0, 0 ],[ 20, 0, 0 ], [ 10, 0, 1 ] ]), 
            "Retirado-se a última nota de R$ 10 e zerando o caixa");
            
        t.end()  
    })  
}
module.exports = {testInstanciaCaixaEletronico, testAtualizarSaldoCaixaEletronico, testSacarValorMaiorQueDisponível, testSacar,
        testSacarValorIndisponivelPelaFaltaDeCedula}
