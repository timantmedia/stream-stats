# stream-stats
Show the current streams statistics like total amount of viewers on the stream.

## Usage
Include the JavaScript file in the head of the playback page

```html
<script src="stream-stats.js"></script>
```

Then add the web component wherever you want to display the current live streams stats. 
Pass the stream Id into the `stream-id` attribute. 

```html
<stream-stats stream-id="bigbuckbunny"></stream-stats>
```