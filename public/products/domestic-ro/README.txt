SLOT: Domestic RO product assets

Drop the following files here to replace the current schematic poster fallback:
- poster.webp  (or .png) - transparent-background isolated equipment photo
- model.glb    - optional 3D model for Phase 2 R3F integration

The ProductVisual component in /app/app/page.js reads these paths.
When poster.webp is present, it will be preferred over the SVG schematic.
The surrounding UI, transitions and scroll controller will not change.
