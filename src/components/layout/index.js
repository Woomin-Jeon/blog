import React from 'react'
import Top from '../top'
import Footer from '../footer'
import Helmet from 'react-helmet'

import './index.scss'

export const Layout = ({ children, title }) => (
  <>
    <Helmet>
      <meta name="google-site-verification" content="nqKk1qa0fFdufoYINoIqIgkDZOIFMyAOGir7cqK4BL8" />
      
      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-169806970-1"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-169806970-1');
      </script>
    </Helmet>
    <Top title={title} />
    <div className='layout-body'>
      {children}
    </div>
    <Footer />
  </>
)

export default Layout;