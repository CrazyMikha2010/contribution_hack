# HACK GITHUB CONTRIBUTIONS

## Installation

### First copy repository

```bash
git clone https://github.com/CrazyMikha2010/contribution_hack.git
```

### Install required packages

```bash
npm init -y
npm i jsonfile fs moment simple-git
```

### Open site

<ins>1st option</ins>

Visit [my github page](https://crazymikha2010.github.io) if it's not repurposed.

<ins>2nd option</ins>

In repo, open `index.html` (right mouse click on file and choose to open in browser or do it any way you want).

### Draw graph

Now you can:
<ul>
  <li>Choose year to submit on past/future/present</li>
  <li>Choose amount(color) of commit on certain day</li>
  <li>Draw anything you want on graph or click Randomize</li>
  <li>Clear and start over</li>
</ul>

After you finished drawing, click `Push` and `commit.json` will be downloaded on your machine. Drag this file to directory contribution_hack.

### Run and enjoy!

Open terminal, and run

```bash
node index.js
```
*before running check if file you dragged is named `commits.json`. otherwise change this line to suitable name.
```javascript
const { year, commits } = JSON.parse(fs.readFileSync("./commits.json", 'utf-8'))
```

Wait until `All commits pushed!` message in terminal. Now refresh your profile and enjoy!

### Didn't work?

Check email

`The email address used for the commits is associated with your account on GitHub.` [learn more](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile)

### Improvements

Fork this repo (and star it pls)! There's still a lot to do. For example 
<ul>
  <li>Add feature to transform uploaded image to graph</li>
  <li>Make it more automatic - is it possible to get rid of dragging and terminal commands?</li>
  <li>Add art library for other users - create multiple drawings and include them in your repo ( or maybe edit index.html;) )</li>
  <li>Add css - I'm a bad designer</li>
</ul>

### PS

Shout-out to [Fenrir's](https://www.youtube.com/watch?v=LlkcvvGbs9I) and [Akshay Saini's](https://www.youtube.com/watch?v=2q--gA97caM) videos. Check them out!
