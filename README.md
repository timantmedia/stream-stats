# stream-stats
Show the current streams statistics like total amount of viewers on the stream.

## Usage
1. Upload the provided JSP file to the "root" application located in `/usr/local/antmedia/webapps/root`
2. Include the JavaScript file in the head of the player page
3. Add the component HTML where you want to see the viewer counts

Please note that you will need to update the URL assigned to variable `apiUrl` in the JavaScript that links to the JSP file

```js
const apiUrl = `http://localhost:5080/viewercount.jsp?streamid=${streamId}`;
```

In the provided player.html file, the necessary edits have been made. It assumes that the Javascript file is located in the `js` directory and the viewer counts are to be displayed under the video player. 

The method `startPlaying()` has also been modified to update the `stream-id` when the "Start Playing" button is pressed:

```js
function startPlaying() {
  ......
  // update the components attribute according to the stream id thats playing. 
  document.getElementsByTagName("stream-stats")[0].setAttribute("stream-id", streamId);
}
```

```html
<!-- include the web component JavaScript file -->
<script src="stream-stats.js"></script>

<!-- stream-id is updated automatically using the provided player.html file -->
<stream-stats stream-id=""></stream-stats>
```

