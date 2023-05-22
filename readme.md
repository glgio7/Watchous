<article>
    <h1>Watchous</h1>
    <section>
      <h2>About</h2>
      <p>
        Watchous is a movie trailer and review portal built with React+TypeScript and designed to provides up-to-date information on movies. The users can signup, favorite movies, and customize their profiles, and movies playlists. It utilizes various technologies on both the front-end and back-end. With integration to the TMDB API, I found a way to get all the front end data using some params, therefore it's not necessary to upload any file to our database, making the use of file upload libraries unnecessary.
      </p>
    </section>
    <section>
      <h2>Technologies</h2>
      <h3>Front-end</h3>
      <ul>
        <li>React</li>
        <li>Vite</li>
        <li>TMDB API</li>
        <li>Axios</li>
        <li>Custom Hooks</li>
        <li>Styled Components</li>
        <li>and more</li>
      </ul>
      <h3>Back-end</h3>
      <ul>
        <li>TS-Node-dev</li>
        <li>Cors</li>
        <li>Express</li>
        <li>MongoDB</li>
        <li>Bcrypt</li>
        <li>JWT</li>
      </ul>
    </section>
    <section>
      <h2>Features</h2>
      <ul>
        <li>User management: The API provides user registration, login, and authentication functionalities.</li>
        <li>Movie data integration: Watchous is integrated with the TMDB API, allowing for easy storage and retrieval of movie data.</li>
        <li>Favorites management: Users can manage their favorite movies within the application.</li>
        <li>Profile customization: Users can set a profile icon to personalize their experience, as well as customize other informations.</li>
      </ul>
    </section>
    <section>
      <h2>Getting Started</h2>
      <h3>Prerequisites</h3>
      <ul>
        <li>Node.js</li>
      </ul>
      <h3>Installation</h3>
      <ol>
        <li>Clone the repository:</li>
      </ol>
      <pre><code>git clone https://github.com/glgio7/Watchous.git</code></pre>
      <ol start="2">
        <li>Install the dependencies for both the front-end and back-end:</li>
      </ol>
      <pre><code>
cd watchous/client
npm install

cd ../server
npm install
</code></pre>

<ol start="3">
<li>Configure the environment variables:</li>
</ol>
<ul>
<li>Rename <code>.env.example</code> files to <code>.env</code> in both the <code>client</code> and <code>server</code> directories.</li>
<li>Update the necessary environment variables with your configuration details.</li>
</ul>
<ol start="4">
<li>Start the development server:</li>
</ol>
<pre><code>
cd watchous/client
npm run dev

cd ../server
npm run dev
</code></pre>

</section>
<section>
<ol start="5">
<li>Open your browser and navigate to <a href="http://localhost:3000">http://localhost:3000</a> to access the application.</li>
</ol>
      <h2>API Endpoints</h2>
      <ul>
        <li><code>POST /users</code>: Register a new user.</li>
        <li><code>POST /auth</code>: Log in an existing user.</li>
        <li><code>PUT /users/:id</code>: Update and existing user using id by params.</li>
        <li><code>GET /freemovies</code>: Retrieve a list of free movies on Youtube.</li>
        <li><code>POST /freemovies</code>: Add a movie to free movies playlist.</li>
        <li>and more...</li>
      </ul>
    </section>
    <section>
      <h2>Contributing</h2>
      <p>Contributions to Watchous are welcome! If you encounter any issues or have suggestions for improvement, please create an issue or submit a pull request.</p>
    </section>
    <section>
      <h2>License</h2>
      <p>This project is licensed under the <a href="LICENSE">ISC</a>.</p>
    </section>

  </article>
