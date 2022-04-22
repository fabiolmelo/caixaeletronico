const test = require('tape')
const caixaEletronicoTest = require('./tests/CaixaEletronico.test')
 

caixaEletronicoTest.testAtualizarSaldoCaixaEletronico();
caixaEletronicoTest.testInstanciaCaixaEletronico();
caixaEletronicoTest.testSacarValorMaiorQueDisponível();
caixaEletronicoTest.testSacarValorIndisponivelPelaFaltaDeCedula();
caixaEletronicoTest.testSacar();
