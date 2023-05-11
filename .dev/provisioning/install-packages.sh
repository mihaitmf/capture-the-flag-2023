#!/usr/bin/env bash

PROJECT_DIR=${1}
SHELL_SCRIPTS_DIR="${PROJECT_DIR}/${2}"

echo "Running set-working-dir.sh"
${SHELL_SCRIPTS_DIR}/set-working-dir.sh ${PROJECT_DIR}
test $? -ne 0 && exit 1 # If last command returned error (non zero exit code), exit this script with error also

echo "Install commonly used packages"
apt update >/dev/null
apt install -y nodejs >/dev/null

exit 0
