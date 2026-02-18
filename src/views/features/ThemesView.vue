<template>
  <div class="themes-box">
    <h3>Vue JS themes guide</h3>
    First of all create some variables like this:
    <pre lang="css">
:root {
    --background-color: #232323;
    --panels-color: #1a1a1a;
    --border-color: #515151;
    
    --accent-color: #933dde;
    --second-accent-color: #111111;

    --font-color: white;
    --second-font-color: grey;
}

/*Light theme*/
[data-theme="light"] {
    --background-color: #ffffff;
    --panels-color: #dde1ec;
    --border-color: #b3b3b3;

    --accent-color: #a184bb;
    --second-accent-color: #111111;

    --font-color: rgb(0, 0, 0);
    --second-font-color: rgb(46, 46, 46);
}
    </pre>
    For changing theme use this code example
    <pre>
document.documentElement.setAttribute('data-theme', 'light')
    </pre>
  </div>
</template>

<style>
pre {
  background-color: var(--panels-color);
  padding: 16px;
  width: fit-content;
  border-radius: 5px;
}
</style>