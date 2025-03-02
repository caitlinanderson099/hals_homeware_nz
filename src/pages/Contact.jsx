import React from 'react'
import { BsConeStriped } from 'react-icons/bs'


const Contact = () => {

  const ContactHeader = ({title, image_url}) => {
    return (
      <header className='contact-header' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${image_url})`}}>
        <h1>{title}</h1>
      </header>
    )
  }

  return (
    <div className='contact-page'>
      <ContactHeader title={'Contact Us'} image_url={'/bg-images/home-bg.webp'}/>
            <h1>Work in progress <BsConeStriped/></h1>
      <h2 className='subheading'>Contact Us</h2>
    </div>
  )
}

export default Contact
