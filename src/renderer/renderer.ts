import './styles.css';

class RendererApp {
  constructor() {
    this.initializeApp();
  }

  private initializeApp(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupUI();
      this.setupEventListeners();
    });
  }

  private setupUI(): void {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
      <div class="container">
        <h1>Electron + TypeScript + Webpack</h1>
        <div class="info-section">
          <h2>System Information</h2>
          <p>Electron Version: <span id="electron-version">Loading...</span></p>
          <p>Platform: <span id="platform">Loading...</span></p>
        </div>
        <div class="interaction-section">
          <h2>Test IPC Communication</h2>
          <input type="text" id="message-input" placeholder="Enter a message..." />
          <button id="send-button">Send Message</button>
          <div id="message-output"></div>
        </div>
      </div>
    `;

    this.loadSystemInfo();
  }

  private setupEventListeners(): void {
    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input') as HTMLInputElement;

    if (sendButton && messageInput) {
      sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
          this.sendMessage(message);
          messageInput.value = '';
        }
      });

      messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          sendButton.click();
        }
      });
    }

    // Listen for messages from main process
    if (window.electronAPI) {
      window.electronAPI.onMessage((message: string) => {
        this.displayMessage(`Received: ${message}`);
      });
    }
  }

  private loadSystemInfo(): void {
    if (window.electronAPI) {
      const versionElement = document.getElementById('electron-version');
      const platformElement = document.getElementById('platform');

      if (versionElement) {
        versionElement.textContent = window.electronAPI.getVersion();
      }

      if (platformElement) {
        platformElement.textContent = window.electronAPI.getPlatform();
      }
    }
  }

  private async sendMessage(message: string): Promise<void> {
    if (window.electronAPI) {
      try {
        await window.electronAPI.sendMessage(message);
        this.displayMessage(`Sent: ${message}`);
      } catch (error) {
        this.displayMessage(`Error: ${error}`);
      }
    }
  }

  private displayMessage(message: string): void {
    const output = document.getElementById('message-output');
    if (output) {
      const messageElement = document.createElement('div');
      messageElement.className = 'message';
      messageElement.textContent = `${new Date().toLocaleTimeString()} - ${message}`;
      output.appendChild(messageElement);
      output.scrollTop = output.scrollHeight;
    }
  }
}

// Initialize the renderer app
new RendererApp();