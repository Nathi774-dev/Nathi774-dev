import { Zap, Flame } from "lucide-react";

export default function Header({ direction, setDirection, xp, streak }) {
    <header className="header">
        <div>
            <h2 className="">My Learning space</h2>
            <p>Every lesson brings you closer to fluency.</p>
        </div>
        <div className="header-actions">
            <select value={direction} onChange={(e) => setDirection(e.target.value)} className="language-select">
                <option value="en-xh"> English → isiXhosa </option> 
                <option value="xh-en">isiXhosa → English</option> 
            </select>
            <div className="header-stat">
                <Flame color="#ff922b" />
                <strong>{streak}</strong>
            </div>
            <div className="header-stat">
                <Zap color="#eab308" />
                <strong>{xp} XP</strong>
            </div>
        </div>
    </header>
}