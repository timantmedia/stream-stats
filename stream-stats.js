class StreamStatsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        /* Add your component styles here */
      </style>
      <div>
        <h2>Stream Statistics</h2>
        <p id="stats-info">0</p>
      </div>
    `;
  }

  connectedCallback() {
    const streamId = this.getAttribute('stream-id');
    if (streamId) {
      const apiUrl = `http://localhost:5080/viewercount.jsp?streamid=${streamId}`;
      this.fetchStreamStats(apiUrl);

      // Listen for the first play event of the video
      const remoteVideo = document.getElementById('remoteVideo');
      remoteVideo.addEventListener('play', this.handleFirstPlay.bind(this, apiUrl), { once: true });

      // Fetch updated data every 15 seconds
      this.intervalId = setInterval(() => {
        this.fetchStreamStats(apiUrl);
      }, 10000);
    } else {
      console.error('Missing "stream-id" attribute.');
    }
  }

  disconnectedCallback() {
    clearInterval(this.intervalId);
  }

  handleFirstPlay(apiUrl) {
    this.fetchStreamStats(apiUrl);
  }

  static get observedAttributes() {
    return ["stream-id"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
     return;
   }
      
    this.connectedCallback();
  }

  fetchStreamStats(apiUrl) {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const viewerTypes = Object.keys(data);
        let sum = 0;
  
        viewerTypes.forEach(viewerType => {
          const value = data[viewerType];
          sum += value > 0 ? value : 0;
        });
  
        const statsInfo = this.shadowRoot.getElementById('stats-info');
        statsInfo.textContent = `Total Viewers: ${sum}`;
      })
      .catch(error => {
        console.error('Error fetching stream statistics:', error);
        const statsInfo = this.shadowRoot.getElementById('stats-info');
        statsInfo.textContent = 'Error fetching stream statistics.';
      });
  }
}

customElements.define('stream-stats', StreamStatsComponent);
