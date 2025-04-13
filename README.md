# Personal Bio Site with Music Player

A minimalist personal bio site inspired by freaky.today, featuring a functional music player.

## Features

- Clean, dark minimalist design
- Responsive layout for all device sizes
- Functional music player with play/pause, next/previous controls
- Progress bar with seek functionality
- Social links section
- Developer tools blocking functionality
- Support for Discord avatar integration

## Testing Locally

To test the site locally at http://127.0.0.1:5500:

1. **Using VS Code Live Server**:
   - Install the Live Server extension in VS Code
   - Right-click on index.html and select "Open with Live Server"
   - The site will open at http://127.0.0.1:5500

2. **Using Node.js**:
   ```bash
   # Install http-server if you don't have it
   npm install -g http-server
   
   # Run the server (with port 5500)
   http-server -p 5500
   ```

3. **Using Python**:
   ```bash
   # Python 3
   python -m http.server 5500
   ```

## Developer Tools Blocking

The site includes a script that detects and blocks access to browser developer tools. When someone tries to open developer tools:

1. A black overlay will cover the entire page
2. Right-click context menu will be disabled
3. Common keyboard shortcuts (F12, Ctrl+Shift+I, etc.) will be blocked

To disable this feature, remove or comment out the following section in `script.js`:
```javascript
// Initialize DevTools detection
detectDevTools();
```

Note: This blocking method isn't 100% foolproof, but provides a layer of protection against casual inspection.

## Setting Up Music

1. Add your MP3 files to the `music` directory:
   - Place your music files in the `music` folder (create it if it doesn't exist)
   - Default expected files are:
     - `music/sample1.mp3`
     - `music/sample2.mp3`
     - `music/sample3.mp3`

2. Customize the playlist in `script.js`:
   ```javascript
   const playlist = [
       {
           title: 'Track Name',
           artist: 'Artist Name',
           src: 'music/your-file.mp3'
       },
       // Add more tracks as needed
   ];
   ```

## Customization Tips

### To Add Your Own Image
You can use one of these methods:

1. **Use a Discord avatar**:
   ```html
   <img src="https://cdn.discordapp.com/avatars/YOUR_DISCORD_ID/YOUR_AVATAR_HASH.png?size=1024" alt="Profile Picture" class="avatar">
   ```
   
   Where:
   - `YOUR_DISCORD_ID` is your Discord user ID
   - `YOUR_AVATAR_HASH` is the hash for your avatar image
   
   You can get these by right-clicking your Discord avatar and selecting "Copy Image Address"

2. **Use a local image**:
   ```html
   <img src="your-image.jpg" alt="Your Name" class="avatar">
   ```

### To Change Social Media Links
Edit the links in the HTML file:
```html
<a href="https://your-link-here.com" class="social-link">
    <i class="fab fa-icon-name"></i> /your-username
</a>
```

### To Change Colors
Update the CSS variables in the `:root` section of `styles.css`:
```css
:root {
    --bg-color: #000000;
    --text-color: #ffffff;
    /* Other color variables */
}
```

## Browser Compatibility

The music player uses HTML5 audio features and works best in modern browsers:
- Chrome 50+
- Firefox 49+
- Safari 10+
- Edge 14+

## License

Feel free to use and modify this template for your personal use. 