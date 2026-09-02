#!/usr/bin/env sh
set -eu

if [ "$(uname -s)" != "Linux" ]; then
  echo "This installer is for Linux."
  exit 1
fi

TARGET_DIR="${HOME}/project-commander-2"

if ! command -v git >/dev/null 2>&1; then
  echo "git is required. Install git and run this installer again."
  exit 1
fi

if [ -d "${TARGET_DIR}" ]; then
  echo "${TARGET_DIR} already exists. Remove it or choose another location manually."
  exit 1
fi

git clone https://github.com/rasmussenjustin02-dotcom/project-commander-2.git "${TARGET_DIR}"

echo "Installed to ${TARGET_DIR}"
echo "Next step: open ${TARGET_DIR}/index.html in your browser."
