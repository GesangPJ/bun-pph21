import { APITester } from "./APITester";
import "./index.css";
import { HitungPPH21 } from "./HitungPPH21";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

export function App() {
  return (
    <div className="app">
      <div className="logo-container">
        <img src={logo} alt="Bun Logo" className="logo bun-logo" />
        <img src={reactLogo} alt="React Logo" className="logo react-logo" />
      </div>

      <h1>KALKULATOR PPh21 TAHUNAN</h1>
      <p style={{ fontSize: '20px', lineHeight: '1.5', fontWeight: 500 }}>
        Kalkulator Pph21 Tahunan Simple berbasis <code>Bun + React</code>
      </p>
      <HitungPPH21/>
      <p>
        &copy; 2026 Gesang Paudra Jaya
      </p>
    </div>
  );
}

export default App;
