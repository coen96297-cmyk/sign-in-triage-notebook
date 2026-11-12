# Sign-in triage notebook

Review sign-ins following repeated failures in a five-minute window.

## Try it

Open `index.html` in a browser. The app works offline and requires no installation, API keys or backend.

Try raising the threshold to four, then add a fourth failure for Morgan before 09:04. A flag is a prompt for investigation. A mistyped saved password can produce the same sequence.

## Run the tests

With Node.js 20 or later, run `node --test review.test.js` from this directory.

## Source

`logic.js` implements the review rules. `app.js` connects them to the form in `index.html`.

