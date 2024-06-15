import React, { useState, useRef, useEffect } from 'react'
import Hero from '../components/Hero'
import ExploreMenu from '../components/ExploreMenu'
import FoodCatalog from '../components/FoodCatalog'
import DownloadApp from '../components/DownloadApp'

const Home = ({ setSectionRefs }) => {

  const [category, setCategory] = useState("All")

  const heroRef = useRef(null);
  const menuRef = useRef(null);
  const downloadAppRef = useRef(null);


  // Pass the refs to the parent component

  useEffect(() => {
    setSectionRefs({
      hero: heroRef,
      menu: menuRef,
      downloadApp: downloadAppRef
    });
  }, [setSectionRefs]);

  
  return (
    <>
    {/* Hero Section */}
    <Hero  ref={heroRef} menuRef={menuRef}/>

    {/* Menu Heading and Categories*/}    
    <ExploreMenu category={category} setCategory={setCategory} ref={menuRef}/>

    {/* Food Catalog */}
    <FoodCatalog category={category}/>

    {/* App Download Section */}
    <DownloadApp  ref={downloadAppRef}/>
    </>
  )
}

export default Home