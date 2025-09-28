# wk4-assignment

Got database running by redoing whole env variable and inserting newly changed password.
confirmed web server API getting Sql table OK, and offering it via get OK; via POSTMAN application

CLient ONLY showing the form (default html) Fri 26/09/2025 20:05

Sat 27/09/2025 18:35
manually added workable image data to DB, so could css page better.
manually changed sql table for 1984 to be for Ready Player One - because
CSS adjusted for main page layout and then
adjusted to show better on mobile screens

Added ARIA to html where it would help.
adjusted form css a bit (seems to adjust ok to screen size change, so not thinking more needed)
added form handling .js (not tested)

- will test more tomorrow.

Test was bad: eventually discovered a mistake in database creation.

Missed out the GENERATED ALWAYS AS IDENTITY, on the PRIMARY key, updates with no the ID were failing.
in fixing it also changes all fields other than id to TEXT to eliminate issues with star_rating being a DECIMAL(1,1)
Working OK now so ACPing before tidying up css
last CSS could have done more css, but time out over weekend. wanted to add a covert the star rating to a % of 5 stars coloured in, but versions online did not make enough sense to me to try and add
would have needed to be at the novel div creation point and mostly js inserted (calculated from the rating)
