import React from 'react'
import Top from '../top'
import Footer from '../footer'
import Helmet from 'react-helmet'

import './index.scss'

export const Layout = ({ children, title }) => (
  <>
    <Helmet>
       <meta
        name="naver-site-verification"
        content="70accc2cfef2670418eeafae9176049c3353e2a7"/>
      {/* <meta 
        name="google-site-verification"
        content="Aa8CClY8ecD9Uc-kAaZulu_ZvifUABxOsWtHrPEz3OY" /> */}
    </Helmet>
    <Top title={title} />
    <div className='layout-body'>
      {children}
    </div>
    <Footer />
  </>
)

export default Layout;