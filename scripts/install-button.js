(function () {
  const installButton = document.getElementById('install-btn');
  const installStatus = document.getElementById('install-status');

  if (!installButton || !installStatus) {
    return;
  }

  const INSTALLERS = {
    windows: {
      platformLabel: 'Windows',
      filePath: './scripts/install-windows.ps1',
      downloadedFile: 'install-windows.ps1',
      command: 'powershell -ExecutionPolicy Bypass -File .\\install-windows.ps1'
    },
    macos: {
      platformLabel: 'macOS',
      filePath: './scripts/install-macos.sh',
      downloadedFile: 'install-macos.sh',
      command: 'chmod +x ./install-macos.sh && ./install-macos.sh'
    },
    linux: {
      platformLabel: 'Linux',
      filePath: './scripts/install-linux.sh',
      downloadedFile: 'install-linux.sh',
      command: 'chmod +x ./install-linux.sh && ./install-linux.sh'
    }
  };

  function detectPlatform() {
    const platformSource = [
      navigator.userAgentData && navigator.userAgentData.platform,
      navigator.platform,
      navigator.userAgent
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    if (platformSource.includes('win')) {
      return 'windows';
    }

    if (platformSource.includes('mac')) {
      return 'macos';
    }

    if (
      platformSource.includes('linux') ||
      platformSource.includes('x11') ||
      platformSource.includes('unix')
    ) {
      return 'linux';
    }

    return 'unknown';
  }

  function setStatus(type, html) {
    installStatus.className = type || '';
    installStatus.innerHTML = html;
  }

  function triggerDownload(filePath, downloadedFile) {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = downloadedFile;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function unknownPlatformMessage() {
    const items = Object.values(INSTALLERS)
      .map(
        (installer) =>
          `<li><a href="${installer.filePath}" download="${installer.downloadedFile}">${installer.platformLabel} installer</a></li>`
      )
      .join('');

    return `We couldn't detect your OS. Pick your installer:<ul>${items}</ul>`;
  }

  installButton.addEventListener('click', function () {
    installButton.disabled = true;
    setStatus('', 'Preparing installer...');

    try {
      const platform = detectPlatform();
      const installer = INSTALLERS[platform];

      if (!installer) {
        setStatus('error', unknownPlatformMessage());
        return;
      }

      triggerDownload(installer.filePath, installer.downloadedFile);
      setStatus(
        'success',
        `Downloaded ${installer.platformLabel} installer. Run <code>${installer.command}</code> to start installation.`
      );
    } catch (error) {
      setStatus('error', `Install failed. Please retry. ${error && error.message ? error.message : ''}`);
    } finally {
      installButton.disabled = false;
    }
  });
})();
