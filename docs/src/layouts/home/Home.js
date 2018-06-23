import React, { Component } from 'react'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>EduScience, A blockchain based scientific ecosystem!</h1>
            <p>EduScience is a blockchain-based ecosystem enabling the academic 
            environment to thrive and prosper in a uniform, widespread and stable platform. 
            The blockchain behaves as an immutable, shared, public and timestamped database. 
            Since the properties of this new technology, we can obtain several advantages, 
            and exclude many risks and problems in the targeted domain. Scientists, researchers, 
            professors, students, consumers must proceed with cautiousness when publishing work or 
            reviewing existing ones, since so many factors might influence the academic paper: 
            its source, publication time, popularity, rating, censorship and so on. Providing 
            a unified platform. We save the end users from countless considerations and issues, 
            we create value for our community and of course, spare a lot of time.</p>

            <p>Our vision is to benefit all participants in this environment, providing for published 
            works history, authorship, trust and common sense, meeting the requirements of nowadays 
            global research community, enabling funding opportunities and appreciations. The dynamics
            of this ecosystem will be powered by our own cryptocurrency, called ESc token, allowing
            the users to exchange funds, submit articles, access content and reward others for their
            work. Capturing all critical aspects of nowadays scientific work, the vision is to provide
            an easy to use, secure, decentralized, uncensored and stable in time suite journal, empowering
            the future of science community to “do today what others won’t, so tomorrow they can do
            what others can’t” (Jerry Rice).</p>

            <img src="logo.png" alt="Logo" className="center" ></img>
          </div>
        </div>
      </main>
    )
  }
}

export default Home