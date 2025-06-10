import os
import sys
from datetime import datetime, timedelta


# All fields you need to edit are in this section.
# ---------------------------------------------------------------------
# 1. The name of the file containing your 7x52 art.
# !!!This file must be in the same directory as this script.
ART_FILE_NAME = "art.txt"

# 2.The number of commits to create for each '#' character.
#  More commits will make the dots on your graph appear darker.
COMMITS_PER_DOT = 5

# 3. (Optional) Your Git name and email.
#    The script will try to get these from your global Git config.
#    Only change these if you want to override your global settings.
GIT_NAME_OVERRIDE = ""
GIT_EMAIL_OVERRIDE = ""


# ====================================================================
# Script Logic (No need to edit below this line)
# ====================================================================

def get_git_config(setting):
    return os.popen(f'git config --global user.{setting}').read().strip()

def main():
    if not os.path.exists(ART_FILE_NAME):
        print(f"❌ Error: The art file '{ART_FILE_NAME}' was not found.")
        print(f"   Please create it in the same directory as this script.")
        sys.exit(1)

    with open(ART_FILE_NAME) as f:
        art_lines = [line.rstrip('\n') for line in f if not line.strip().startswith('#')]

    if len(art_lines) != 7:
        print(f"❌ Error: '{ART_FILE_NAME}' must have exactly 7 lines (for 7 days of the week).")
        print(f"   Your file has {len(art_lines)} lines (after ignoring comments).")
        sys.exit(1)

    for i, line in enumerate(art_lines):
        if len(line) != 52:
            day_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][i]
            print(f"❌ Error: Line {i + 1} (for {day_of_week}) in '{ART_FILE_NAME}' is not 52 characters long.")
            print(f"   It currently has {len(line)} characters.")
            sys.exit(1)
    
    print("✅ Art file is valid (7x52).")
    art_matrix = [list(row) for row in art_lines]

    # --- Configure Git ---
    user_name = GIT_NAME_OVERRIDE or get_git_config('name')
    user_email = GIT_EMAIL_OVERRIDE or get_git_config('email')

    if not user_name or not user_email:
        print("❌ Error: Git user name/email not found.")
        print("   Please set them globally with 'git config --global user.name ...'")
        print("   or set the overrides at the top of this script.")
        sys.exit(1)

    if not os.path.exists(".git"):
        os.system("git init >/dev/null 2>&1")

    os.system(f'git config user.name "{user_name}"')
    os.system(f'git config user.email "{user_email}"')
    
    # --- Generate Commits ---
    today = datetime.now()
    last_sunday = today - timedelta(days=(today.weekday() + 1) % 7)
    start_date = last_sunday - timedelta(weeks=51)

    # Create a file to commit
    with open("README.md", "w") as f:
        f.write(f"# GitHub Art by {user_name}\n")
    os.system("git add README.md")

    print(f"🎨 Generating art for '{user_name}'. This may take a moment...")
    
    for week_index in range(52):
        for day_index in range(7):
            if art_matrix[day_index][week_index] == '#':
                commit_date = start_date + timedelta(days=(week_index * 7 + day_index))
                date_str = commit_date.strftime("%Y-%m-%dT%H:%M:%S")

                for _ in range(COMMITS_PER_DOT):
                    os.environ["GIT_AUTHOR_DATE"] = date_str
                    os.environ["GIT_COMMITTER_DATE"] = date_str
                    os.system(f'git commit --allow-empty -m "art" --date="{date_str}" >/dev/null 2>&1')

    print("\n✅ Success! Your artwork has been committed.")
    print("   To push it to GitHub, follow these steps:")
    print("   1. Create a new, empty repository on GitHub.")
    print("   2. Link it to your local repository:")
    print("      git remote add origin <your-repo-url>")
    print("   3. Push your commits:")
    print("      git push --force -u origin main")

if __name__ == "__main__":
    main()