## Dark Mode Troubleshooting

### If dark mode button changes but colors don't:

**Solution: Restart the Vite dev server**

1. **Stop the current dev server:**

   - Press `Ctrl + C` in the terminal running `npm run dev`
   - Or close that terminal

2. **Start it again:**

   ```bash
   cd c:\TheFullStack\TheToDoList\frontend
   npm run dev
   ```

3. **Hard refresh your browser:**
   - Press `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)
   - Or open DevTools (F12) and right-click the refresh button → "Empty Cache and Hard Reload"

### Why this happens:

- Tailwind config changes require a dev server restart
- The `darkMode: 'class'` setting needs to be loaded by Vite

### To verify it's working:

1. Open browser DevTools (F12)
2. Inspect the `<html>` element
3. Click the dark mode button
4. You should see the `class="dark"` appear/disappear on the `<html>` tag

If you see the class toggling but colors still don't change, clear your browser cache!
