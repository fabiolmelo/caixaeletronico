const CaixaEletronico = require('./model/CaixaEletronico');
const readlineSync = require('readline-sync');
const caixaEletronico = new CaixaEletronico.CaixaEletronico(10,10,10,10);

console.log('\n----------- Simulador de Retirada de Notas em um Caixa Eletrônico -------------\n');
console.log('Realizando a abertura do caixa eletrônico...');

while (caixaEletronico.saldoAtualDoCaixa() > 0) {

    console.log('\nSaldo de Caixa - R$ ' + caixaEletronico.saldoAtualDoCaixa().toFixed(2));
    console.log(caixaEletronico.notasDisponiveis());

    var valorSaque = parseInt(readlineSync.question('\nDigite o valor a sacar ou CTRL+C para sair: '));

    if(!caixaEletronico.sacar(valorSaque)){
        console.log('Saque não realizado. Repita a operação!');
    }    

}; 

console.log('\nSaldo de Caixa - R$ ' + caixaEletronico.saldoAtualDoCaixa().toFixed(2));
console.log(caixaEletronico.notasDisponiveis());
console.log('\nO caixa eletrônico foi encerrado!');
