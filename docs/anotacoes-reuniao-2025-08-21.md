# Anotações da Reunião — Tela de Produto e Cálculo de Comissão

> Gerado por IA. Certifique-se de verificar a precisão.
> Participantes: Carlus Eduardo, João Lucas

## Sumário

- [Anotações da Reunião — Tela de Produto e Cálculo de Comissão](#anotações-da-reunião--tela-de-produto-e-cálculo-de-comissão)
  - [Sumário](#sumário)
  - [Ajustes no Layout da Tela de Produto](#ajustes-no-layout-da-tela-de-produto)
  - [Cálculo da Comissão e Fatores de Giro](#cálculo-da-comissão-e-fatores-de-giro)
  - [Esclarecimento Sobre Corretagem e Índice de Giro](#esclarecimento-sobre-corretagem-e-índice-de-giro)
  - [Diretrizes para Implementação e Próximos Passos](#diretrizes-para-implementação-e-próximos-passos)
  - [Tarefas de acompanhamento](#tarefas-de-acompanhamento)

## Ajustes no Layout da Tela de Produto

- Decisão: Página única com as informações principais à esquerda e detalhes adicionais à direita, aproveitando todo o espaço da tela para facilitar a visualização.
- Detalhes:
  - A parte principal da tela deve ser deslocada para a esquerda; detalhes permanecem à direita.
  - Após os ajustes, a tela inteira poderá ser usada para exibir informações sem sobrecarga visual.
- Visibilidade para o cliente:
  - Visível: produto escolhido, categoria, média de corretagem, comissão anual, comissão estimada, valor investido.
  - Oculto ao usuário final: prazo médio e fator de giro.

## Cálculo da Comissão e Fatores de Giro

- Contexto: Explicação do cálculo da comissão média anual e estimada, fatores envolvidos e regras por tipo de produto.
- Fórmula: comissão média anual = (média de corretagem ÷ prazo médio em anos) × fator de giro.
- Interatividade: O usuário controla o índice de giro apenas após visualizar o resultado; diferentes níveis alteram a comissão estimada. O fator de giro permanece oculto e pré‑definido para o cliente.
- Regras específicas:
  - Fundos de investimento e previdência: fator de giro fixo em 1, independentemente das alterações do usuário.
- Exemplo prático: Demonstração com valores fictícios mostrando como a alteração do índice de giro impacta diretamente a comissão estimada.

## Esclarecimento Sobre Corretagem e Índice de Giro

- Corretagem: Valor pago ao intermediador por cada transação (ex.: 5 BRL por operação).
- Índice de giro: Mede a frequência de movimentação da carteira; índices maiores implicam mais operações e maior comissão para o assessor/gestor.
- Transparência: Clientes normalmente não conhecem em detalhe o impacto do índice de giro; a interface buscará dar mais clareza.

## Diretrizes para Implementação e Próximos Passos

- Ações solicitadas: Revisar as lógicas de cálculo e o layout proposto; encaminhar dúvidas e preparar ajustes.
- Alinhamento de prazos: Novas adições podem impactar o prazo inicial; prioridade é revisar mudanças antes de redefinir datas.
- Comunicação: Envio da transcrição e informações relevantes; manter contato para esclarecimentos durante a implementação.

## Tarefas de acompanhamento

- [ ] Enviar a transcrição completa da reunião para João Lucas. (Responsável: Carlus Eduardo)
- [ ] Analisar layout e lógica, preparar dúvidas/sugestões para a reunião do dia seguinte. (Responsável: João Lucas)
