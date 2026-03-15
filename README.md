# SynthetixGit

[![Vercel Deploy](https://img.shields.io/github/deployments/your-username/synthetix-git/production?label=vercel&logo=vercel)](https://synthetixgit.vercel.app)
[![License](https://img.shields.io/github/license/your-username/synthetix-git)](LICENSE)

---

## ✨ Overview
**SynthetixGit** is a modern, premium‑looking web application that combines a powerful GitHub contribution‑art generator with a full‑featured studio for creating, deploying and documenting your projects. It merges the original **SynthetixGit** UI and the **GitHub‑Contribution‑Art‑Generator** into a single, cohesive experience.

- Clean, bright‑colored design (light, real colours – no neon or gradients).
- Seamless GitHub OAuth integration for deployment.
- Interactive art‑generation board that paints your GitHub contribution graph.
- Studio tools: README wizard, deployment modal, game builder, and more.
- Fully ready for Vercel deployment.

---

## 🖼️ Screenshot
![SynthetixGit homepage mockup](synthetix_git_homepage_mockup_1792359129038.jpg)

---

## 🚀 Getting Started
```bash
# Clone the repository
git clone https://github.com/your-username/synthetix-git.git
cd synthetix-git

# Install dependencies
npm install

# Set up environment variables (see below)
cp .env.example .env.local   # copy the example and fill the values

# Run the development server
npm run dev
```

Open <http://localhost:3000> in your browser.

---

## 🔧 Environment Variables
Create a `.env.local` (or configure in Vercel) with the following keys. They combine the variables required by both original projects.

```env
# --------------------
# Core SynthetixGit settings
# --------------------
NEXT_PUBLIC_APP_URL=http://localhost:3000

# GitHub OAuth (required for the Deploy modal)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Optional GitHub API token for higher rate limits
GITHUB_TOKEN=
# Alias also supported
# GITHUB_PERSONAL_ACCESS_TOKEN=

# --------------------
# Contribution Art Generator settings
# --------------------
GITHUB_USERNAME=your_username_here
# Personal Access Token with "repo" scope for pushing commits
GITHUB_ART_TOKEN=ghp_XXXXXXXXXXXXXXXXXXXXXXXX
# Target repository where the art will be pushed
ART_REPO_URL=https://github.com/your_username/your-art-repo.git
# Year you want to generate the contribution art for
TARGET_YEAR=2023
# Optional commit density controls
MIN_COMMITS=1
MAX_COMMITS=10
SKIP_WEEKENDS=false
```

> **Note**: Never commit your real `.env` file to the repository.

---

## 📦 Deployment
The project is pre‑configured for Vercel. After pushing to GitHub, link the repository on Vercel and the environment variables will be imported automatically.

```bash
# Deploy to Vercel (if you have the Vercel CLI installed)
vercel
```

---

## 🛠️ Features
- **Home / Landing page** – hero section with call‑to‑action.
- **Art Generator** – `/art-generator` lets you craft your GitHub contribution graph.
- **Studio** – `/studio` includes the README wizard and deployment modal.
- **Games & Builder** – interactive pages under `/games` and `/builder`.
- **Play** – dynamic routes `/play/[username]/[game]`.

---

## 📚 Documentation
Further details on each component live in the `docs/` folder and the code comments. See the on‑screen UI for tooltips and usage hints.

---

## 🤝 Contributing
Contributions are welcome! Fork the repo, create a feature branch, and open a pull request.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
