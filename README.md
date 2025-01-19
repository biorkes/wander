# WanderHeat

A modern e-commerce platform for heating solutions, built with Nuxt 3, Vue.js, and TypeScript.

## Features

- Multi-language support (English, Spanish, Bulgarian, Romanian)
- Dynamic package selection and customization
- Shopping cart with coupon support
- Accessories marketplace
- Multiple shipping methods with carrier-specific locations
- Secure checkout process
- Responsive design

## Tech Stack

- Nuxt 3
- Vue.js
- TypeScript
- Tailwind CSS
- Pinia for state management

## Getting Started

1. Clone the repository
```bash
git clone [your-repo-url]
cd wanderheat
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Copy `.env.example` to `.env` and fill in your values.

4. Run development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## Environment Variables

Required environment variables:
- `NUXT_API_URL`: API endpoint URL
- `NUXT_API_KEY`: API authentication key
- `ACCESSORIES_API_URL`: Accessories API endpoint
- `MAIL_PROVIDER`: Email service provider (mailtrap/brevo/mailgun)

## License

[MIT License](LICENSE)
