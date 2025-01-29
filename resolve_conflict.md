# Resolving Git Merge Conflict

To resolve the current git merge conflict and complete the pull operation, follow these steps:

1. Open the files with conflicts in your preferred text editor.
2. Look for conflict markers (<<<<<<, =======, >>>>>>>) in the files.
3. Edit the files to resolve the conflicts, keeping the desired changes.
4. Remove the conflict markers after resolving the conflicts.
5. Save the edited files.
6. Stage the resolved files using git add:
   ```
   git add <file1> <file2> ...
   ```
7. Commit the changes to complete the merge:
   ```
   git commit -m "Resolve merge conflicts"
   ```
8. After resolving all conflicts, you can proceed with the pull operation:
   ```
   git pull
   ```

If you encounter any issues or need further assistance, please consult your team lead or the project documentation.
