function confronto(jogador1, jogador2) {
  // Sorteia se é casco ou bomba
  const tipos = [
    { nome: 'casco', pontos: -1, figura: '🐢' },   // emoji de casco
    { nome: 'bomba', pontos: -2, figura: '💣' }    // emoji de bomba
  ];
  const tipo = tipos[Math.floor(Math.random() * tipos.length)];

  // Aplica penalidade a ambos
  jogador1.pontos += tipo.pontos;
  jogador2.pontos += tipo.pontos;

  // Sorteia vencedor do confronto
  const vencedor = Math.random() < 0.5 ? jogador1 : jogador2;
  vencedor.pontos += 1; // Ganha turbo

  return {
    tipo: tipo.nome,
    penalidade: tipo.pontos,
    vencedor: `${vencedor.nome} ${tipo.figura}` // Nome + figura
  };
}

// Exemplo de uso:
const jogador1 = { nome: 'Mario', pontos: 5 };
const jogador2 = { nome: 'Luigi', pontos: 5 };

const resultado = confronto(jogador1, jogador2);
console.log(resultado, jogador1, jogador2);