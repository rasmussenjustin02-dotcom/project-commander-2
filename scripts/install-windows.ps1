$ErrorActionPreference = 'Stop'

if (-not $IsWindows) {
  Write-Error 'This installer is for Windows.'
}

$targetDir = Join-Path $HOME 'project-commander-2'

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error 'git is required. Install Git for Windows and run this installer again.'
}

if (Test-Path $targetDir) {
  Write-Error "$targetDir already exists. Remove it or choose another location manually."
}

git clone https://github.com/rasmussenjustin02-dotcom/project-commander-2.git $targetDir

Write-Host "Installed to $targetDir"
Write-Host "Next step: open $targetDir\\index.html in your browser."
