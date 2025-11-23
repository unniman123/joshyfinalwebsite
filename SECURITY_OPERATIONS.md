# 🔐 Security Operations Guide

## Industry-Standard Security Practices for Kerala Tours Global

This document outlines operational security procedures to maintain the security posture of our application.

---

## 🚨 Incident Response Procedures

### API Key Compromise Response

**Immediate Actions (Within 1 hour):**

1. **Assess the breach:**
   - Determine which keys are compromised
   - Identify potential impact (data exposure, unauthorized access)
   - Check Supabase audit logs for suspicious activity

2. **Contain the breach:**
   - Generate new API keys in Supabase dashboard
   - Update environment variables in all deployment environments
   - Temporarily disable affected services if needed

3. **Recovery:**
   - Deploy updated configuration
   - Monitor for continued unauthorized access
   - Update all documentation references

4. **Post-incident:**
   - Document the incident and response
   - Review and improve security procedures
   - Consider additional security measures

### Emergency Contacts

- **Security Lead:** [Contact Information]
- **Supabase Support:** https://supabase.com/support
- **Hosting Provider:** [Netlify/Vercel Support]

---

## 🔑 API Key Management

### Key Rotation Strategy

**Frequency:** Every 90 days or immediately upon compromise

**Procedure:**

1. **Generate new keys:**
   ```bash
   # Go to Supabase Dashboard → Project → Settings → API
   # Generate new anon/public key
   ```

2. **Update environments:**
   ```bash
   # Development
   echo "VITE_SUPABASE_ANON_KEY=new_key_here" > .env.local

   # Production (Netlify)
   # Update environment variables in Netlify dashboard

   # Staging (if applicable)
   # Update staging environment variables
   ```

3. **Verification:**
   ```bash
   npm run security-check
   npm run build
   npm run preview  # Test locally
   ```

4. **Deploy:**
   - Commit changes (without actual keys)
   - Deploy to production
   - Monitor for issues

5. **Cleanup:**
   - Revoke old keys in Supabase dashboard
   - Update documentation
   - Notify team members

### Key Types and Permissions

| Key Type | Purpose | Permissions | Rotation Frequency |
|----------|---------|-------------|-------------------|
| Anon/Public | Website API access | Read tours, submit inquiries | 90 days |
| Service Role | Admin panel operations | Full database access | 30 days |

---

## 📊 Security Monitoring

### Automated Monitoring

**Build-time Checks:**
```bash
npm run security-check  # Runs automatically before build
```

**Runtime Monitoring:**
- Supabase query logging
- Error tracking with user agent and timestamp
- Rate limiting alerts
- Performance monitoring

### Manual Monitoring

**Daily Checks:**
- Review Supabase dashboard for unusual activity
- Check inquiry submission patterns
- Monitor error logs

**Weekly Checks:**
- Review rate limiting logs
- Audit user permissions
- Update dependencies

**Monthly Checks:**
- Security dependency updates
- Review access patterns
- Key rotation verification

---

## 🛡️ Security Headers Configuration

### Content Security Policy (CSP)

Our CSP configuration in `index.html`:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://lovable.dev;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://lovable.dev;
  img-src 'self' data: https: blob:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://jzfqhflssywbciwqfjan.supabase.co wss://jzfqhflssywbciwqfjan.supabase.co;
  frame-src 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
">
```

**Update Procedure:**
1. Test CSP changes in development
2. Update production CSP
3. Monitor for blocked legitimate resources
4. Adjust as needed

### Additional Security Headers

- **X-Frame-Options:** DENY (prevents clickjacking)
- **X-Content-Type-Options:** nosniff (prevents MIME sniffing)
- **Referrer-Policy:** strict-origin-when-cross-origin
- **Permissions-Policy:** Restricts browser features

---

## 🔒 Access Control

### Rate Limiting

**Current Configuration:**
- 5 submissions per hour per IP address
- Applied to all inquiry forms
- Automatic cleanup of old attempts

**Monitoring Rate Limits:**
```javascript
// Rate limiter provides remaining attempts
const { remainingAttempts } = await submitContactInquiry(inquiry);
```

### Input Validation

**Client-side Validation:**
- Email format validation
- Length limits on all fields
- SQL injection prevention through parameterized queries

**Server-side Validation:**
- Row Level Security (RLS) policies in Supabase
- Database constraints
- Input sanitization

---

## 📋 Security Checklist

### Pre-Deployment Checklist

- [ ] `npm run security-check` passes
- [ ] Environment variables configured correctly
- [ ] No hardcoded secrets in codebase
- [ ] Security headers present in index.html
- [ ] Rate limiting functional
- [ ] Input validation working

### Post-Deployment Checklist

- [ ] Application loads correctly
- [ ] Forms submit successfully
- [ ] No console errors
- [ ] Security headers active (check browser dev tools)
- [ ] Supabase connection verified

---

## 🚨 Security Incident Categories

### Critical (Immediate Response)
- API key exposure
- Unauthorized database access
- Data breach
- Service unavailability

### High (Response within 4 hours)
- Unusual traffic patterns
- Failed authentication attempts
- Suspicious form submissions

### Medium (Response within 24 hours)
- Outdated dependencies
- Minor configuration issues
- Performance degradation

### Low (Response within 1 week)
- Minor security improvements
- Documentation updates
- Process improvements

---

## 📚 Security Training

### Team Requirements

**All Team Members Must:**
- Understand basic security principles
- Never commit secrets to version control
- Use strong, unique passwords
- Enable 2FA where available
- Report suspicious activity immediately

**Development Team Must:**
- Run security checks before deployment
- Follow secure coding practices
- Keep dependencies updated
- Review security implications of changes

### Security Awareness

**Monthly Topics:**
- Phishing awareness
- Secure password practices
- API key management
- Incident response procedures

---

## 🔧 Security Tools & Commands

```bash
# Run security checks
npm run security-check

# Check for vulnerable dependencies
npm audit

# Update dependencies
npm update

# Build with security checks
npm run build

# Check environment variables
node -e "console.log(Object.keys(process.env).filter(k => k.includes('VITE')).join('\n'))"
```

---

## 📞 Support & Resources

### External Resources
- [OWASP Cheat Sheet](https://cheatsheetseries.owasp.org/)
- [Supabase Security Documentation](https://supabase.com/docs/guides/security)
- [Content Security Policy Reference](https://content-security-policy.com/)

### Internal Documentation
- `SECURITY_AUDIT_REPORT.md` - Latest security audit results
- `SUPABASE_SETUP.md` - Database security configuration
- `SECURITY_OPERATIONS.md` - This document

---

## 📝 Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-11-XX | Initial security operations guide | Security Team |

---

**Document Version:** 1.0
**Last Updated:** November 2025
**Review Frequency:** Monthly




