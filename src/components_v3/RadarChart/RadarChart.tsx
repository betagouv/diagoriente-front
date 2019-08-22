import Chart from 'chart.js';

const RadarChart = (ctx: any, get: any) => {

    const competences = get.data.globalCopmetences;
    const competencesTitle = competences.map((c: any) => c.title);
    const competencesValue = competences.map((c: any) => c.value);

    const chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(231,233,237)'
    };

    /*     const randomScalingFactor = function () {
            return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
        }
     */
    const randomScalingFactor = function () {
        return Math.round(Math.random() * 100);
    };

    const { color } = Chart.helpers;
    const config = {
        type: 'radar',
        data: {
            labels: competencesTitle,
            datasets: [{
                label: 'Mes compétences',
                backgroundColor: color(chartColors.purple).alpha(0.2).rgbString(),
                borderColor: chartColors.purple,
                pointBackgroundColor: chartColors.purple,
                data: competencesValue,
            }, {
                label: 'Compétences du métier',
                backgroundColor: color(chartColors.blue).alpha(0.2).rgbString(),
                borderColor: chartColors.blue,
                pointBackgroundColor: chartColors.blue,
                data: [2, 3, 4, 3, 1, 1, 2],
            }],
        },
        options: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Compétences requises'
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                    display: true,
                    min: 0,
                    max: 4,
                    stepSize: 1,
                }
            }/*,
             tooltips: {
                enabled: false,
                callbacks: {
                    label: function (tooltipItem: any, data: any) {
                        const datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
                        //This will be the tooltip.body
                        return datasetLabel + ': ' + tooltipItem.yLabel + ': ' + data.datasets[tooltipItem.datasetIndex].notes[tooltipItem.index];
                    }
                },
                custom: function (tooltip: any) {
                    // Tooltip Element
                    let tooltipEl = document.getElementById('chartjs-tooltip');
                    if (!tooltipEl) {
                        tooltipEl = document.createElement('div');
                        tooltipEl.id = 'chartjs-tooltip';
                        tooltipEl.innerHTML = "<table></table>"
                        document.body.appendChild(tooltipEl);
                    }
                    // Hide if no tooltip
                    if (tooltip.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
                    }
                    // Set caret Position
                    tooltipEl.classList.remove('above', 'below', 'no-transform');
                    if (tooltip.yAlign) {
                        tooltipEl.classList.add(tooltip.yAlign);
                    } else {
                        tooltipEl.classList.add('no-transform');
                    }
                    function getBody(bodyItem) {
                        return bodyItem.lines;
                    }
                    // Set Text
                    if (tooltip.body) {
                        const titleLines = tooltip.title || [];
                        const bodyLines = tooltip.body.map(getBody);
                        const innerHtml = '<thead>';
                        titleLines.forEach(function (title) {
                            innerHtml += '<tr><th>' + title + '</th></tr>';
                        });
                        innerHtml += '</thead><tbody>';
                        bodyLines.forEach(function (body, i) {
                            const colors = tooltip.labelColors[i];
                            const style = 'background:' + colors.backgroundColor;
                            style += '; border-color:' + colors.borderColor;
                            style += '; border-width: 2px';
                            const span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
                            innerHtml += '<tr><td>' + span + body + '</td></tr>';
                        });
                        innerHtml += '</tbody>';
                        const tableRoot = tooltipEl.querySelector('table');
                        tableRoot.innerHTML = innerHtml;
                    }
                    const position = this._chart.canvas.getBoundingClientRect();
                    // Display, position, and set styles for font
                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.left = position.left + tooltip.caretX + 'px';
                    tooltipEl.style.top = position.top + tooltip.caretY + 'px';
                    tooltipEl.style.fontFamily = tooltip._fontFamily;
                    tooltipEl.style.fontSize = tooltip.fontSize;
                    tooltipEl.style.fontStyle = tooltip._fontStyle;
                    tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
                }
             } */
        },
    };

    return new Chart(ctx, config as any);
};

export default RadarChart;