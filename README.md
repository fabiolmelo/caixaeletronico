---------------- Descrição do Problema - Simulador de Caixa Eletrônico ---------------------------

Abaixo segue a descrição de como resolvi o problema proposto (fiz com cédulas finitas para aumentar a dificuldade conforme o enunciado):

1) Criei a classe CaixaEletronico tendo como propriedade principal uma matriz multidimensional com 4 linhas representando a informação de cada cédula disponível para saque, conforme o enunciado do problema, sendo (100,50,20,10) e 3 colunas sendo a coluna 1 para guardar o valor da cédula correspondente, a segunda para guardar a quantidade de célula na máquina e a terceira para armazenar a quantidade de cédula que será retirada em cada saque. A classe possui um construtor que já inicializa a matriz com os valores no momento que for instanciada. 

2) No início do solução, é gerada uma instância da classe CaixaEletrônico e é solicitado, via input de dados, o valor a sacar.

3) De posse do valor, no passo seguinte é feita a chamada do método "sacar()" passando o valor como parâmetro. Em seguida, são feitas duas verificações iniciais, sendo a primeira verificar se o valor informado é maior que o saldo disponível e a segunda verificar se o valor não é múltiplo da menor nota do caixa, que no caso é de R$10. Sendo qualquer uma das verificações verdadeira, retorna falso e não realiza o saque. Na sequência, é realizado o cálculo das notas a liberar no saque, que é feito pelo método "desmembrarNotasParaSaque" da seguinte forma:

    a) Pego o valor total do saque e divido pelo valor da primeira nota (R$ 100,00) e do resultado, pego somente o valor inteiro para comparar com a quantidade disponível de notas de R$100. Se a quantidade disponível da nota de R$100 for menor que o valor obtido  armazeno na linha 1, coluna 3 da matriz o valor disponível caso contrário armazeno o número obtivo no cálculo. Multiplico o valor da nota R$100 por este número guardado e gero um valor que abato do valor do saque gerando um saldo.

    b) Repito o processo dividindo o valor do saldo pelo valor da segunda nota (R$50), armazeno na linha 2, coluna 3 da matriz e gero novo saldo.

    c) Repito para as notas de R$20 e R$10.

    d) O objetivo é o saldo ficar com valor zero após o ultimo passo com a nota de R$10. Se o valor do saldo ficar positivo, o método "sacar()" retorna falso e não permito o saque. Sobra-se saldo se o caixa não tiver uma cédula específica para compor o valor. Exemplo, o caixa tem 1 nota de R$50 disponível e pede-se pra sacar R$30. Ele vai passar na verificação de saldo mas não tem como fazer o saque por não ter 1 cédula de R$20 e 1 de R$10 ou 3 cédulas de R$10.

    e) E finalmente, com o saldo acima zerado, atualizo a matriz abatendo da coluna 2 (valor atual) o valor da coluna 3 (valor sacado) gerando a nova quantidade de cédulas disponíveis após o saque. Uso o método "atualizarSaldoDoCaixa()" para atualizar a propriedade de saldo e retorno tela as informação das cédulas retiradas.



---------------- Instruções para executar a solução ---------------------------
1) Copiar a estrutura do projeto para o servidor que tenha o Node instalado
2) Navegar para o diretório raiz na aplicação e executar o arquivo server.js usando o comando: node server


---------------- Instruções para rodar os testes automatizados ---------------------------
1) Navegar para o diretório raiz na aplicação e executar o comando: npm test

