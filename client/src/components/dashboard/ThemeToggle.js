export default function ThemeToggle({ darkMode, toggleTheme }) {

  return (

    <div
      className={`theme-toggle ${darkMode ? "active" : ""}`}
      onClick={toggleTheme}
    >

      <div className="toggle-circle"></div>

    </div>

  );

}