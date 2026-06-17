# Prompt: Personal Portfolio Website — "Clean & Fun" Project Showcase

## Context
You are an expert Creative Frontend Developer building a premium, interactive personal portfolio for an AI Engineer using **Next.js (App Router)**, **Tailwind CSS**, **@react-three/fiber**, and **Framer Motion**. The design direction is **"Clean but Fun"** — a minimalist white/off-white base that feels alive through motion, typography contrast, and a single vibrant accent color, rather than through busy colors or themed visuals (no "tech/AI/anime/industrial" color cliches).

---

## Design System

### Colors
- Base background: warm off-white (e.g. `#FAFAF7` / `bg-stone-50`)
- Primary text: charcoal/near-black (e.g. `#1A1A1A` / `text-zinc-900`)
- Accent: ONE vibrant, saturated color (e.g. bright coral `#FF5A36` or vivid lime `#C6FF00`) — used sparingly for: active dot indicator, hover underline, custom cursor, small decorative floating blob shapes
- Project visuals (screenshots/videos inside curved mesh) provide their own color — keep surrounding UI neutral so project colors "pop"

### Typography
- Headlines: large serif (bold/display serif) for project names and hero name — creates editorial contrast
- Body/UI text: clean sans-serif (Inter / Plus Jakarta Sans), light weight
- Scroll-triggered text reveal animations (stagger by word or character) for headlines

### Motion Personality
- Hover micro-interactions: slight scale-up (1.02–1.05x) and/or rotate (1–3°) on interactive text/links
- Custom cursor: small circle that morphs/labels (e.g. "VIEW") when hovering interactive elements
- Floating decorative blob shape(s) in background, slow ambient animation (translate/scale loop)
- Curved mesh project visuals: subtle mouse-parallax tilt (3D)

---

## Page Structure (Single Continuous Scroll)

### 1. Hero Section (Full Screen, Separate)
- Large photo of the person (primary visual anchor)
- Name + role, large serif headline
- A single CTA styled as **plain text with an arrow (→)**, NOT a boxed button — subtle hover effect (underline grows / arrow shifts) signals it's clickable
- Clicking this CTA scrolls/navigates to Project 1
- Keep this section CLEAN — no popups, no dot indicator visible here
- Top corner: persistent small "About" text link (visible across all sections)

### 2. Project Sections (3 total, Scroll-Snap)
Each project = one full-screen snap section with a two-column split:

**Left column:**
- Project name (large serif)
- Short description (1–2 sentences)
- "open_case_study" styled as plain text + arrow (same style as Hero CTA) — clicking opens the case study

**Right column:**
- **Curved Mesh 3D Canvas** (react-three-fiber): a plane geometry with slight convex bend, textured with the project's preview (screenshot or looping demo video/gif)
- Subtle mouse-parallax tilt on hover
- On scroll transition between projects: smooth crossfade/blur transition of the texture (avoid glitch/distortion — keep it gentle)
- Project differentiation comes from the CONTENT itself (video demo vs static dashboard vs chart animation) — no per-project theme colors needed

Navigation between projects: **vertical scroll-snap** (CSS scroll-snap or Framer Motion), no "next" arrows needed between projects — natural scroll handles it.

### 3. Dot Progress Indicator (Persistent, all Project sections)
- Vertical row of dots on the right edge (one dot per project)
- Active dot: larger / accent-colored; inactive: outline/muted
- **On hover**: triggers a **full-screen overlay** showing all 3 projects as large cards side-by-side (or grid)
  - Each card: project preview (image/video thumbnail), project name, number (01/02/03)
  - Hover on a card: micro-interaction (scale/tilt)
  - Click on a card: same action as "open_case_study" — navigates directly to that project's case study
  - Overlay closes on mouse-leave or click outside
- This indicator does NOT appear on Hero or About pages — only during project scroll sections

### 4. End-of-Projects Transition
- After Project 3, a closing section/CTA (plain text + arrow style, consistent with Hero CTA) inviting user to visit the **About** page

---

## About Page (Separate Route — "/about")
- Accessed via persistent "About" link (top corner, all pages) or end-of-projects CTA
- Layout: clean Bento Grid with thin borders, soft glassmorphic backgrounds
- Grid contents:
  - Box 1: Professional bio / research focus
  - Box 2: Tech stack as colorful tags (PyTorch, TensorFlow, Docker, Next.js, etc.)
  - Box 3: Contact shortcuts (GitHub, LinkedIn, Email)
  - Optional: Achievements/timeline box

---

## Technical Architecture Requirements

1. **Next.js App Router structure**:
   - `/app/page.tsx` — Hero + 3 Project sections (single scroll page)
   - `/app/about/page.tsx` — About/Bento page
   - `/app/projects/[slug]/page.tsx` — individual case study pages (optional, linked from "open_case_study")

2. **Component breakdown**:
   - `<Hero />`
   - `<ProjectSection />` (reusable, receives project data as props)
   - `<CurvedMeshCanvas />` (R3F component: bent plane geometry + texture loader + parallax)
   - `<DotIndicator />` (handles hover state → triggers overlay)
   - `<ProjectOverlay />` (full-screen 3-card grid overlay)
   - `<ScrollCTA />` (reusable plain-text + arrow link component with hover animation)
   - `<CustomCursor />`
   - `<FloatingBlob />` (decorative background shape)

3. **R3F Setup**: Provide basic `<Canvas>` setup with a `PlaneGeometry` subdivided and bent via vertex displacement (or `THREE.ShaderMaterial` for convex curve), `useTexture` for image/video textures, and `useFrame` for idle rotation/parallax based on pointer position.

4. **Scroll-Snap Setup**: CSS `scroll-snap-type: y mandatory` on container, each `<ProjectSection>` with `scroll-snap-align: start` and `h-screen`. Combine with Framer Motion `useScroll`/`useTransform` for the crossfade transition on the curved mesh texture.

5. **Framer Motion**: Page transitions (Hero → Project 1 on CTA click), text reveal animations (stagger), overlay enter/exit animations.

Provide clean, component-driven code with placeholder data structures for the 3 projects (name, description, preview media path, case study link).