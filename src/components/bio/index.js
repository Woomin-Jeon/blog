import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Image from 'gatsby-image'

import './index.scss'

export const Bio = () => {
  config.autoAddCss = false

  library.add(faUser, fab)
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, introduction, social } = data.site.siteMetadata

        return (
          <div className="user">
            <Link to="/about">
              <Image
                className="profile"
                fixed={data.profile.childImageSharp.fixed}
                alt="Your Profile"
                style={{ borderRadius: `100%` }}
              />
            </Link>
            <div className="description">
              <h3 className="author">{author}</h3>
              <div className="link">
                {social.map((v, index) => (
                  <a href={v.url} key={index}>
                    <FontAwesomeIcon
                      key={index}
                      icon={['fab', v.icon]}
                      style={{ width: '23px', marginRight: '10px' }}
                      fixedWidth
                      className="icon"
                    />
                  </a>
                ))}
                <Link to="/about">
                  <p className="intro">{introduction}</p>  
                </Link>
              </div>
            </div>
          </div>
        )
      }}
    ></StaticQuery>
  )
}

export const bioQuery = graphql`
  query Bioquery {
    profile: file(absolutePath: { regex: "/profile.jpg/" }) {
      childImageSharp {
        fixed(width: 90, height: 90) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        introduction
        social {
          icon
          url
        }
      }
    }
  }
`
export default Bio
