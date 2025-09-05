class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    const animais = new Map([
      ["Rex", { tipo: "cão", brinquedos: ["RATO", "BOLA"] }],
      ["Mimi", { tipo: "gato", brinquedos: ["BOLA", "LASER"] }],
      ["Fofo", { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] }],
      ["Zero", { tipo: "gato", brinquedos: ["RATO", "BOLA"] }],
      ["Bola", { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] }],
      ["Bebe", { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] }],
      ["Loco", { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] }]
    ]);

    const brinquedosValidos = new Set(["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"]);

    let brinquedosPessoa1Disponiveis = brinquedosPessoa1.split(",").map(x => x.trim());
    let brinquedosPessoa2Disponiveis = brinquedosPessoa2.split(",").map(x => x.trim());
    const listaAnimais = ordemAnimais.split(",").map(x => x.trim());

    const maxAnimais = 3;
    let cont1 = 0, cont2 = 0;
    const resultado = new Map();

    function validarBrinquedos(listaBrinquedos) {
      const vistos = new Set();
      for (let brinquedo of listaBrinquedos) {
        if (!brinquedosValidos.has(brinquedo) || vistos.has(brinquedo)) {
          return false;
        }
        vistos.add(brinquedo);
      }
      return true;
    }

    function contemAnimalNaOrdem(preferenciaAnimal, brinquedosDisponiveis) {
      return preferenciaAnimal.every(brinquedo => brinquedosDisponiveis.includes(brinquedo));
    }

    if (!validarBrinquedos(brinquedosPessoa1Disponiveis) || !validarBrinquedos(brinquedosPessoa2Disponiveis)) {
      return { erro: "Brinquedo inválido" };
    }

    const vistosAnimais = new Set();
    for (let a of listaAnimais) {
      if (!animais.has(a) || vistosAnimais.has(a)) {
        return { erro: "Animal inválido" };
      }
      vistosAnimais.add(a);
    }

    for (let animal of listaAnimais) {
      const info = animais.get(animal);
      const brinquedosNecessarios = info.brinquedos;

      const prefere1 = contemAnimalNaOrdem(brinquedosNecessarios, brinquedosPessoa1Disponiveis);
      const prefere2 = contemAnimalNaOrdem(brinquedosNecessarios, brinquedosPessoa2Disponiveis);

      if (prefere1 && prefere2) {
        resultado.set(animal, "abrigo");
        continue;
      }

      if (prefere1 && cont1 < maxAnimais) {
        resultado.set(animal, "pessoa 1");
        cont1++;
        brinquedosPessoa1Disponiveis = brinquedosPessoa1Disponiveis.filter(b => !brinquedosNecessarios.includes(b));
      } else if (prefere2 && cont2 < maxAnimais) {
        resultado.set(animal, "pessoa 2");
        cont2++;
        brinquedosPessoa2Disponiveis = brinquedosPessoa2Disponiveis.filter(b => !brinquedosNecessarios.includes(b));
      } else {
        resultado.set(animal, "abrigo");
      }
    }

    return {
      lista: [...resultado.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([animal, dono]) => `${animal} - ${dono}`)
    };
  }
}

export { AbrigoAnimais as AbrigoAnimais };