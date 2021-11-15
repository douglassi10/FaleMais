// concatena origem e destino e obtem o preco por minuto
function obterPreco(origem, destino) {
    od = origem + destino;
    listaprecos = []

    /* preços pre definidos nos pares chaves-valor, a chave é a concatenaçao da origem e destino
     enquanto o valor corresponde ao preço correspondente */
    listaprecos.push({'011016': 1.90});
    listaprecos.push({'016011': 2.90});
    listaprecos.push({'011017': 1.70});
    listaprecos.push({'017011': 2.70});
    listaprecos.push({'011018': 0.90});
    listaprecos.push({'018011': 1.90});
    
    listaprecos.push({'016017': 2.30});
    listaprecos.push({'016018': 3.90});
    listaprecos.push({'017016': 3.30});
    listaprecos.push({'017018': 3.10});
    listaprecos.push({'018016': 3.80});
    listaprecos.push({'018017': 3.70});

    const preco = listaprecos.find(obj => obj[od]);
    return preco[od];
}

class Ligacao {
    constructor() {
        this.origem = '';
        this.destino = '';
        this.tempo = 0;
        this.plano = '';
    }

    obterDados() {
        let ligacao = {}
        ligacao.origem = document.getElementById('o').value;
        ligacao.destino = document.getElementById('d').value;
        ligacao.tempo = document.getElementById('minutos').value;
        ligacao.plano = document.getElementById('plano').value;
        return ligacao; 
    }

    comPlano() {
        /* as instruções de comPlano e semPlano só são executadas se validar()
        retornar o valor true situacao em que os campos estarão todos preenchidos */
        if(this.validar()){
            let ligacao = this.obterDados();
            var precom = obterPreco(ligacao.origem, ligacao.destino);
            
            if(ligacao.plano == 'FaleMais 30'){
                // tempo total menos os minutos gratis
                var tpg = ligacao.tempo - 30;
                var result = (tpg * precom) + (tpg * precom * 0.1);
                if(result < 0){
                    result = 0;
                }
                document.getElementById("com").textContent = "Preço com Plano: R$ " + result.toFixed(2);
            }
            
            if(ligacao.plano == 'FaleMais 60'){
                // tempo total menos os minutos gratis
                var tpg = ligacao.tempo - 60;
                var result = (tpg * precom) + (tpg * precom * 0.1);
                if(result < 0){
                    result = 0;
                }
                document.getElementById("com").textContent = "Preço com Plano: R$ " + result.toFixed(2);
            }

            if(ligacao.plano == 'FaleMais 120'){
                // tempo total menos os minutos gratis
                var tpg = ligacao.tempo - 120;
                var result = (tpg * precom) + (tpg * precom * 0.1);
                if(result < 0){
                    result = 0;
                }
                document.getElementById("com").textContent = "Preço com Plano: R$ " + result.toFixed(2);
            }
            // semPlano() é chamada logo após a comPlano()
            this.semPlano()
        }    
    }
    
    semPlano() {
        let ligacao = this.obterDados();
        var precom = obterPreco(ligacao.origem, ligacao.destino);
        var result = precom * ligacao.tempo;
        document.getElementById("sem").textContent = "Preço sem Plano: R$ " + result.toFixed(2);
    }

    validar(){
        let ligacao = this.obterDados();
        if(ligacao.origem == ligacao.destino) {
            document.getElementById("alerta").innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">\
            <strong> Origem e destino precisam ser diferentes ! </strong>\
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\
            </div>';
            return false;
        }

        if(ligacao.origem == 'Origem' || ligacao.destino == 'Destino'){
            document.getElementById("alerta").innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">\
            <strong> Os campos origem e destino devem ser preenchidos ! </strong>\
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\
            </div>';
            return false;
        }

        if(ligacao.plano == 'Plano'){
            document.getElementById("alerta").innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">\
            <strong> Pelo menos um plano deve ser escolhido ! </strong>\
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\
            </div>';
            return false;
        }

        if(ligacao.tempo < 1){
            document.getElementById("alerta").innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">\
            <strong> É necessário pelo menos um minuto de ligação ! </strong>\
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\
            </div>';
            return false;
        }
        
        return true;
    } 
}

var ligacao = new Ligacao();