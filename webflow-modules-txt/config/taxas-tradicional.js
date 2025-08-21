/**
 * Configuração das Taxas do Modelo Tradicional - Versão Webflow TXT
 * Baseado na especificação TAXAS_REINO_VS_TRADICIONAL.md
 * Versão sem imports/exports para uso direto no Webflow
 */

(function() {
  'use strict';

  const TAXAS_TRADICIONAL = {
    'Renda Fixa': {
      'CDB': { min: 1.00, max: 1.50, media: 1.25, nome: 'CDB,LCI,LCA' },
      'CRI': { min: 3.00, max: 5.50, media: 4.25, nome: 'CRI,CRA,DEBENTURE' },
      'Títulos Públicos': { min: 3.00, max: 5.50, media: 4.25, nome: 'Títulos Públicos' }
    },
    'Fundo de Investimento': {
      'Ações': { min: 0.50, max: 1.00, media: 0.75, nome: 'Ações' },
      'Liquidez': { min: 0.20, max: 0.50, media: 0.35, nome: 'Liquidez' },
      'Renda Fixa': { min: 0.30, max: 0.80, media: 0.55, nome: 'Renda Fixa' },
      'Multimercado': { min: 0.30, max: 0.80, media: 0.55, nome: 'Multimercado' },
      'Imobiliários': { min: 0.20, max: 0.50, media: 0.35, nome: 'Imobiliários' },
      'Private Equity': { min: 1.00, max: 2.00, media: 1.50, nome: 'Private Equity' }
    },
    'Renda Variável': {
      'Ações': { min: 0.10, max: 0.30, media: 0.20, nome: 'Ações' },
      'Estruturada': { min: 3.50, max: 7.00, media: 5.25, nome: 'Estruturada' },
      'Carteira administrada': { min: 1.50, max: 1.50, media: 1.50, nome: 'Carteira administrada' }
    },
    'Internacional': {
      'Ouro': { min: 1.00, max: 2.00, media: 1.50, nome: 'Ouro' },
      'Dólar': { min: 1.00, max: 2.00, media: 1.50, nome: 'Dólar' },
      'ETF': { min: 1.00, max: 2.00, media: 1.50, nome: 'ETF' }
    },
    'Outros': {
      'Poupança': { min: 0.20, max: 0.20, media: 0.20, nome: 'Poupança' },
      'Previdência': { min: 0.50, max: 1.50, media: 1.00, nome: 'Previdencia' },
      'Imóvel': { min: 0.50, max: 1.00, media: 0.75, nome: 'Imóvel' },
      'COE': { min: 5.00, max: 6.00, media: 5.50, nome: 'COE' },
      'Operação compromissada': { min: 0.30, max: 0.50, media: 0.40, nome: 'Operação compromissada' },
      'Criptoativos': { min: 0.00, max: 0.00, media: 0.00, nome: 'Criptoativos' }
    }
  };

  const MAPEAMENTO_ATRIBUTOS = {
    'Renda Fixa:CDB': 'Renda Fixa.CDB',
    'Renda Fixa:CRI': 'Renda Fixa.CRI',
    'Renda Fixa:Títulos Públicos': 'Renda Fixa.Títulos Públicos',
    
    'Fundo de Investimento:Ações': 'Fundo de Investimento.Ações',
    'Fundo de investimento:Ações': 'Fundo de Investimento.Ações',
    'Fundo de Investimento:Liquidez': 'Fundo de Investimento.Liquidez',
    'Fundo de investimento:Liquidez': 'Fundo de Investimento.Liquidez',
    'Fundo de Investimento:Renda Fixa': 'Fundo de Investimento.Renda Fixa',
    'Fundo de investimento:Renda Fixa': 'Fundo de Investimento.Renda Fixa',
    'Fundo de Investimento:Multimercado': 'Fundo de Investimento.Multimercado',
    'Fundo de investimento:Multimercado': 'Fundo de Investimento.Multimercado',
    'Fundo de Investimento:Imobiliários': 'Fundo de Investimento.Imobiliários',
    'Fundo de investimento:Imobiliários': 'Fundo de Investimento.Imobiliários',
    'Fundo de Investimento:Private Equity': 'Fundo de Investimento.Private Equity',
    'Fundo de investimento:Private Equity': 'Fundo de Investimento.Private Equity',
    
    'Renda Variável:Ações': 'Renda Variável.Ações',
    'Renda variável:Ações': 'Renda Variável.Ações',
    'Renda Variável:Estruturada': 'Renda Variável.Estruturada',
    'Renda variável:Estruturada': 'Renda Variável.Estruturada',
    'Renda Variável:Carteira administrada': 'Renda Variável.Carteira administrada',
    'Renda variável:Carteira administrada': 'Renda Variável.Carteira administrada',
    
    'Internacional:Ouro': 'Internacional.Ouro',
    'Internacional:Dólar': 'Internacional.Dólar',
    'Internacional:ETF': 'Internacional.ETF',
    
    'Outros:Poupança': 'Outros.Poupança',
    'Outros:Previdência': 'Outros.Previdência',
    'Outros:Imóvel': 'Outros.Imóvel',
    'Outros:COE': 'Outros.COE',
    'Outros:Operação compromissada': 'Outros.Operação compromissada',
    'Outros:Criptoativos': 'Outros.Criptoativos'
  };

  function obterTaxaPorAtributos(category, product) {
    const chave = `${category}:${product}`;
    const caminho = MAPEAMENTO_ATRIBUTOS[chave];
    
    if (!caminho) {
      console.warn(`⚠️ Taxa não encontrada para: ${chave}`);
      return null;
    }
    
    const [cat, prod] = caminho.split('.');
    return TAXAS_TRADICIONAL[cat]?.[prod] || null;
  }

  function calcularCustoProduto(valorAlocado, category, product) {
    const taxaConfig = obterTaxaPorAtributos(category, product);
    
    if (!taxaConfig || valorAlocado <= 0) {
      return {
        valorAlocado: valorAlocado,
        taxaMinima: 0,
        taxaMaxima: 0,
        taxaMedia: 0,
        custoMinimo: 0,
        custoMaximo: 0,
        custoMedio: 0,
        produto: product,
        categoria: category
      };
    }
    
    const custoMinimo = valorAlocado * (taxaConfig.min / 100);
    const custoMaximo = valorAlocado * (taxaConfig.max / 100);
    const custoMedio = valorAlocado * (taxaConfig.media / 100);
    
    return {
      valorAlocado: valorAlocado,
      taxaMinima: taxaConfig.min,
      taxaMaxima: taxaConfig.max,
      taxaMedia: taxaConfig.media,
      custoMinimo: custoMinimo,
      custoMaximo: custoMaximo,
      custoMedio: custoMedio,
      produto: taxaConfig.nome,
      categoria: category
    };
  }

  function obterCategorias() {
    return Object.keys(TAXAS_TRADICIONAL);
  }

  function obterProdutosCategoria(categoria) {
    return Object.keys(TAXAS_TRADICIONAL[categoria] || {});
  }

  // Exporta globalmente
  window.TAXAS_TRADICIONAL = TAXAS_TRADICIONAL;
  window.MAPEAMENTO_ATRIBUTOS = MAPEAMENTO_ATRIBUTOS;
  window.obterTaxaPorAtributos = obterTaxaPorAtributos;
  window.calcularCustoProduto = calcularCustoProduto;
  window.obterCategorias = obterCategorias;
  window.obterProdutosCategoria = obterProdutosCategoria;

})();