import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Tesouro extends Component {

  transformandoValor() {

    let valor = this.props.match.params.valor;
    let valores = this.props.match.params.valores;
    console.log(valor)
    console.log(valores)

    if (valor === "2mil") {

      let valorInt = 2000;
      return valorInt;
    } else {
      let valorInt = 10000;
      return valorInt;
    }

  }

  transformandoAno() {

    let ano = this.props.match.params.ano;

    if (ano === "1ano") {

      let anoInt = 2019;
      return anoInt;
    } else {

      let anoInt = 2018;
      return anoInt;
    }

  }

  quantidadeDias(ano) {

    if (ano === 2019) {

      let diaAtual = new Date();
      let diasReal = 366;
      let diaInicial = diasReal + diaAtual.getDate();
      return diaInicial;
    } else {

      let diaAtual = new Date();
      let diasReal = 732;
      let diaInicial = diasReal + diaAtual.getDate();
      return diaInicial;
    }

  }

  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingRight = 20;

    let valor = this.transformandoValor();
    let ano = this.transformandoAno();
    let dias = this.quantidadeDias(ano);
    let mes = new Date();
    let data = [];
    let tesouroDir = valor;
    let bitcoin = valor;


    for (let i = 10; i <= dias; i++) {

      tesouroDir += (tesouroDir * 0.000378);
      data.push({ date: new Date(ano, mes.getMonth(), i), value: tesouroDir });
    }

    for (var i = 10; i <= dias; i++) {
      bitcoin += (bitcoin * 0.00010);
      data.push({ date2: new Date(ano, mes.getMonth(), i), bitcoin: bitcoin });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis2.renderer.grid.template.location = 0;
    dateAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.name = "Tesouro Direto Pré-Fixado"
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.name = "Bitcoin";
    series2.dataFields.dateX = "date2";
    series2.dataFields.valueY = "bitcoin";

    series2.tooltipText = "{valueY.value}";
    series2.stroke = am4core.color("#ffa500");
    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis2;

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;

    chart.legend = new am4charts.Legend();
    chart.legend.parent = chart.plotContainer;
    chart.legend.zIndex = 100;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}

export default Tesouro;
