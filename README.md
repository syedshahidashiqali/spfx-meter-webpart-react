# SPFx React Meter Web Part

A modern, customizable **progress meter (donut chart)** client-side web part built with the **SharePoint Framework (SPFx)** and **React**.

## Features

- **Responsive donut-style meter** with smooth animation
- Fully configurable via the property pane:
  - Custom **title** and **description**
  - **Percentage** value (0–100) with slider input
  - **Header alignment** (Left, Center, Right)
  - Toggle to **show/hide percentage value**
  - **Custom fill color** picker (using @pnp/spfx-property-controls)
- Supports **theme variants** (light/dark mode)
- Works in **SharePoint Online**, **Microsoft Teams** (as tab or personal app), and full-page apps
- Clean, minimal design with CSS transitions

## Technologies Used

- SharePoint Framework (SPFx) v1.14.0
- React 16.13.1 + TypeScript
- @pnp/spfx-property-controls (Color Picker)
- SVG-based donut chart (no external charting libraries)
- SCSS modules for styling


## Quick Start (Minimal Path to Awesome)

1. Clone the repository:
   ```bash
   git clone https://github.com/syedshahidashiqali/spfx-meter-webpart-react
   cd spfx-meter-webpart-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Serve the web part locally:
   ```bash
   gulp serve
   ```

4. Open the SharePoint workbench (`https://yourtenant.sharepoint.com/sites/yoursite/_layouts/15/workbench.aspx`) and add the **Meter** web part.

## Configuration Options

| Property              | Type      | Description                              | Default     |
|-----------------------|-----------|------------------------------------------|-------------|
| Title                 | Text      | Header title                             | (empty)     |
| Description           | Text      | Subtitle/description text                | "Meter"     |
| Percentage            | Number    | Value between 0 and 100                  | 0           |
| Header Alignment      | Dropdown  | Left / Center / Right                    | Center      |
| Show Percentage Value | Checkbox  | Display the % number inside the donut    | true        |
| Fill Color            | Color     | Color of the progress arc                | #47c3f0     |

## Project Structure

```
src/
├── webparts/meter/
│   ├── components/
│   │   ├── Meter.tsx
│   │   ├── Donut.tsx
│   │   ├── Meter.module.scss
│   │   └── IMeterProps.ts
│   ├── MeterWebPart.ts
│   ├── MeterWebPart.manifest.json
│   └── loc/
├── index.ts
```

## Deployment

1. Build the solution:
   ```bash
   gulp bundle --ship
   gulp package-solution --ship
   ```

2. Upload the `.sppkg` file from the `sharepoint/solution` folder to your **Tenant App Catalog**.
3. Deploy the app and add it to your sites.

## Compatibility

- **SPFx Version**: 1.14.0
- **Node.js**: Compatible with the version used by SPFx 1.14
- **Supported Hosts**: SharePoint Online, Microsoft Teams

## Contributing

Feel free to fork the project and submit pull requests for new features or improvements.

## License

This project is licensed under the [MIT License](LICENSE).

---

**Made with ❤️ using SharePoint Framework**
