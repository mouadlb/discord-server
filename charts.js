document.addEventListener('DOMContentLoaded', function() {
  // Chart color schemes that adapt to theme
  function getChartColors() {
    const isDark = document.documentElement.classList.contains('dark');
    return {
      blue: isDark ? 'rgba(59, 130, 246, 0.8)' : 'rgba(37, 99, 235, 0.8)',
      lightBlue: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(37, 99, 235, 0.2)',
      grid: isDark ? 'rgba(55, 65, 81, 0.2)' : 'rgba(209, 213, 219, 0.3)',
      text: isDark ? 'rgba(209, 213, 219, 0.8)' : 'rgba(55, 65, 81, 0.8)'
    };
  }
  
  // Chart initialization
  function initCharts() {
    const colors = getChartColors();
    
    // Visitors Chart
    const visitorsChartEl = document.getElementById('visitorsChart');
    if (visitorsChartEl) {
      const visitorsChart = new Chart(visitorsChartEl, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Visitors',
            data: [520, 780, 440, 890, 760, 1020, 850],
            borderColor: colors.blue,
            backgroundColor: colors.lightBlue,
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: colors.text
              }
            },
            y: {
              grid: {
                color: colors.grid
              },
              ticks: {
                color: colors.text,
                maxTicksLimit: 5,
                callback: function(value) {
                  return value >= 1000 ? value / 1000 + 'k' : value;
                }
              }
            }
          }
        }
      });
    }
    
    // Traffic Sources Chart
    const trafficChartEl = document.getElementById('trafficChart');
    if (trafficChartEl) {
      const trafficChart = new Chart(trafficChartEl, {
        type: 'doughnut',
        data: {
          labels: ['Direct', 'Social Media', 'Search', 'Referrals'],
          datasets: [{
            data: [35, 25, 22, 18],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)', 
              'rgba(245, 158, 11, 0.8)',
              'rgba(139, 92, 246, 0.8)'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: colors.text,
                boxWidth: 12,
                padding: 15
              }
            }
          },
          cutout: '75%'
        }
      });
    }
  }
  
  // Initialize charts
  initCharts();
  
  // Redraw charts on theme change
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      // Wait for DOM to update
      setTimeout(initCharts, 100);
    });
  }
});
