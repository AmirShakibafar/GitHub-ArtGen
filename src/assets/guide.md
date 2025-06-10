# GitHub Art Generator: The Complete Guide 🎨

Welcome! This guide will walk you through using the `github_art_generator.py` script and your `art.txt` file to create beautiful pixel art on your GitHub contribution graph.

You should have a folder containing two files:
1.  `art.txt` (Your 52x7 art canvas, pre-filled from the website)
2.  `github_art_generator.py` (The Python script that does the magic)

## Prerequisites

Before you begin, make sure you have the following ready:
- **Python 3** installed on your system.
- **Git** installed on your system.
- Your Git user name and email configured globally. If not, run these commands in your terminal:
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"

## Step 1: Configure the Script

First, you need to tell the script a few things. Open the github_art_generator.py file in a text editor. At the very top, you will find the Configuration section.

Here’s a breakdown of each setting:
### ART_FILE_NAME

This is the name of the text file that contains your artwork. Since it's already named art.txt, you don't need to change this.

```bash
    ART_FILE_NAME = "Art.txt"
```

### COMMITS_PER_DOT

This controls how "dark" each pixel on your graph will be. More commits result in a darker green square. A value of "*5*" is a good starting point.

```bash
# The number of commits to create for each '#' character.
COMMITS_PER_DOT = 5
```

### TARGET_YEAR

This is the most **important** setting for choosing the timeframe for your art.

    For a specific year (e.g., 2023, 2020), set the year as a number.

    For the most recent 52 weeks, set the value to None.

Example for a specific year:
``` bash
# The year you want the art to appear in.
TARGET_YEAR = 2024
```
Example for the last 52 weeks (default behavior):
``` bash
# The year you want the art to appear in.
TARGET_YEAR = None
```

### GIT_NAME_OVERRIDE & GIT_EMAIL_OVERRIDE

These are optional. Only use them if you want to commit with a different name or email than your global Git configuration. Most users should leave these blank.
``` bash
#Optional overrides for your Git identity.
GIT_NAME_OVERRIDE = ""
GIT_EMAIL_OVERRIDE = ""
```

## Step 2: Run the Project

Once you have saved your configuration changes in the script, you are ready to generate and push your art.

1. Open a terminal or command prompt in the folder containing the script and art.txt.

2. Initialize a Git repository in this folder. This is a one-time setup step.

3. git init

4. Run the Python script to generate all the commits. This may take a moment.

5. python github_art_generator.py

6. Create a new, empty repository on GitHub.com. *Do NOT add a README, license, or .gitignore file*.

7. Copy the repository URL from the GitHub page. It will look like https://github.com/YourUsername/your-repo-name.git.

8. Link your local repository to GitHub, replacing <your-repo-url> with the URL you copied.

9. git remote add origin <your-repo-url>

10. Push your art to GitHub.

11. git push --force -u origin main

(We use --force because we are creating a brand new commit history for this special repository).

Congratulations! Go to your GitHub profile page. Your new artwork should be visible on your contribution graph.
## How to Start Over (If Something Goes Wrong)

It's easy to make a mistake. If your art doesn't look right or you want to try a different design, you can easily delete everything and start again.

1. Delete the GitHub Repository:

    1. Go to the repository page on GitHub.

    2. Click Settings.

    3. Scroll all the way down to the "Danger Zone".

    4. Click Delete this repository and follow the on-screen instructions. This is permanent, but since this repo is just for art, it's okay.

2. Delete the Local Git History:

    1. In your project folder on your computer, delete the hidden .git folder. This folder contains all the commits you generated. If you can't see it, you may need to enable "Show Hidden Files" in your file explorer.

    2. Try Again:
    Now you have a clean slate. You can modify your art.txt file (or get a new one), check your script configuration, and start again from Step 2 of this guide (beginning with git init).