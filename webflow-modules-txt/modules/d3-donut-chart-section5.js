/**
 * D3.js Donut Chart System for Section 5 - Versão Webflow TXT
 * Creates donut charts grouped by asset categories in result comparison section
 * Versão sem imports/exports para uso direto no Webflow
 */

(function() {
  'use strict';

  class D3DonutChartSection5System {
    constructor() {
      this.isInitialized = false;
      this.charts = new Map();
      this.colorScale = null;
      this.categoryColors = {
        'Renda Fixa': '#a2883b',
        'Fundo de Investimento': '#e3ad0c',
        'Renda Variável': '#776a41',
        'Internacional': '#bdaa6f',
        'Outros': '#c0c0c0'
      };
      this.setupColorScale();
    }

    async init() {
      if (this.isInitialized) return;

      try {
        await this.loadD3();
        this.setupEventListeners();
        this.initializeCharts();
        this.isInitialized = true;

        document.dispatchEvent(new CustomEvent('donutChartSection5Ready'));
      } catch (error) {
        console.error('Failed to initialize D3DonutChartSection5System:', error);
      }
    }

    async loadD3() {
      if (window.d3) return;

      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/d3@7';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load D3.js'));
        document.head.appendChild(script);
      });
    }

    setupColorScale() {
      const colors = Object.values(this.categoryColors);
      this.colorScale = (category) => this.categoryColors[category] || '#c0c0c0';
    }

    setupEventListeners() {
      document.addEventListener('assetSelectionChanged', (e) => {
        this.handleAssetSelection();
      });

      document.addEventListener('patrimonioUpdated', (e) => {
        this.handlePatrimonyUpdate();
      });

      document.addEventListener('resultadoSyncCompleted', (e) => {
        this.handleResultadoSync();
      });

      document.addEventListener('allocationChanged', (e) => {
        this.handleAssetSelection();
      });
    }

    initializeCharts() {
      const tradicionalChart = document.querySelector('[chart-content="tradicional"][chart-type="donut"]');
      const reinoChart = document.querySelector('[chart-content="reino"][chart-type="donut"]');

      if (tradicionalChart) {
        this.createChart(tradicionalChart, 'tradicional');
      }

      if (reinoChart) {
        this.createChart(reinoChart, 'reino');
      }
    }

    createChart(container, type) {
      if (!container || !window.d3) return;

      container.innerHTML = '';

      const width = 200;
      const height = 200;
      const radius = Math.min(width, height) / 2 - 10;

      const svg = window.d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      const g = svg.append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      const pie = window.d3.pie()
        .value(d => d.value)
        .sort(null);

      const arc = window.d3.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius);

      const chart = {
        svg,
        g,
        pie,
        arc,
        container,
        type,
        width,
        height,
        radius
      };

      this.charts.set(type, chart);
      this.updateChart(type);
    }

    handleAssetSelection() {
      this.updateAllCharts();
    }

    handlePatrimonyUpdate() {
      this.updateAllCharts();
    }

    handleResultadoSync() {
      this.updateAllCharts();
    }

    updateAllCharts() {
      this.charts.forEach((chart, type) => {
        this.updateChart(type);
      });
      this.updateListVisibility();
    }

    updateChart(type) {
      const chart = this.charts.get(type);
      if (!chart) return;

      const data = this.getChartData(type);
      
      if (!data || data.length === 0) {
        chart.g.selectAll('*').remove();
        return;
      }

      const paths = chart.g.selectAll('path')
        .data(chart.pie(data));

      paths.enter()
        .append('path')
        .merge(paths)
        .attr('d', chart.arc)
        .attr('fill', d => this.colorScale(d.data.category))
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);

      paths.exit().remove();

      if (window.Motion) {
        paths.style('opacity', 0)
          .transition()
          .duration(800)
          .style('opacity', 1);
      }
    }

    getChartData(type) {
      const patrimonioItems = document.querySelectorAll('.patrimonio_interactive_item');
      const data = [];

      patrimonioItems.forEach(item => {
        const category = item.getAttribute('ativo-category');
        const product = item.getAttribute('ativo-product');
        const input = item.querySelector('[input-settings="receive"]');
        
        if (!input || !category || !product) return;

        const value = this.parseCurrencyValue(input.value);
        if (value <= 0) return;

        let cost = 0;
        if (type === 'tradicional' && window.calcularCustoProduto) {
          const resultado = window.calcularCustoProduto(value, category, product);
          cost = resultado.custoMedio || 0;
        } else if (type === 'reino' && window.calcularCustoReino) {
          const totalPatrimony = window.ReinoEventCoordinator ? 
            this.parseCurrencyValue(window.ReinoEventCoordinator.getValue()) : 0;
          const reinoResult = window.calcularCustoReino(totalPatrimony);
          cost = (value / totalPatrimony) * reinoResult.custoAnual;
        }

        data.push({
          category,
          product,
          value: cost,
          originalValue: value,
          label: `${category} - ${product}`
        });
      });

      return data.filter(d => d.value > 0);
    }

    updateListVisibility() {
      const tradicionalList = document.querySelector('[chart-content="tradicional"][chart-type="list"]');
      const reinoList = document.querySelector('[chart-content="reino"][chart-type="list"]');

      if (tradicionalList) {
        this.updateListData(tradicionalList, 'tradicional');
      }

      if (reinoList) {
        this.updateListData(reinoList, 'reino');
      }
    }

    updateListData(container, type) {
      const data = this.getChartData(type);
      
      container.innerHTML = '';

      data.forEach(item => {
        const listItem = document.createElement('div');
        listItem.className = 'chart-list-item';
        listItem.style.cssText = `
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        `;

        const colorDot = document.createElement('span');
        colorDot.style.cssText = `
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: ${this.colorScale(item.category)};
          display: inline-block;
          margin-right: 8px;
        `;

        const label = document.createElement('span');
        label.textContent = item.label;
        label.style.flex = '1';

        const value = document.createElement('span');
        value.textContent = this.formatCurrency(item.value);
        value.style.fontWeight = 'bold';

        const labelContainer = document.createElement('div');
        labelContainer.style.display = 'flex';
        labelContainer.style.alignItems = 'center';
        labelContainer.appendChild(colorDot);
        labelContainer.appendChild(label);

        listItem.appendChild(labelContainer);
        listItem.appendChild(value);
        container.appendChild(listItem);
      });
    }

    parseCurrencyValue(value) {
      if (!value || typeof value !== 'string') return 0;
      const cleanValue = value.replace(/[^\d,]/g, '').replace(',', '.');
      return parseFloat(cleanValue) || 0;
    }

    formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    }

    getChart(type) {
      return this.charts.get(type);
    }

    destroyChart(type) {
      const chart = this.charts.get(type);
      if (chart && chart.container) {
        chart.container.innerHTML = '';
        this.charts.delete(type);
      }
    }

    destroyAllCharts() {
      this.charts.forEach((chart, type) => {
        this.destroyChart(type);
      });
    }

    refresh() {
      this.updateAllCharts();
    }
  }

  // Cria instância global
  window.ReinoD3DonutChartSection5System = new D3DonutChartSection5System();

  // Auto-inicialização
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.ReinoD3DonutChartSection5System.init();
    });
  } else {
    window.ReinoD3DonutChartSection5System.init();
  }

})();