function ThemeSwitch({ darkMode, setDarkMode }) {
  return (
<div
      className={`theme-switch ${darkMode ? "active" : ""}`}
      onClick={() => setDarkMode((prev) => !prev)}
>
<div className="switch-thumb" />
</div>
  );
}
 
export default ThemeSwitch;