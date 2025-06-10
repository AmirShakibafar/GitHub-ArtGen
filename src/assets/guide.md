# GitHub Art Generator 🎨

This project uses a Python script to create beautiful pixel art on your GitHub contribution graph by generating commits with specific past dates.

## How It Works

The script reads a design from a text file (`art.txt`) and creates a new Git repository. For every `#` character in your design, it creates several commits on a corresponding date in the past year. When you push this repository to GitHub, your contribution graph will display the art you created.

---

## Step-by-Step Guide

Follow these steps carefully to create your own GitHub art.

### Step 1: Prerequisites

Make sure you have the following installed on your system:
- **Python 3**: [Download Python](https://www.python.org/downloads/)
- **Git**: [Download Git](https://git-scm.com/downloads/)

### Step 2: Set Up Your Project

1.  **Download the script**: Save the Python script from above and name it `github_art.py`.
2.  **Create a folder**: Create a new, empty folder on your computer for this project.
3.  **Place the script**: Move the `github_art.py` file into the new folder you just created.

### Step 3: Create Your Art Canvas

1.  **Open a terminal or command prompt** in the project folder.
2.  **Run the script for the first time**:
    ```bash
    python github_art.py
    ```
3.  This will create a new file named `art.txt`. This is your canvas!

### Step 4: Draw Your Masterpiece

1.  **Open `art.txt`** in a text editor.
2.  You will see instructions and a 52x7 grid. The grid represents the last year on your GitHub profile.
3.  **Draw your art** using the `#` character for "on" pixels and a space for "off" pixels.
4.  **Save the file** when you are done.

### Step 5: Generate the Commits

1.  Go back to your terminal in the same folder.
2.  **Run the script again**:
    ```bash
    python github_art.py
    ```
3.  The script will now read your `art.txt` file and create hundreds of commits. This may take a minute.

### Step 6: Create a New GitHub Repository

1.  Go to [GitHub.com](https://github.com) and log in.
2.  Create a **new, empty repository**. Do NOT initialize it with a README or .gitignore file.
3.  Name it something like `my-github-art`.
4.  Copy the repository URL. It will look something like this: `https://github.com/YourUsername/my-github-art.git`.

### Step 7: Push Your Art to GitHub

1.  Go back to your terminal one last time.
2.  **Link your local repository to GitHub**:
    *(Replace `<your-repo-url>` with the URL you just copied)*
    ```bash
    git remote add origin <your-repo-url>
    ```
3.  **Push your commits**:
    *(We use `--force` because we are creating a new history)*
    ```bash
    git push --force -u origin main
    ```

**That's it!** Go to your GitHub profile, and you should now see your beautiful creation on your contribution graph.