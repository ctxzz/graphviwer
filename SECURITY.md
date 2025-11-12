# Security

## Overview

This document outlines the security measures implemented in the Graphviz & Mermaid Viewer application.

## XSS (Cross-Site Scripting) Protection

### SVG Sanitization

**Risk:** SVG files can contain embedded JavaScript, which poses an XSS risk when rendering user-generated content.

**Mitigation:**
- All SVG output from Graphviz and Mermaid is sanitized using **DOMPurify** before rendering
- DOMPurify configuration:
  ```javascript
  DOMPurify.sanitize(svg, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ADD_TAGS: ['foreignObject'],
    ADD_ATTR: ['target'],
  })
  ```
- This removes potentially malicious scripts while preserving valid SVG elements

### Content Security Policy (CSP)

**Implementation:**
- CSP meta tag configured in `index.html`
- Restricts resource loading to trusted sources
- Current policy:
  - `default-src 'self'` - Only load resources from same origin
  - `script-src 'self' 'unsafe-inline' 'unsafe-eval'` - Required for Vite, Monaco Editor, and WASM
  - `style-src 'self' 'unsafe-inline'` - Required for Tailwind CSS
  - `img-src 'self' data: blob:` - Allow data URIs and blob for SVG rendering
  - `worker-src 'self' blob:` - Allow web workers for Monaco Editor

**Note:** `unsafe-inline` and `unsafe-eval` are currently required for:
- Vite's development server
- Monaco Editor's functionality
- WebAssembly (Graphviz rendering)

For production, consider using nonces or hashes for a stricter CSP.

## Data Storage

### localStorage

**Usage:**
- User code is automatically saved to `localStorage` for convenience
- Data is stored locally in the browser only
- No data is transmitted to external servers

**Privacy:**
- All data remains on the user's device
- Users can clear localStorage through browser settings

## Dependencies

### Regular Updates

Keep dependencies up to date to patch known vulnerabilities:

```bash
npm audit
npm audit fix
```

### Key Security Dependencies

- **DOMPurify**: ^3.x - SVG/HTML sanitization
- All other dependencies are from trusted sources (npm, official packages)

## Best Practices

### For Users

1. **Don't paste untrusted code** - Only render diagrams from trusted sources
2. **Be cautious with shared diagrams** - Verify the source before rendering
3. **Review before downloading** - Check SVG output before downloading

### For Developers

1. **Never disable sanitization** - Always sanitize SVG output
2. **Keep DOMPurify updated** - Regular security updates
3. **Review CSP regularly** - Tighten policy when possible
4. **Audit dependencies** - Run `npm audit` regularly
5. **Test with security tools** - Use browser dev tools to verify CSP

## Limitations

### Current Limitations

1. **CSP requires unsafe-inline/unsafe-eval** due to:
   - Monaco Editor architecture
   - Vite development server
   - WebAssembly execution

2. **Client-side only** - No server-side validation
   - Since this is a static site, all processing happens client-side
   - Users are responsible for content they render

### Future Improvements

1. **Stricter CSP** - Use nonces/hashes in production build
2. **Sandboxed iframe** - Render SVG in isolated iframe
3. **Web Worker isolation** - Move rendering to dedicated worker
4. **Input validation** - Add schema validation for Graphviz/Mermaid syntax

## Reporting Security Issues

If you discover a security vulnerability, please:

1. **Do not** open a public issue
2. Contact the maintainers privately
3. Provide detailed information about the vulnerability
4. Allow time for a fix before public disclosure

## References

- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
