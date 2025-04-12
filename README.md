# Tuberculosis Interactive Visualization Dashboard

[![GitHub Pages Deployment](https://img.shields.io/badge/demo-live%20demo-brightgreen)](https://yourusername.github.io/tb-interactive-dashboard/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An interactive web-based dashboard for exploring tuberculosis infection patterns through multiple coordinated visualizations.

![Dashboard Preview](src/assets/dashboard-preview.gif)

## ✨ Key Features
- **Multi-view Visualization System**
  - Force-directed graph for entity relationships
  - Leaflet-powered geospatial mapping
  - Animated timeline with play/pause controls
  - Hierarchical data views (TreeMap & Sunburst)
  
- **Interactive Features**
  - Cross-filtering between visualizations
  - Dynamic tooltips with data snapshots
  - Responsive design (desktop/tablet/mobile)
  - Theme switcher (light/dark modes)

- **Data Management**
  - Automated data cleaning pipeline
  - Outlier detection and handling
  - Temporal-spatial normalization
  - Privacy-preserving aggregation

## 🚀 Live Demo
Experience the dashboard directly:  
[https://yourusername.github.io/tb-interactive-dashboard/](https://yourusername.github.io/tb-interactive-dashboard/)

## 🛠️ Installation
1. Clone repository:
    ```bash
    git clone https://github.com/yourusername/tb-interactive-dashboard.git
    cd tb-interactive-dashboard
2. Launch local server:
   
                  # Using Python (any version)
              python -m http.server 8000
              
              # Or using Node.js
              npx serve
3. Open in browser:
http://localhost:8000
## 📂 Data Sources
- **Primary dataset**: [TB Portals Program](https://tbportals.niaid.nih.gov/)
- **Supplementary data**: [TB-DIAH Data Hub](https://www.tbdiah.org/)
- *Note: Raw data files are not included due to licensing - see [data documentation](data/README.md)*

## 🔧 Tech Stack
| Component        | Technologies                          |
|------------------|---------------------------------------|
| Core Framework   | D3.js (v7.8), JavaScript (ES6+)       |
| Visualization    | Leaflet.js, Tableau Public Embed      |
| Styling          | CSS3, SVG animations                  |
| Build Tools      | Webpack, Babel                        |
| Data Processing  | Python (Pandas, NumPy)                |

## 📊 Visualization Gallery
| Feature              | Preview                              |
|----------------------|--------------------------------------|
| Force Graph          | ![Force Graph](src/assets/force.gif) |
| Animated Timeline    | ![Timeline](src/assets/timeline.gif) |
| Geospatial Analysis  | ![Map](src/assets/map-view.png)      |

## 🤝 Contributing
1. Fork the repository
2. Create feature branch:  
   `git checkout -b new-feature`
3. Commit changes:  
   `git commit -m 'Add feature'`
4. Push to branch:  
   `git push origin new-feature`
5. Open pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📜 License
[MIT License](LICENSE) - See LICENSE file for details

## 🙏 Acknowledgments
- [TB Portals Program](https://tbportals.niaid.nih.gov/) for open-access data
- [D3.js community](https://github.com/d3/d3) for visualization patterns
- [Tableau Public](https://public.tableau.com/) for embedded analytics support
