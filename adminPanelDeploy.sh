#!/bin/bash

# Define your repository URL
REPO_URL="https://github.com/Clicking-Studio/Mechamod_AdminPanel.git"

# Path to your local repository
LOCAL_REPO_PATH="/home/ec2-user/Mechamod_AdminPanel"

# Name of the branch you want to monitor
BRANCH_NAME="main"

# Full path to nvm, node, and pm2 executables
NVM_DIR="/root/.nvm"
NODE_PATH="$NVM_DIR/versions/node/v18.16.1/bin/node"
PM2_PATH="$NVM_DIR/versions/node/v18.16.1/bin/pm2"

# Ensure nvm is loaded
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Ensure the node and pm2 are in the PATH
export PATH="$NVM_DIR/versions/node/v18.16.1/bin:$PATH"

# Function to check if new commits are available in the specified branch
check_for_new_commits() {
    # Move to the local repository directory
    cd "$LOCAL_REPO_PATH" || exit

    # Fetch latest changes from the remote repository
    git fetch origin

    # Check if there are new commits in the specified branch
    LOCAL_HASH=$(git rev-parse "$BRANCH_NAME")
    REMOTE_HASH=$(git rev-parse "origin/$BRANCH_NAME")

    if [ "$LOCAL_HASH" != "$REMOTE_HASH" ]; then
        echo "New commits detected in $BRANCH_NAME branch"
        return 0
    else
        echo "No new commits in $BRANCH_NAME branch"
        return 1
    fi
}

# Function to fetch latest code and restart pm2
fetch_and_restart_pm2() {
    # Move to the local repository directory
    cd "$LOCAL_REPO_PATH" || exit

    # Check for local changes
    if ! git diff-index --quiet HEAD --; then
        echo "Local changes detected. Please commit or discard your changes before pulling."
        exit 1
    fi

    # Pull latest changes from the specified branch
    git pull origin "$BRANCH_NAME" --no-rebase

    # Restart pm2 using the full path
    $PM2_PATH restart 3
}

# Main function
main() {
    if check_for_new_commits; then
        fetch_and_restart_pm2
    else
        echo "No action required."
    fi
}

# Execute the main function
main
