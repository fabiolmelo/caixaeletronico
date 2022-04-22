class CaixaEletronico {
    
    #notasInfo = []; 

    constructor(notas100, notas50, notas20, notas10){
        
        this.#notasInfo.push([100, parseInt(notas100), 0]);
        this.#notasInfo.push([50, parseInt(notas50), 0]);
        this.#notasInfo.push([20, parseInt(notas20), 0]);
        this.#notasInfo.push([10, parseInt(notas10), 0]);
        
        this.saldoDisponivelNoCaixa = this.atualizarSaldoDoCaixa(this.#notasInfo);
        this.multiploSaque = 10;  /* variável que corresponde a nota de menor valor do caixa para verificação se o valor do saque
                                     é multiplo deste valor e liberar o saque*/
    }

    sacar(valorSaque){
        if (!this.verificarSeSaldoAtualPermiteSaque(valorSaque)) {
            console.log('\nErro. Valor solicitado acima do valor disponível no Caixa Eletrônico.');
            return false;
        }
        if (!this.verificarSeValorInformadoPermiteSaque(valorSaque)) {
            console.log('\nErro. Valor solicitado não é multiplo das notas disponíveis.');
            return false;
        }
        this.notasRetirar = this.desmembrarNotasParaSaque(valorSaque)
        if (!this.notasRetirar){
            console.log('\nErro. Cédula Indisponível para relizar o saque do valor solicitado.');
            return false;
        } else {
            console.log('\nSaque realizado com sucesso! Retirado: ');
            this.#notasInfo.forEach( (elemento) => {
                elemento[1] -= elemento[2];
                if (elemento[2]>0){
                    console.log(`${elemento[2]} nota(s) de R$ ${elemento[0].toFixed(2)}.`);
                }
            });
            this.saldoDisponivelNoCaixa = this.atualizarSaldoDoCaixa(this.#notasInfo);
        }       
        return true;
    }

    desmembrarNotasParaSaque(valorSaque){
        this.valorSaque = valorSaque;
        this.#notasInfo.forEach((elemento) => {
            this.qtdeNotas = (Math.trunc(this.valorSaque / elemento[0]) >= elemento[1]) ? elemento[1] 
                                                                                        : Math.trunc(this.valorSaque / elemento[0]);
            this.valorSaque -= (this.qtdeNotas * elemento[0]);
            elemento[2] = this.qtdeNotas;
         });
         if (this.valorSaque > 0) {
             return false;
         }
         return true;
    }

    saldoAtualDoCaixa(){
        return (this.saldoDisponivelNoCaixa);
    }

    atualizarSaldoDoCaixa(notas){
        let soma = 0;
        notas.forEach((elemento) => {
           soma += elemento[0] * elemento[1];
        });
        return (soma);
    }
    
    verificarSeSaldoAtualPermiteSaque(valorSacar) {
        return (valorSacar <= this.saldoDisponivelNoCaixa)
    }

    /******
    * Verificar se o valor solicitado é multiplo de 10 para conseguir realizar saque
    */
    verificarSeValorInformadoPermiteSaque(valorSacar){
        return ( valorSacar % this.multiploSaque === 0 );
    }

    notasDisponiveis(){
        let notasRetorno = '';
        this.#notasInfo.forEach((element) => {
            if(element !== undefined){
                notasRetorno += `R$ ${element[0].toFixed(2)} - ${element[1]} nota(s) disponíveis.\n`
            }
        });
        return notasRetorno;
    }
    
    infoNotas(){
        return this.#notasInfo;
    }     
}

module.exports = {CaixaEletronico};