[![Build Status](https://travis-ci.org/niawjunior/blog.svg?branch=master)](https://travis-ci.org/niawjunior/blog)

# Angular Blog Engine

A minimal Angular starter for Universal JavaScript using the [Angular CLI](https://github.com/angular/angular-cli)
If you're looking for the Angular Universal repo go to [**angular/universal**](https://github.com/angular/universal)  

## Getting Started

This demo is built following the [Angular CLI Wiki guide](https://github.com/angular/angular-cli/wiki/stories-universal-rendering)
---

### Build Time Pre-rendering vs. Server-side Rendering (SSR)
This repo demonstrates the use of 2 different forms of Server-side Rendering.

**Pre-render** 
* Happens at build time
* Renders your application and replaces the dist index.html with a version rendered at the route `/`.

**Server-side Rendering (SSR)**
* Happens at runtime
* Uses `ngExpressEngine` to render your application on the fly at the requested url.

---

### Installation
* `npm install` or `yarn`

### Development (Client-side only rendering)
* run `ng serve`

### Production (also for testing SSR/Pre-rendering locally)
**`npm run deploy && npm run start`** - Compiles your application and spins up a Node Express to serve your Universal application on `http://localhost:4000`.

**`npm run build:prerender && npm run serve:prerender`** - Compiles your application and prerenders your applications files, spinning up a demo http-server so you can view it on `http://localhost:8080`
**Note**: To deploy your static site to a static hosting platform you will have to deploy the `dist/browser` folder, rather than the usual `dist`
