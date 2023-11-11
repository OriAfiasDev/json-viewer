import { JSONViewer } from '../lib/main';

const json2 = `{
  "name": "json-viewer",
  "private": false,
  "version": "0.0.0",
  "type": "module",
  "main": "dist/main.js",
  "types": "dist/main.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "dev": "vite",
    "build": "tsc --p ./tsconfig-build.json && vite build",
    "prepublishOnly": "npm run build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@storybook/addon-essentials": "^7.5.3",
    "@storybook/addon-interactions": "^7.5.3",
    "@storybook/addon-links": "^7.5.3",
    "@storybook/addon-onboarding": "^1.0.8",
    "@storybook/blocks": "^7.5.3",
    "@storybook/react": "^7.5.3",
    "@storybook/react-vite": "^7.5.3",
    "@storybook/testing-library": "^0.2.2",
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@types/uuid": "^9.0.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "eslint-plugin-storybook": "^0.6.15",
    "glob": "^10.3.10",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "storybook": "^7.5.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "vite-plugin-dts": "^3.6.3",
    "vite-plugin-lib-inject-css": "^1.3.0"
  },
  "sideEffects": [
    "**/*.css"
  ],
  "dependencies": {
    "uuid": "^9.0.1"
  }
}
`;

function App() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>JSON Viewer</h1>
      <div
        style={{
          width: 800,
          height: 600,
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '20px 20px 8px 0px #69026e',
        }}
      >
        <JSONViewer json={json2} theme='dark' />
      </div>
    </div>
  );
}

export default App;
