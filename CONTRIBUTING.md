# 🤝 Contributing to Project Commander 2

Thank you for your interest in contributing! This guide will help you get started.

## Code of Conduct

We're committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and kind to everyone.

## How to Contribute

### 1. Report Issues
Found a bug? Have a suggestion?
1. Go to [Issues](https://github.com/rasmussenjustin02-dotcom/project-commander-2/issues)
2. Click "New Issue"
3. Describe what you found
4. Include steps to reproduce (if it's a bug)

### 2. Submit Changes
1. **Fork the repository** to your account
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/project-commander-2.git
   cd project-commander-2
   ```
3. **Create a branch** for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes**
5. **Test thoroughly** (open index.html in browser and test all features)
6. **Commit with a clear message**
   ```bash
   git commit -m "Add: description of your changes"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

## What We're Looking For

### High Priority
- ♿ Accessibility improvements (screen readers, keyboard navigation)
- 🐛 Bug fixes
- 📱 Mobile optimization
- 🌍 Translations
- 📚 Documentation

### Medium Priority
- 🎨 UI/UX improvements
- 🚀 Performance optimizations
- 🔌 New features
- 💬 Chat improvements

### Community Contributions Welcome
- Code
- Design feedback
- Testing on different devices
- Documentation
- Ideas and suggestions

## Coding Guidelines

### HTML/CSS
- Use semantic HTML5 tags
- Follow the existing CSS variable naming (--bg-primary, etc.)
- Mobile-first responsive design
- Test on mobile devices

### JavaScript
- Use vanilla JavaScript (no external dependencies)
- Write clear, commented code
- Test functionality thoroughly
- Follow existing code style

### Naming Conventions
```javascript
// Functions: camelCase
function sendToNova() { }

// Variables: camelCase
let driveConnected = false;

// Constants: UPPER_SNAKE_CASE
const STORAGE_KEY = 'nova_projects_data';

// CSS Classes: kebab-case
class="file-item"
class="btn-secondary"
```

## Testing Checklist

Before submitting a PR, please test:
- [ ] Works on desktop (Chrome, Firefox, Safari)
- [ ] Works on mobile (iOS Safari, Android Chrome)
- [ ] All buttons function correctly
- [ ] Chat commands work (scan, backup, help, etc.)
- [ ] File operations (complete, delete)
- [ ] Backup export creates valid JSON
- [ ] No console errors
- [ ] Responsive design at different screen sizes
- [ ] Accessibility (keyboard navigation, screen readers if possible)

## Getting Help

- 💬 **Questions?** Open a [Discussion](https://github.com/rasmussenjustin02-dotcom/project-commander-2/discussions)
- 🐛 **Bug help?** Check existing Issues
- 📞 **Need clarification?** Ask in a PR or Issue comment

## PR Template

```markdown
## Description
Brief description of your changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Improvement
- [ ] Documentation
- [ ] Accessibility

## Testing
Describe how you tested this change

## Checklist
- [ ] Tested on mobile
- [ ] Tested on desktop
- [ ] No console errors
- [ ] Responsive design works
- [ ] Code follows style guidelines
```

## Review Process

1. We'll review your PR within a few days
2. May request changes or clarifications
3. Once approved, we'll merge it in
4. You'll be credited in the README!

## Recognition

All contributors will be recognized in:
- GitHub contributors page
- README acknowledgments
- Release notes

Thank you for helping make Project Commander 2 better! 🌟

---

**Questions?** Feel free to ask in Issues or Discussions. We're here to help!