// Dados fictícios para o gráfico com mais variações
var historicalData = [
    3200, 3220, 3195, 3235, 3280, 3250, 
    3245, 3290, 3310, 3300, 3350, 3330, 
    3365, 3380, 3375, 3400, 3425, 3410, 
    3430, 3455, 3440, 3420, 3450, 3465, 
    3480, 3475, 3490, 3515, 3500, 3525, 
    3540, 3535, 3550, 3570, 3560, 3585
];

var predictedData = [
    3200, 3225, 3190, 3240, 3275, 3255, 
    3250, 3285, 3305, 3305, 3345, 3325, 
    3370, 3385, 3380, 3410, 3430, 3415, 
    3440, 3460, 3445, 3430, 3460, 3470, 
    3495, 3490, 3500, 3520, 3510, 3530, 
    3550, 3545, 3565, 3580, 3575, 3590
];

var labels = [
    '2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01', '2023-06-01',
    '2023-07-01', '2023-08-01', '2023-09-01', '2023-10-01', '2023-11-01', '2023-12-01',
    '2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01', '2024-05-01', '2024-06-01',
    '2024-07-01', '2024-08-01', '2024-09-01', '2024-10-01', '2024-11-01', '2024-12-01',
    '2025-01-01', '2025-02-01', '2025-03-01', '2025-04-01', '2025-05-01', '2025-06-01',
    '2025-07-01', '2025-08-01', '2025-09-01', '2025-10-01', '2025-11-01', '2025-12-01'
];

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Histórico S&P 500',
            data: historicalData,
            borderColor: 'white',
            borderWidth: 1,
            fill: false,
            pointRadius: 2
        }, {
            label: 'Previsto S&P 500',
            data: predictedData,
            borderColor: 'rgba(0, 255, 0, 0.5)', // Opacidade inicial
            borderWidth: 2,
            fill: false,
            pointRadius: 2
        }]
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month'
                },
                ticks: {
                    fontColor: 'white'
                },
                gridLines: {
                    color: '#333'
                }
            },
            y: {
                ticks: {
                    fontColor: 'white'
                },
                gridLines: {
                    color: '#333'
                }
            }
        }
    }
});

// Função para animar a linha de previsão com efeito de brilho
let isBrightening = true;
function animateGlowingLine() {
    const dataset = myChart.data.datasets[1];
    const currentOpacity = parseFloat(dataset.borderColor.split(",")[3].slice(0, -1));
    
    if (isBrightening) {
        dataset.borderColor = `rgba(0, 255, 0, ${Math.min(currentOpacity + 0.01, 1)})`;
        if (currentOpacity >= 1) isBrightening = false;
    } else {
        dataset.borderColor = `rgba(0, 255, 0, ${Math.max(currentOpacity - 0.01, 0.1)})`;
        if (currentOpacity <= 0.5) isBrightening = true;
    }

    myChart.update();
    requestAnimationFrame(animateGlowingLine);
}

// Inicia a animação de brilho
animateGlowingLine();

// Atualização do preço previsto e ação
document.getElementById('predictedPrice').textContent = "3585.00";
document.getElementById('buyOrSell').textContent = "COMPRA";
