# Contributing to React Native Prize Wheel

Thank you for considering contributing! 🎉

## Commit Message Convention

This project uses **Conventional Commits** for automated versioning and publishing. Please follow this format:

### Commit Message Format

```
<type>: <description>

[optional body]
[optional footer]
```

### Types and Version Bumps

- **`major:`** or **`BREAKING CHANGE:`** → Major version bump (1.0.0 → 2.0.0)
  - Breaking changes that require users to update their code
  - Example: `major: remove deprecated props`
  - Example: `BREAKING CHANGE: change API structure`

- **`feat:`** or **`feature:`** or **`minor:`** → Minor version bump (1.0.0 → 1.1.0)
  - New features that are backward compatible
  - Example: `feat: add haptic feedback support`
  - Example: `minor: add new pointer styles`

- **`fix:`** or **`patch:`** → Patch version bump (1.0.0 → 1.0.1)
  - Bug fixes and small improvements
  - Example: `fix: correct angle calculation`
  - Example: `patch: improve performance`

- **Other types** (no version bump, but still good practice):
  - `chore:` - Build process, dependencies, tooling
  - `docs:` - Documentation only changes
  - `style:` - Code style changes (formatting, etc.)
  - `refactor:` - Code refactoring without feature changes
  - `perf:` - Performance improvements
  - `test:` - Adding or updating tests

### Examples

```bash
# Patch release (bug fix)
git commit -m "fix: resolve spinning animation glitch on Android"

# Minor release (new feature)
git commit -m "feat: add custom pointer shapes support"

# Major release (breaking change)
git commit -m "major: change rewards prop structure to support nested data"

# No release (documentation)
git commit -m "docs: update README with new examples"
```

## Development Workflow

1. **Fork and clone** the repository
2. **Create a branch** for your feature/fix
3. **Make your changes** following the code style
4. **Test your changes** thoroughly
5. **Commit** using conventional commits format
6. **Push** to your fork
7. **Create a Pull Request**

### ⚠️ Single Commit Rule

**Pull Requests must contain only ONE commit.**

This is critical for our automated versioning system to work correctly. The CI/CD pipeline analyzes the last commit message to determine version bumps.

**How to squash multiple commits:**

```bash
# If you have multiple commits, squash them before creating PR
git rebase -i HEAD~3  # Replace 3 with number of commits to squash

# Or squash all commits in your branch
git rebase -i main

# In the interactive editor:
# - Keep the first commit as 'pick'
# - Change all others to 'squash' or 's'
# - Save and exit
# - Edit the final commit message to follow conventional commits format

# Force push to your branch
git push --force-with-lease
```

**Alternative - Amend commits:**

```bash
# Make changes and amend to existing commit
git add .
git commit --amend --no-edit

# Or amend with new message
git commit --amend -m "feat: your feature description"

# Force push
git push --force-with-lease
```

If your PR has multiple commits, it will be rejected until squashed into a single commit.

## CI/CD Pipeline

When you push to `main`:

1. **GitHub Actions** automatically runs
2. **Analyzes** your commit message
3. **Bumps version** according to the type (major/minor/patch)
4. **Publishes** to npm automatically
5. **Creates** a GitHub release with tag

## Setup for Development

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/react-native-prize-wheel.git

# Install dependencies
cd react-native-prize-wheel
npm install

# Run example app
cd example
npm install
npm start
```

## Testing

Before submitting a PR:

1. Test on both iOS and Android (if possible)
2. Ensure no console warnings/errors
3. Verify backward compatibility
4. Update documentation if needed

## Need Help?

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- Be respectful and constructive

Thank you for contributing! 🚀
